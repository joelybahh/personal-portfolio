"use client";

import { useEffect, useRef } from "react";
import { SectionHeading } from "./SectionHeading";
import {
  erasedSpan,
  roadmapEnd as END,
  roadmapItems,
  roadmapLanes,
  roadmapStart as START,
  type RoadmapItem,
  type RoadmapLane,
} from "@/lib/roadmap-data";
import { statsByYear, statsTotals } from "@/lib/stats-data";
import s from "./Roadmap.module.css";

const NS = "http://www.w3.org/2000/svg";
const W = 4200, TOP = 36, LEFT = 170, ROW = 27, LANE_PAD = 46;
const DONE_P = 0.7, PAN_P = 0.84;
/** Height of the sticky site header (h-16 plus its 2px border); the stage pins beneath it. */
const HEADER = 66;

const accentVar: Record<RoadmapLane["accent"], string> = {
  marker: "var(--rm-eng)",
  teal: "var(--rm-work)",
  violet: "var(--rm-lead)",
  leaf: "var(--rm-prod)",
  coral: "var(--rm-life)",
};

type Laid = RoadmapItem & { x0: number; x1: number; row: number };
type LaneLayout = RoadmapLane & { top: number; height: number; color: string };

function decimalYearNow() {
  const d = new Date();
  return d.getFullYear() + (d.getMonth() + (d.getDate() - 1) / 31) / 12;
}

const fmt = (n: number) => Math.round(n).toLocaleString("en-AU");

/**
 * The timeline is built imperatively into an SVG on mount: a few hundred nodes whose classes and
 * attributes change on every scroll frame, which is cheaper and simpler than re-rendering React.
 */
