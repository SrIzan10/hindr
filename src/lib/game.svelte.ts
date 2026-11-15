import { get, writable } from "svelte/store";
import AndrewImage from "#lib/assets/andrew.jpg";
import MathiasImage from "#lib/assets/mathias.jpg";
import LenaImage from "#lib/assets/lena.jpeg";
import NinaImage from "#lib/assets/nina.png";

export type Card = {
  id: string | number;
  name: string;
  description?: string;
  image?: string;
  dealbreakers?: Dealbreaker[];
};

export const horseCards: Card[] = [
  {
    id: 1,
    name: "Mathias",
    description: "I'm interested in long term relationships",
    image: MathiasImage,
    dealbreakers: [
      {
        pole: "playful",
        at: 5,
        message:
          "You're not taking things seriusly. I told you I'm interested in long term relationships. Grow up.",
      }
    ],
  },
  {
    id: 2,
    name: "Andrew",
    description: "I'm single and ready to mingle",
    image: AndrewImage,
    dealbreakers: [
      {
        pole: "vulnerable",
        at: 3,
        message:
          "I think you're not confident enough for me tbh, bye.",
      }
    ],
  },
  {
    id: 3,
    name: "Lena",
    description: "I like playing baseball, if you know what I mean ;)",
    image: LenaImage,
    dealbreakers: [
      {
        pole: "confident",
        at: 4,
        message:
          "You're clearly already in a relationship. With yourself. I hate your nsrcism.",
      },
    ],
  },
  {
    id: 4,
    name: "Nina's horse",
    description: "The handsomest horse in the world.",
    image: NinaImage,
    dealbreakers: [
      {
        pole: "serious",
        at: 2,
        message: "Meow",
      },
    ],
  },
];

export type Message = {
  text: string;
  from: "user" | "system";
};

export const messages = writable<Message[]>([]);

export const AXES = {
  kindness: ["kind", "ruthless"],
  confidence: ["confident", "vulnerable"],
  playfulness: ["playful", "serious"],
} as const;

export type Axis = keyof typeof AXES;
export type Pole = (typeof AXES)[Axis][number];
export type Meter = Record<Axis, number>;
export type Effects = Partial<Meter>;

export const METER_LIMIT = 10;

const DOMINANT_MIN = 2;

const AXIS_KEYS = Object.keys(AXES) as Axis[];

const emptyMeter = (): Meter => ({
  kindness: 0,
  confidence: 0,
  playfulness: 0,
});
const clamp = (n: number) => Math.max(-METER_LIMIT, Math.min(METER_LIMIT, n));

export const meters = writable<Record<string, Meter>>({});

export function getMeter(horseId: Card["id"]): Meter {
  return get(meters)[horseId] ?? emptyMeter();
}

export function resetMeter(horseId: Card["id"]) {
  meters.update((m) => ({ ...m, [horseId]: emptyMeter() }));
}

export function applyEffects(horseId: Card["id"], effects: Effects): Meter {
  const next = { ...getMeter(horseId) };
  for (const axis of AXIS_KEYS) {
    next[axis] = clamp(next[axis] + (effects[axis] ?? 0));
  }
  meters.update((m) => ({ ...m, [horseId]: next }));
  return next;
}

export function poleValue(meter: Meter, pole: Pole): number {
  for (const axis of AXIS_KEYS) {
    const [pos, neg] = AXES[axis];
    if (pole === pos) return meter[axis];
    if (pole === neg) return -meter[axis];
  }
  return 0;
}

export function dominantPole(meter: Meter): Pole | null {
  let best: Pole | null = null;
  let bestAbs = 0;
  for (const axis of AXIS_KEYS) {
    const abs = Math.abs(meter[axis]);
    if (abs >= DOMINANT_MIN && abs > bestAbs) {
      bestAbs = abs;
      best = AXES[axis][meter[axis] > 0 ? 0 : 1];
    }
  }
  return best;
}

export type Dealbreaker = {
  pole: Pole;
  at: number;
  message: string;
};

export function getHorse(horseId: Card["id"]): Card | undefined {
  return horseCards.find((card) => card.id === horseId);
}

export function brokenDealbreaker(
  horseId: Card["id"],
  meter: Meter,
): Dealbreaker | undefined {
  return getHorse(horseId)?.dealbreakers?.find(
    (d) => poleValue(meter, d.pole) >= d.at,
  );
}
