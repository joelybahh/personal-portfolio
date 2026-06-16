"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { site } from "@/lib/site";

/**
 * Dev tool — draw doodles directly onto the hero portrait and copy out the
 * resulting SVG path data. The portrait is rendered as an SVG <image> with the
 * same square + cover crop as <DoodleFace>, inside the same 0–100 viewBox, so
 * whatever you draw maps 1:1 into the real component.
 *
 * The photo lives *inside* the SVG so pinch/scroll zoom (which pans the viewBox)
 * scales the photo and your strokes together, while captured coordinates stay
 * in the fixed 0–100 space regardless of zoom.
 *
 * Also the seed of a possible "doodle on me" visitor feature down the line.
 */

type Pt = { x: number; y: number };
type Stroke = { id: number; label: string; color: string; width: number; points: Pt[] };
type View = { x: number; y: number; w: number; h: number };

const PALETTE = [
  { name: "marker", value: "#2F6BD6" },
  { name: "coral", value: "#E8654B" },
  { name: "leaf", value: "#3F9E6E" },
  { name: "ink", value: "#211E1A" },
  { name: "white", value: "#FBF9F4" },
];

const MIN_ZOOM_W = 8; // smallest viewBox width => ~12.5x zoom
const round = (n: number) => Math.round(n * 10) / 10;
const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));

function linePath(pts: Pt[]) {
  return pts.map((p, i) => `${i ? "L" : "M"} ${round(p.x)} ${round(p.y)}`).join(" ");
}

// Catmull-Rom → cubic bézier, for smooth hand-drawn-looking strokes.
function smoothPath(pts: Pt[]) {
  if (pts.length < 3) return linePath(pts);
  let d = `M ${round(pts[0].x)} ${round(pts[0].y)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${round(c1x)} ${round(c1y)} ${round(c2x)} ${round(c2y)} ${round(p2.x)} ${round(p2.y)}`;
  }
  return d;
}

function clampView(v: View): View {
  const w = clamp(v.w, MIN_ZOOM_W, 100);
  const h = w; // keep square
  return { x: clamp(v.x, 0, 100 - w), y: clamp(v.y, 0, 100 - h), w, h };
}

