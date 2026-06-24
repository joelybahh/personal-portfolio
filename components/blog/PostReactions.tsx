"use client";

import { useState, useTransition } from "react";
import { applyPulseTake } from "@/app/blog/[slug]/actions";
import { Scribble } from "@/components/sketch/Scribble";
import { REACTION_OPTIONS, type PostPulse, type ReactionId } from "@/lib/reactions-shared";

type ReactionColor = (typeof REACTION_OPTIONS)[number]["color"];

const BAR_COLOR: Record<ReactionColor, string> = {
  coral: "bg-coral",
  leaf: "bg-leaf",
  marker: "bg-marker",
  orange: "bg-orange",
};

const CHIP_STYLE: Record<ReactionColor, { selected: string; idle: string }> = {
  coral: {
    selected: "border-coral bg-paper-soft shadow-sketch dark:bg-chalk",
    idle:
      "border-ink/70 bg-paper hover:border-coral hover:shadow-sketch dark:border-paper/60 dark:bg-chalk-soft",
  },
  leaf: {
    selected: "border-leaf bg-paper-soft shadow-sketch dark:bg-chalk",
    idle:
      "border-ink/70 bg-paper hover:border-leaf hover:shadow-sketch dark:border-paper/60 dark:bg-chalk-soft",
  },
  marker: {
    selected: "border-marker bg-paper-soft shadow-sketch dark:bg-chalk",
    idle:
      "border-ink/70 bg-paper hover:border-marker hover:shadow-sketch dark:border-paper/60 dark:bg-chalk-soft",
  },
  orange: {
    selected: "border-orange bg-paper-soft shadow-sketch dark:bg-chalk",
    idle:
      "border-ink/70 bg-paper hover:border-orange hover:shadow-sketch dark:border-paper/60 dark:bg-chalk-soft",
  },
};

function ReactionChip({
  option,
  selected,
  disabled,
  onPick,
}: {
  option: (typeof REACTION_OPTIONS)[number];
  selected: boolean;
  disabled: boolean;
  onPick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const showScribble = selected || hovered;
  const style = CHIP_STYLE[option.color];

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onPick}
      aria-pressed={selected}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className={[
        "inline-flex items-center rounded-sketch border-2 px-4 py-2.5 font-hand text-2xl leading-none shadow-sketch-sm",
        "transition-[box-shadow,border-color,background-color,opacity] duration-150",
        "disabled:opacity-50",
        option.tilt,
        selected ? style.selected : style.idle,
      ].join(" ")}
    >
      <Scribble
        type={option.scribble}
        color={option.color}
        show={showScribble}
        multiline={false}
        strokeWidth={2}
        delay={0}
      >
        {option.label}
      </Scribble>
    </button>
  );
}

function PulseDistribution({
  pulse,
}: {
  pulse: PostPulse;
}) {
  const total = REACTION_OPTIONS.reduce((sum, r) => sum + pulse.counts[r.id], 0);

  const segments = REACTION_OPTIONS.map((option) => {
    const count = pulse.counts[option.id];
    const share = total > 0 ? (count / total) * 100 : 0;
    return { option, count, share, pct: Math.round(share) };
  });

  const barLabel = segments
    .filter((s) => s.count > 0)
    .map((s) => `${s.option.label} ${s.pct}%`)
    .join(", ");

  return (
    <div className="sketch-card p-5 sm:p-6">
      <p className="font-hand text-2xl text-marker">The pulse</p>
      <p className="mt-0.5 font-sans text-sm text-ink-soft dark:text-paper/70">
        {total === 1 ? "1 reader weighed in" : `${total} readers weighed in`}
      </p>

      <div
        className="mt-5 flex h-4 overflow-hidden rounded-sketch border-2 border-ink/15 bg-paper-soft dark:border-paper/20 dark:bg-chalk"
        role="img"
        aria-label={barLabel || "No reactions yet"}
      >
        {total > 0 &&
          segments
            .filter((s) => s.count > 0)
            .map((segment, index) => (
              <div
                key={segment.option.id}
                className={[
                  "h-full transition-[width] duration-700 ease-out",
                  BAR_COLOR[segment.option.color],
                  index === 0 && "rounded-l-[inherit]",
                  index === segments.filter((s) => s.count > 0).length - 1 && "rounded-r-[inherit]",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={{
                  width: `${segment.share}%`,
                  transitionDelay: `${index * 60}ms`,
                }}
              />
            ))}
      </div>

      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
        {segments.map(({ option, count, pct }) => {
          const yours = pulse.yours === option.id;

          return (
            <li key={option.id} className="flex items-center gap-2">
              <span
                className={[
                  "h-3 w-3 shrink-0 rounded-sm border border-ink/20",
                  BAR_COLOR[option.color],
                ].join(" ")}
                aria-hidden
              />
              <span className="font-hand text-xl leading-none">
                {option.label}
                {yours && (
                  <span className="ml-1.5 font-sans text-xs font-semibold text-marker">you</span>
                )}
              </span>
              <span className="font-mono text-xs tabular-nums text-ink-faint">
                {pct}% ({count})
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function PostReactions({
  postSlug,
  initial,
}: {
  postSlug: string;
  initial: PostPulse;
}) {
  const [pulse, setPulse] = useState(initial);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  if (!pulse.enabled) return null;

  const hasVoted = pulse.yours !== null;

  function pick(reaction: ReactionId) {
    setError(null);
    startTransition(async () => {
      const result = await applyPulseTake(postSlug, reaction);
      if (result.ok) {
        setPulse(result.pulse);
      } else {
        setError(result.error);
      }
    });
  }

  return (
    <section
      className="mt-12 border-t-2 border-dashed border-ink/25 pt-8 dark:border-paper/20"
      aria-label="Reader reactions"
    >
      <p className="font-hand text-3xl text-marker">Your take?</p>
      <p className="mt-1 font-sans text-sm text-ink-soft dark:text-paper/70">
        Tap a scribble — change it anytime on this device.
        {!hasVoted && " The split reveals once you pick."}
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        {REACTION_OPTIONS.map((option) => (
          <ReactionChip
            key={option.id}
            option={option}
            selected={pulse.yours === option.id}
            disabled={pending}
            onPick={() => pick(option.id)}
          />
        ))}
      </div>

      <div
        className={[
          "grid transition-[grid-template-rows,opacity,margin] duration-500 ease-out",
          hasVoted ? "mt-6 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0",
        ].join(" ")}
        aria-hidden={!hasVoted}
      >
        <div className="overflow-hidden">
          {hasVoted && <PulseDistribution pulse={pulse} />}
        </div>
      </div>

      {error && (
        <p className="mt-3 font-mono text-xs text-coral" role="status">
          {error}
        </p>
      )}
    </section>
  );
}