export function Roadmap() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const barRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const diffRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const svg = svgRef.current, board = boardRef.current, viewport = viewportRef.current, track = trackRef.current, stage = stageRef.current;
    const card = cardRef.current, hint = hintRef.current, bar = barRef.current, diff = diffRef.current;
    if (!svg || !board || !viewport || !track || !stage || !card || !hint || !bar || !diff) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.classList.toggle(s.trackStatic, reduced);
    const now = decimalYearNow();
    const x = (y: number) => LEFT + ((y - START) / (END - START)) * (W - LEFT - 40);
    const el = <K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string, string | number>, parent: Element): SVGElementTagNameMap[K] => {
      const e = document.createElementNS(NS, tag);
      for (const k in attrs) e.setAttribute(k, String(attrs[k]));
      parent.appendChild(e);
      return e;
    };
    svg.replaceChildren();
    const defs = el("defs", {}, svg);
    const pattern = el("pattern", { id: "rm-hatch", width: 14, height: 14, patternUnits: "userSpaceOnUse", patternTransform: "rotate(-35)" }, defs);
    el("line", { x1: 0, y1: 0, x2: 0, y2: 14, class: s.hatch }, pattern);
    const filter = el("filter", { id: "rm-rough", x: "-2%", y: "-10%", width: "104%", height: "120%" }, defs);
    el("feTurbulence", { type: "fractalNoise", baseFrequency: "0.02 0.05", numOctaves: 2, seed: 7, result: "n" }, filter);
    el("feDisplacementMap", { in: "SourceGraphic", in2: "n", scale: 2.4, xChannelSelector: "R", yChannelSelector: "G" }, filter);
    const g = el("g", { filter: "url(#rm-rough)" }, svg);

    // layout: rows per lane, then lane tops
    const lanes: LaneLayout[] = [];
    const laid: Laid[] = [];
    let yCursor = TOP;
    for (const lane of roadmapLanes) {
      const mine = roadmapItems
        .filter((it) => it.lane === lane.id)
        .map((it) => {
          const x0 = it.from !== undefined ? x(it.from) : x(it.at!) - 70;
          const x1 = it.from !== undefined ? x(it.to === "now" ? now : (it.to as number)) : x(it.at!) + 70;
          return { ...it, x0, x1, row: 0 } as Laid;
        })
        .sort((a, b) => a.x0 - b.x0);
      const rows: number[] = [];
      for (const it of mine) {
        let r = rows.findIndex((end) => end < it.x0 - 10);
        if (r < 0) { r = rows.length; rows.push(it.x1); } else rows[r] = it.x1;
        it.row = r;
      }
      const height = LANE_PAD + Math.max(1, rows.length) * ROW + 16;
      lanes.push({ ...lane, top: yCursor, height, color: accentVar[lane.accent] });
      laid.push(...mine);
      yCursor += height;
    }
    const H = yCursor + 60;
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    svg.setAttribute("width", String(W));
    svg.setAttribute("height", String(H));
    board.style.width = `${W}px`;
    board.style.height = `${H}px`;

    const futureGround = el("rect", { x: x(now), y: TOP - 10, width: W - x(now) - 40, height: yCursor - TOP + 10, fill: "url(#rm-hatch)", opacity: 0 }, g);
    for (let y = START; y <= END; y++) {
      el("line", { x1: x(y), x2: x(y), y1: TOP, y2: yCursor, class: s.yearLine }, g);
      el("text", { x: x(y) + 5, y: TOP + 14, class: s.year }, g).textContent = String(y);
    }

    // erase the Covid stretch: the eraser zigzags; only paper it has passed over is revealed (mask)
    const cx0 = x(erasedSpan.from), cx1 = x(erasedSpan.to), cy0 = TOP - 6, cy1 = yCursor - 10, EH = 34;
    const mask = el("mask", { id: "rm-wipe", maskUnits: "userSpaceOnUse", x: cx0 - 40, y: cy0 - 20, width: cx1 - cx0 + 120, height: cy1 - cy0 + 40 }, defs);
    el("rect", { x: cx0 - 40, y: cy0 - 20, width: cx1 - cx0 + 120, height: cy1 - cy0 + 40, fill: "black" }, mask);
    const trail = el("path", { d: "", fill: "none", stroke: "white", "stroke-width": EH, "stroke-linecap": "round", "stroke-linejoin": "round" }, mask);
    el("rect", { x: cx0 - 20, y: cy0 - 10, width: cx1 - cx0 + 60, height: cy1 - cy0 + 20, class: s.wipe, mask: "url(#rm-wipe)" }, g);
    const smudge = el("path", { d: "", class: s.smudge, "stroke-width": EH - 8 }, g);
    const crumbs = el("g", {}, g);
    const eraser = el("g", { opacity: 0 }, g);
    el("rect", { x: -26, y: -16, width: 52, height: 32, rx: 6, class: s.eraserBody, transform: "rotate(-12)" }, eraser);
    el("rect", { x: -26, y: -16, width: 18, height: 32, rx: 6, class: s.eraserBand, transform: "rotate(-12)" }, eraser);
    const covid1 = el("text", { x: (cx0 + cx1) / 2, y: cy1 + 18, class: `${s.hand} ${s.covid404}`, "text-anchor": "middle" }, g);
    covid1.textContent = erasedSpan.line1;
    const covid2 = el("text", { x: (cx0 + cx1) / 2, y: cy1 + 42, class: `${s.hand} ${s.covidLine}`, "text-anchor": "middle", transform: `rotate(-3 ${(cx0 + cx1) / 2} ${cy1 + 42})` }, g);
    covid2.textContent = erasedSpan.line2;
    const PERIOD = 46, SPEED = 2.6, U_MAX = (cx1 - cx0) * SPEED;
    const eraserPoint = (u: number): [number, number] => {
      const tri = Math.abs(((u / PERIOD) % 2) - 1);
      return [cx0 + u / SPEED, cy0 + EH / 2 + tri * (cy1 - cy0 - EH)];
    };
    let crumbCount = 0;
    const erase = (head: number) => {
      const u = Math.max(0, Math.min(U_MAX, (head - cx0) * SPEED));
      let d = "";
      for (let t = 0; t <= u; t += 6) { const [px, py] = eraserPoint(t); d += `${t ? "L" : "M"}${px.toFixed(1)} ${py.toFixed(1)} `; }
      trail.setAttribute("d", d); smudge.setAttribute("d", d);
      const want = Math.floor(u / 90);
      while (crumbCount < want) {
        const [px, py] = eraserPoint(crumbCount * 90 + 40), r = (crumbCount * 7919) % 11;
        el("rect", { x: px + (r - 5) * 3, y: py + (r % 4) * 5, width: 4 + (r % 3), height: 2 + (r % 2), rx: 1, class: s.crumb, transform: `rotate(${r * 33} ${px} ${py})` }, crumbs);
        crumbCount++;
      }
      while (crumbCount > want) { crumbs.lastChild?.remove(); crumbCount--; }
      const active = head > cx0 && u < U_MAX;
      eraser.setAttribute("opacity", active ? "1" : "0");
      if (active) { const [px, py] = eraserPoint(u); eraser.setAttribute("transform", `translate(${px} ${py})`); }
      return u >= U_MAX;
    };

    // lanes
    const rails: SVGPathElement[] = [];
    for (const lane of lanes) {
      el("text", { x: 16, y: lane.top + 40, class: s.laneName }, g).textContent = lane.name;
      const r = el("path", { d: `M ${LEFT} ${lane.top + lane.height - 10} L ${W - 40} ${lane.top + lane.height - 10}`, class: `${s.rail} ${s.draw}`, stroke: lane.color }, g);
      r.style.setProperty("--len", String(W));
      rails.push(r);
    }

    // items
    const nodes: { grp: SVGGElement; revealAt: number; draw: Element; lbl: Element }[] = [];
    const futures: SVGGElement[] = [];
    const showCard = (it: RoadmapItem, color: string) => {
      card.classList.add(s.on);
      card.innerHTML = `<span class="font-hand text-[22px]" style="color:${color}">${it.when}</span><h3 class="mt-0.5 mb-1 font-sans text-[17px] font-extrabold">${it.title}</h3><p class="font-sans text-[13px] leading-snug text-ink-soft dark:text-paper/70">${it.text}</p>`;
    };
    for (const it of laid) {
      const lane = lanes.find((l) => l.id === it.lane)!, yy = lane.top + LANE_PAD + it.row * ROW;
      const grp = el("g", { class: s.hit }, g);
      if (it.goal) {
        grp.classList.add(s.future); grp.style.setProperty("--delay", `${futures.length * 140}ms`);
        const w = el("g", { class: s.wob }, grp);
        el("circle", { cx: x(it.at!), cy: yy, r: 11, class: s.goal, stroke: lane.color }, w);
        el("text", { x: x(it.at!), y: yy + 7, class: s.q, "text-anchor": "middle", fill: lane.color }, w).textContent = "?";
        el("text", { x: x(it.at!), y: yy + 28, class: `${s.lbl} ${s.lblGoal} ${s.on}`, "text-anchor": "middle" }, w).textContent = it.title;
        futures.push(grp);
      } else if (it.plan) {
        grp.classList.add(s.future); grp.style.setProperty("--delay", `${futures.length * 140}ms`);
        const w = el("g", { class: s.wob }, grp);
        el("path", { d: `M ${x(it.from!)} ${yy} L ${x(it.to as number)} ${yy}`, class: s.plan, stroke: lane.color }, w);
        el("text", { x: x(it.from!) + 8, y: yy - 11, class: s.planLbl }, w).textContent = it.title;
        futures.push(grp);
      } else {
        let draw: Element, lbl: Element;
        if (it.from !== undefined) {
          const x0 = x(it.from), x1 = x(it.to === "now" ? now : (it.to as number));
          draw = el("path", { d: `M ${x0} ${yy} L ${x1} ${yy}`, class: `${s.bar} ${s.draw} ${it.to === "now" ? s.barNow : ""}`, stroke: lane.color }, grp);
          (draw as SVGPathElement).style.setProperty("--len", String(x1 - x0));
          const inside = x1 - x0 > it.title.length * 7.2 + 20;
          lbl = el("text", { x: inside ? x0 + 10 : x1 + 10, y: yy + 4, class: `${s.lbl} ${inside ? s.lblInside : ""}` }, grp);
        } else {
          draw = el("circle", { cx: x(it.at!), cy: yy, r: 8, class: `${s.dot} ${s.draw}`, stroke: lane.color }, grp);
          (draw as SVGCircleElement).style.setProperty("--len", String(2 * Math.PI * 8));
          lbl = el("text", { x: x(it.at!), y: yy + 24, class: s.lbl, "text-anchor": "middle" }, grp);
        }
        lbl.textContent = it.title;
        nodes.push({ grp, revealAt: it.from !== undefined ? x(it.from) : x(it.at!), draw, lbl });
      }
      grp.addEventListener("mouseenter", () => showCard(it, lane.color));
      grp.addEventListener("click", () => showCard(it, lane.color));
      grp.addEventListener("mouseleave", () => card.classList.remove(s.on));
    }
    const todayLine = el("path", { d: `M ${x(now)} ${TOP} L ${x(now)} ${yCursor}`, class: s.today }, g);
    const todayLbl = el("text", { x: x(now) + 8, y: yCursor + 18, class: s.hand }, g);
    todayLbl.textContent = "today";
    const whoKnows = el("text", { x: x(now) + 520, y: TOP + 30, class: s.whoKnows, transform: `rotate(-4 ${x(now) + 520} ${TOP + 30})` }, g);
    whoKnows.textContent = "who knows?";

    // diffstat panel
    const dAdd = diff.querySelector<HTMLElement>("[data-add]")!, dDel = diff.querySelector<HTMLElement>("[data-del]")!;
    const dCommits = diff.querySelector<HTMLElement>("[data-commits]")!, dRepos = diff.querySelector<HTMLElement>("[data-repos]")!;
    const dYear = diff.querySelector<HTMLElement>("[data-year]")!, dCap = diff.querySelector<HTMLElement>("[data-cap]")!;
    const blocks = Array.from(diff.querySelectorAll<HTMLElement>("[data-blocks] i"));
    const diffAt = (yearPos: number) => {
      let c = 0, a = 0, d = 0, repos = 0;
      for (const y of statsByYear) {
        const f = Math.max(0, Math.min(1, yearPos - y.year));
        c += y.commits * f; a += y.added * f; d += y.removed * f;
        if (f > 0) repos = y.reposSoFar;
      }
      return { c, a, d, repos };
    };
    const paintDiff = (head: number, done: boolean) => {
      const yearPos = done ? END : START + ((head - LEFT) / (W - LEFT - 40)) * (END - START);
      const v = diffAt(Math.min(yearPos, now));
      dAdd.textContent = `+${fmt(v.a)}`; dDel.textContent = `−${fmt(v.d)}`;
      dCommits.textContent = fmt(v.c); dRepos.textContent = fmt(v.repos);
      dYear.textContent = done ? "today" : String(Math.floor(Math.min(yearPos, now)));
      const tot = v.a + v.d, greens = tot ? Math.round((5 * v.a) / tot) : 0;
      blocks.forEach((b, i) => (b.className = tot ? (i < greens ? "a" : "d") : ""));
      dCap.classList.toggle(s.on, done);
    };

    // scroll scrub: scrub to today, pan across the future, hold and roam
    let freed = false, freeOffset = 0, scale = 1, maxShift = 0;
    const fit = () => {
      const room = stage.getBoundingClientRect().bottom - viewport.getBoundingClientRect().top - 12;
      const avail = reduced ? H : Math.max(240, room);
      scale = Math.min(1, avail / H, viewport.clientWidth / 1200);
      viewport.style.height = `${reduced ? H * scale : avail}px`;
      maxShift = Math.max(0, W - viewport.clientWidth / scale);
      if (reduced) board.style.transform = `scale(${scale})`;
    };
    const tick = () => {
      if (reduced) {
        rails.forEach((r) => r.classList.add(s.on));
        nodes.forEach((n) => { n.draw.classList.add(s.on); n.lbl.classList.add(s.on); });
        erase(cx1 + 1000); covid1.classList.add(s.on); covid2.classList.add(s.on);
        todayLine.classList.add(s.on); todayLbl.classList.add(s.on); whoKnows.classList.add(s.on);
        futureGround.setAttribute("opacity", "1"); futures.forEach((f) => f.classList.add(s.on));
        paintDiff(0, true); viewport.classList.add(s.static);
        return;
      }
      const r = track.getBoundingClientRect(), stageH = stage.clientHeight;
      const p = Math.min(1, Math.max(0, -(r.top - HEADER) / (r.height - stageH)));
      bar.style.width = `${p * 100}%`;
      const vw = viewport.clientWidth / scale;
      const endX = x(now) + 140, head = LEFT + Math.min(1, p / DONE_P) * (endX - LEFT);
      const follow = Math.max(0, Math.min(head - vw * 0.62, maxShift));
      const futureShift = Math.min(maxShift, Math.max(0, x(now) - vw * 0.28));
      let shift: number;
      if (p <= DONE_P) { shift = follow; freeOffset = 0; }
      else { const q = Math.min(1, (p - DONE_P) / (PAN_P - DONE_P)), e = q < 0.5 ? 2 * q * q : 1 - Math.pow(-2 * q + 2, 2) / 2; shift = follow + (futureShift - follow) * e; }
      shift = Math.max(0, Math.min(maxShift, shift + freeOffset));
      board.style.transform = `translateX(${-shift * scale}px) scale(${scale})`;
      rails.forEach((rl) => rl.classList.toggle(s.on, p > 0.02));
      nodes.forEach((n) => { const on = head >= n.revealAt; n.draw.classList.toggle(s.on, on); n.lbl.classList.toggle(s.on, on); });
      const erased = erase(head);
      covid1.classList.toggle(s.on, erased && head >= cx1 + 30);
      covid2.classList.toggle(s.on, erased && head >= cx1 + 80);
      const done = p >= DONE_P;
      paintDiff(head, done);
      todayLine.classList.toggle(s.on, done); todayLbl.classList.toggle(s.on, done); whoKnows.classList.toggle(s.on, done);
      futureGround.setAttribute("opacity", done ? "1" : "0");
      futures.forEach((f) => f.classList.toggle(s.on, done));
      freed = p >= PAN_P;
      viewport.classList.toggle(s.free, freed);
      hint.classList.toggle(s.on, freed);
    };
    let drag: { x: number; o: number } | null = null;
    const onDown = (e: PointerEvent) => { if (freed) { drag = { x: e.clientX, o: freeOffset }; viewport.setPointerCapture(e.pointerId); } };
    const onMove = (e: PointerEvent) => { if (drag) { freeOffset = drag.o - (e.clientX - drag.x) / scale; tick(); } };
    const onUp = () => (drag = null);
    const onWheel = (e: WheelEvent) => { if (freed && Math.abs(e.deltaX) > Math.abs(e.deltaY)) { freeOffset += e.deltaX / scale; e.preventDefault(); tick(); } };
    const onResize = () => { fit(); tick(); };
    fit(); tick();
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", onResize);
    viewport.addEventListener("pointerdown", onDown); viewport.addEventListener("pointermove", onMove);
    viewport.addEventListener("pointerup", onUp); viewport.addEventListener("pointercancel", onUp);
    viewport.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("scroll", tick); window.removeEventListener("resize", onResize);
      viewport.removeEventListener("pointerdown", onDown); viewport.removeEventListener("pointermove", onMove);
      viewport.removeEventListener("pointerup", onUp); viewport.removeEventListener("pointercancel", onUp);
      viewport.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <section id="roadmap" className={`${s.root} scroll-mt-20 border-t-2 border-dashed border-ink/25 dark:border-paper/15`}>
      <div ref={trackRef} className={s.track}>
        <div ref={stageRef} className={s.stage}>
          <div className={`mx-auto max-w-5xl px-4 sm:px-6 ${s.heading}`}>
            <SectionHeading eyebrow="the long version" title="My roadmap">
              Keep scrolling. It draws itself from year 10 to today, then you can roam.
            </SectionHeading>
          </div>
          <div className={s.progress}><i ref={barRef} /></div>
          <div ref={viewportRef} className={s.viewport}>
            <div ref={boardRef} className={s.board}>
              <svg ref={svgRef} className={s.svg} xmlns={NS} aria-label="A timeline of Joel's engineering, work, people, side projects and life from 2013 to today, with goals beyond it" role="img" />
            </div>
          </div>
          <div ref={diffRef} className={`${s.diff} sketch-card`} aria-live="off">
            <div className={s.diffNums}><span className={s.diffAdd} data-add>+0</span><span className={s.diffDel} data-del>−0</span></div>
            <div className={s.blocks} data-blocks><i /><i /><i /><i /><i /></div>
            <div className={s.diffMeta}>
              <span><b data-commits>0</b> commits</span>
              <span><b data-repos>0</b> repos</span>
              <span><b data-year>{START}</b></span>
            </div>
            <div className={s.diffCap} data-cap>since 14 January 2014, source files only</div>
          </div>
          <div ref={cardRef} className={`${s.card} sketch-card`} />
          <div ref={hintRef} className={s.hint}>you&apos;re free now: hover, drag sideways, keep scrolling to move on</div>
        </div>
      </div>
      <p className="sr-only">
        {statsTotals.commits.toLocaleString("en-AU")} commits, {statsTotals.added.toLocaleString("en-AU")} lines added and {statsTotals.removed.toLocaleString("en-AU")} removed across {statsTotals.repos} repositories since {statsTotals.firstCommit}.
      </p>
    </section>
  );
}
