export const REACTION_OPTIONS = [
  {
    id: "l-take",
    label: "L take",
    scribble: "crossed-off",
    color: "coral",
    tilt: "-rotate-1",
  },
  {
    id: "w-take",
    label: "W take",
    scribble: "circle",
    color: "leaf",
    tilt: "rotate-1",
  },
  {
    id: "spicy",
    label: "Spicy",
    scribble: "underline",
    color: "orange",
    tilt: "-rotate-1.5",
  },
  {
    id: "based",
    label: "Based",
    scribble: "box",
    color: "marker",
    tilt: "rotate-1.5",
  },
] as const;

export type ReactionId = (typeof REACTION_OPTIONS)[number]["id"];
export type ReactionOption = (typeof REACTION_OPTIONS)[number];

export type PostPulse = {
  enabled: boolean;
  counts: Record<ReactionId, number>;
  yours: ReactionId | null;
};

export const REACTION_IDS = new Set<string>(REACTION_OPTIONS.map((r) => r.id));

export function emptyReactionCounts(): Record<ReactionId, number> {
  return Object.fromEntries(REACTION_OPTIONS.map((r) => [r.id, 0])) as Record<
    ReactionId,
    number
  >;
}