export function DoodleStudio() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const drawing = useRef(false);
  const draftRef = useRef<Pt[]>([]);
  const pointers = useRef<Map<number, Pt>>(new Map());
  const pinch = useRef<{ dist: number; anchor: Pt; v0: View } | null>(null);
  const moveCount = useRef(0);

  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [draft, setDraft] = useState<Pt[]>([]);
  const [labels, setLabels] = useState<string[]>(["glasses", "moustache"]);
  const [label, setLabel] = useState("glasses");
  const [newLabel, setNewLabel] = useState("");
  const [color, setColor] = useState(PALETTE[0].value);
  const [width, setWidth] = useState(2);
  const [smooth, setSmooth] = useState(true);
  const [showPhoto, setShowPhoto] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [phase, setPhase] = useState<"idle" | "reset" | "draw">("idle");
  const [cursor, setCursor] = useState<Pt | null>(null);
  const [copied, setCopied] = useState(false);
  const [dbg, setDbg] = useState<string[]>([]);
  const logDbg = useCallback((m: string) => setDbg((d) => [m, ...d].slice(0, 6)), []);

  // viewBox state mirrored into a ref so the (non-passive) wheel handler can
  // read the current view without re-subscribing.
  const viewRef = useRef<View>({ x: 0, y: 0, w: 100, h: 100 });
  const [view, setViewState] = useState<View>(viewRef.current);
  const setView = useCallback((v: View) => {
    viewRef.current = v;
    setViewState(v);
  }, []);

  const toViewBox = useCallback((clientX: number, clientY: number): Pt | null => {
    const svg = svgRef.current;
    if (!svg) return null;
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return null;
    const p = pt.matrixTransform(ctm.inverse());
    return { x: p.x, y: p.y };
  }, []);

  // --- zoom helpers ---
  const zoomAround = useCallback((factor: number, clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const v = viewRef.current;
    const px = (clientX - rect.left) / rect.width;
    const py = (clientY - rect.top) / rect.height;
    const anchorX = v.x + px * v.w;
    const anchorY = v.y + py * v.h;
    const w = clamp(v.w * factor, MIN_ZOOM_W, 100);
    setView(clampView({ x: anchorX - px * w, y: anchorY - py * w, w, h: w }));
  }, [setView]);

  // Wheel: ctrl/⌘+wheel (trackpad pinch) zooms at cursor; plain wheel pans.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        zoomAround(Math.exp(e.deltaY * 0.01), e.clientX, e.clientY);
      } else {
        const rect = svg.getBoundingClientRect();
        const v = viewRef.current;
        setView(clampView({ ...v, x: v.x + (e.deltaX / rect.width) * v.w, y: v.y + (e.deltaY / rect.height) * v.h }));
      }
    };
    svg.addEventListener("wheel", onWheel, { passive: false });
    return () => svg.removeEventListener("wheel", onWheel);
  }, [zoomAround, setView]);

  // THE touch fix: `touch-action: none` is unreliable on <svg>, so the browser
  // hijacks touch gestures for scroll/pinch-zoom and cancels our pointers.
  // Non-passive touch listeners that preventDefault() stop that regardless of
  // touch-action support — drawing/pinch then run off the pointer events.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onStart = (e: TouchEvent) => {
      logDbg(`touchstart fingers=${e.touches.length}`);
      e.preventDefault();
    };
    const onMoveTouch = (e: TouchEvent) => e.preventDefault();
    const onCancel = () => logDbg("touchcancel");
    el.addEventListener("touchstart", onStart, { passive: false });
    el.addEventListener("touchmove", onMoveTouch, { passive: false });
    el.addEventListener("touchcancel", onCancel, { passive: false });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMoveTouch);
      el.removeEventListener("touchcancel", onCancel);
    };
  }, [logDbg]);

  // --- pointer (draw + two-finger pinch/pan) ---
  const onDown = (e: ReactPointerEvent<SVGSVGElement>) => {
    const p = toViewBox(e.clientX, e.clientY);
    if (!p) return;
    moveCount.current = 0;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* synthetic / uncapturable pointer — drawing still works */
    }
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const n = pointers.current.size;
    logDbg(`down ${e.pointerType} n=${n}`);
    if (n === 1) {
      drawing.current = true;
      draftRef.current = [p];
      setDraft(draftRef.current);
    } else if (n === 2) {
      // second finger => pinch, not a draw. Abandon the in-progress stroke.
      drawing.current = false;
      draftRef.current = [];
      setDraft([]);
      const [a, b] = [...pointers.current.values()];
      const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      pinch.current = {
        dist: Math.hypot(a.x - b.x, a.y - b.y),
        anchor: toViewBox(mid.x, mid.y) ?? { x: viewRef.current.x, y: viewRef.current.y },
        v0: viewRef.current,
      };
    }
  };

  const onMove = (e: ReactPointerEvent<SVGSVGElement>) => {
    if (pointers.current.has(e.pointerId)) pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    moveCount.current += 1;
    const vb = toViewBox(e.clientX, e.clientY);
    if (vb) setCursor(vb);

    if (pointers.current.size >= 2 && pinch.current) {
      const [a, b] = [...pointers.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      const svg = svgRef.current!;
      const rect = svg.getBoundingClientRect();
      const w = clamp(pinch.current.v0.w * (pinch.current.dist / dist), MIN_ZOOM_W, 100);
      const px = (mid.x - rect.left) / rect.width;
      const py = (mid.y - rect.top) / rect.height;
      setView(clampView({ x: pinch.current.anchor.x - px * w, y: pinch.current.anchor.y - py * w, w, h: w }));
      return;
    }

    if (drawing.current && vb) {
      const last = draftRef.current[draftRef.current.length - 1];
      const minStep = 0.7 * (viewRef.current.w / 100); // finer when zoomed in
      if (last && Math.hypot(vb.x - last.x, vb.y - last.y) < minStep) return;
      draftRef.current = [...draftRef.current, vb];
      setDraft(draftRef.current);
    }
  };

  const onUp = (e: ReactPointerEvent<SVGSVGElement>) => {
    logDbg(`${e.type === "pointercancel" ? "CANCEL" : "up"} ${e.pointerType} moves=${moveCount.current}`);
    pointers.current.delete(e.pointerId);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    if (pointers.current.size < 2) pinch.current = null;
    if (pointers.current.size === 0 && drawing.current) {
      drawing.current = false;
      const pts = draftRef.current;
      if (pts.length > 1) {
        setStrokes((s) => [...s, { id: s.length ? s[s.length - 1].id + 1 : 0, label, color, width, points: pts }]);
      }
      draftRef.current = [];
      setDraft([]);
    }
  };

  const pathFor = useCallback((pts: Pt[]) => (smooth ? smoothPath(pts) : linePath(pts)), [smooth]);
  const undo = () => setStrokes((s) => s.slice(0, -1));
  const clear = () => setStrokes([]);
  const resetView = () => setView({ x: 0, y: 0, w: 100, h: 100 });
  const zoomCenter = (factor: number) => {
    const r = svgRef.current?.getBoundingClientRect();
    if (r) zoomAround(factor, r.left + r.width / 2, r.top + r.height / 2);
  };

  const addLabel = () => {
    const name = newLabel.trim();
    if (!name) return;
    setLabels((ls) => (ls.includes(name) ? ls : [...ls, name]));
    setLabel(name);
    setNewLabel("");
  };

  const playPreview = () => {
    setPhase("reset");
    requestAnimationFrame(() => requestAnimationFrame(() => setPhase("draw")));
  };

  const output = JSON.stringify(
    strokes.map((s) => ({ label: s.label, color: PALETTE.find((p) => p.value === s.color)?.name ?? s.color, width: s.width, d: pathFor(s.points) })),
    null,
    2
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const zoomPct = Math.round((100 / view.w) * 100);

  return (
    <div className="mx-auto max-w-5xl select-none px-4 py-10">
      <h1 className="font-sans text-3xl font-black">Doodle Studio</h1>
      <p className="mt-1 font-sans text-sm text-ink-soft dark:text-paper/70">
        Draw on the portrait (mouse or one finger). Pinch or ⌘/Ctrl-scroll to zoom, two-finger / plain scroll to pan. Same crop &amp; 0–100 viewBox as the hero, so paths transfer 1:1.
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-[minmax(0,1fr)_320px]">
        {/* ---- Canvas ---- */}
        <div
          ref={containerRef}
          className="relative mx-auto aspect-square w-full max-w-[560px] touch-none overflow-hidden rounded-sketch border-2 border-ink shadow-sketch-lg dark:border-paper"
          style={{ touchAction: "none" }}
        >
          <svg
            ref={svgRef}
            viewBox={`${round(view.x)} ${round(view.y)} ${round(view.w)} ${round(view.h)}`}
            className="absolute inset-0 h-full w-full cursor-crosshair select-none"
            // touchAction:none lets single-finger drags draw (no browser scroll);
            // pointerEvents:all + the hit-rect below make the whole area a target.
            style={{ touchAction: "none", pointerEvents: "all" }}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            onPointerLeave={() => setCursor(null)}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* transparent hit target — guarantees taps/touches register across
                the whole canvas, even over pointer-events:none children. */}
            <rect x={-50} y={-50} width={200} height={200} fill="transparent" style={{ pointerEvents: "all" }} />

            {showPhoto && (
              <image
                href={site.profileImage}
                x={0}
                y={0}
                width={100}
                height={100}
                preserveAspectRatio="xMidYMid slice"
                style={{ pointerEvents: "none", filter: "grayscale(1)" }}
              />
            )}

            {showGrid && (
              <g opacity={0.3} style={{ pointerEvents: "none" }}>
                {Array.from({ length: 9 }, (_, i) => (i + 1) * 10).map((v) => (
                  <g key={v}>
                    <line x1={v} y1={0} x2={v} y2={100} stroke={v === 50 ? "#ff3b3b" : "#19e6c2"} strokeWidth={(v === 50 ? 0.4 : 0.2) * (view.w / 100)} />
                    <line x1={0} y1={v} x2={100} y2={v} stroke="#19e6c2" strokeWidth={0.2 * (view.w / 100)} />
                  </g>
                ))}
              </g>
            )}

            {/* finished strokes */}
            {strokes.map((s, i) => (
              <path
                key={s.id}
                d={pathFor(s.points)}
                stroke={s.color}
                strokeWidth={s.width}
                pathLength={1}
                style={{
                  pointerEvents: "none",
                  strokeDasharray: "1 2",
                  strokeDashoffset: phase === "reset" ? 1.1 : 0,
                  transition: phase === "draw" ? `stroke-dashoffset 500ms ease-out ${i * 160}ms` : "none",
                }}
              />
            ))}

            {/* in-progress stroke */}
            {draft.length > 0 && <path d={pathFor(draft)} stroke={color} strokeWidth={width} style={{ pointerEvents: "none" }} />}
          </svg>

          {cursor && (
            <span className="pointer-events-none absolute bottom-1 right-2 rounded bg-ink/70 px-1.5 py-0.5 font-mono text-[10px] text-paper">
              {round(cursor.x)}, {round(cursor.y)} · {zoomPct}%
            </span>
          )}

          {/* DEBUG readout — tells us what events actually fire on a real device */}
          <div className="pointer-events-none absolute left-1 top-1 max-w-[60%] rounded bg-ink/75 px-1.5 py-1 font-mono text-[10px] leading-tight text-paper">
            {dbg.length ? dbg.map((m, i) => <div key={i}>{m}</div>) : <div>touch the canvas…</div>}
          </div>
        </div>

        {/* ---- Controls ---- */}
        <div className="space-y-4 text-sm">
          <div>
            <p className="mb-1 font-semibold">Layer</p>
            <div className="flex flex-wrap items-center gap-1.5">
              {labels.map((l) => (
                <button key={l} onClick={() => setLabel(l)} className={`rounded-md border-2 px-2.5 py-1 ${label === l ? "border-ink bg-ink text-paper dark:border-paper" : "border-ink/30 dark:border-paper/30"}`}>
                  {l}
                </button>
              ))}
            </div>
            <div className="mt-2 flex gap-1.5">
              <input
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addLabel()}
                placeholder="new layer name…"
                className="min-w-0 flex-1 rounded-md border-2 border-ink/30 bg-transparent px-2 py-1 dark:border-paper/30"
              />
              <button onClick={addLabel} className="btn-ghost-sketch !px-3 !py-1.5">Add</button>
            </div>
          </div>

          <div>
            <p className="mb-1 font-semibold">Colour</p>
            <div className="flex gap-2">
              {PALETTE.map((p) => (
                <button key={p.name} title={p.name} onClick={() => setColor(p.value)} className={`h-7 w-7 rounded-full border-2 ${color === p.value ? "border-ink ring-2 ring-ink dark:border-paper dark:ring-paper" : "border-black/20"}`} style={{ background: p.value }} />
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1 block font-semibold">Stroke width — {width}</label>
            <input type="range" min={0.5} max={5} step={0.1} value={width} onChange={(e) => setWidth(Number(e.target.value))} className="w-full" />
          </div>

          <div>
            <p className="mb-1 font-semibold">Zoom — {zoomPct}%</p>
            <div className="flex gap-2">
              <button onClick={() => zoomCenter(1 / 1.4)} className="btn-ghost-sketch !px-3 !py-1.5">＋</button>
              <button onClick={() => zoomCenter(1.4)} className="btn-ghost-sketch !px-3 !py-1.5">－</button>
              <button onClick={resetView} className="btn-ghost-sketch !px-3 !py-1.5">Reset</button>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <label className="flex items-center gap-1.5"><input type="checkbox" checked={smooth} onChange={(e) => setSmooth(e.target.checked)} /> smooth</label>
            <label className="flex items-center gap-1.5"><input type="checkbox" checked={showPhoto} onChange={(e) => setShowPhoto(e.target.checked)} /> photo</label>
            <label className="flex items-center gap-1.5"><input type="checkbox" checked={showGrid} onChange={(e) => setShowGrid(e.target.checked)} /> grid</label>
          </div>

          <div className="flex flex-wrap gap-2">
            <button onClick={undo} className="btn-ghost-sketch !px-3 !py-1.5">Undo</button>
            <button onClick={clear} className="btn-ghost-sketch !px-3 !py-1.5">Clear</button>
            <button onClick={playPreview} className="btn-ghost-sketch !px-3 !py-1.5">▶ Preview draw</button>
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between">
              <p className="font-semibold">Output ({strokes.length} strokes)</p>
              <button onClick={copy} className="btn-sketch !px-3 !py-1.5">{copied ? "Copied!" : "Copy JSON"}</button>
            </div>
            <textarea readOnly value={output} className="h-56 w-full resize-y select-text rounded-md border-2 border-ink/30 bg-paper/50 p-2 font-mono text-[11px] dark:border-paper/30 dark:bg-ink/40" />
          </div>
        </div>
      </div>
    </div>
  );
}
