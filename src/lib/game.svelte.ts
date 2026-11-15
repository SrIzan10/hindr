import { get, writable } from "svelte/store";
import AndrewImage from '#lib/assets/andrew.jpg';

export type Card = {
  id: string | number;
  name: string;
  description?: string;
  image?: string;
  dealbreakers?: Dealbreaker[];
};

/**
 * Every horse has its own dealbreakers: if the player's meter leans `at` or more toward
 * `pole` while chatting with that horse, the horse unmatches with `message`.
 */
export const horseCards: Card[] = [
  {
    id: 1, name: 'Andrew', description: "I'm single and ready to mingle", image: AndrewImage, dealbreakers: [
      {
        pole: "ruthless",
        at: 5,
        message: "I get that you were hurt, but I'm not paying for what a donkey did. Unmatched. 🐴💨"
      },
      {
        pole: "serious",
        at: 4,
        message: "This is starting to feel like an interrogation. I came here for a date, not a background check. Unmatched."
      }
    ]
  },
  {
    id: 2, name: 'Mathias', description: "I'm interested in long term relationship", image: AndrewImage, dealbreakers: [
      {
        pole: "playful",
        at: 9,
        message: "Everything is a joke to you, isn't it? I'm looking for something that lasts. Unmatched."
      },
      {
        pole: "ruthless",
        at: 4,
        message: "I want someone to grow old in a pasture with, not someone who kicks. Unmatched."
      }
    ]
  },
  {
    id: 3, name: 'Lena', description: "I'm single and ready to mingle", image: AndrewImage, dealbreakers: [
      {
        pole: "confident",
        at: 6,
        message: "You're clearly already in a relationship. With yourself. I'll leave you two alone. Unmatched. 💅"
      },
      {
        pole: "serious",
        at: 4,
        message: "I came here to mingle, not to fill in a form. Loosen up next time. Unmatched."
      }
    ]
  },
  {
    id: 4, name: 'Benedict', description: "I'm single and ready to mingle", image: AndrewImage, dealbreakers: [
      {
        pole: "vulnerable",
        at: 7,
        message: "You're sweet, but I can't be your whole herd. This is a bit much for me. Unmatched."
      },
      {
        pole: "ruthless",
        at: 5,
        message: "I've been bitten before, and it started out sounding just like this. Unmatched. 🐴💨"
      }
    ]
  }
];

export type Message = {
	text: string;
	from: "user" | "system";
};

export const messages = writable<Message[]>([]);

/**
 * Each axis runs from its first pole (positive values) to its second pole (negative values).
 * e.g. kindness = +4 means "kind", kindness = -4 means "ruthless".
 */
export const AXES = {
	kindness: ["kind", "ruthless"],
	confidence: ["confident", "vulnerable"],
	playfulness: ["playful", "serious"]
} as const;

export type Axis = keyof typeof AXES;
export type Pole = (typeof AXES)[Axis][number];
export type Meter = Record<Axis, number>;
export type Effects = Partial<Meter>;

/** Meter values are clamped to [-METER_LIMIT, METER_LIMIT]. */
export const METER_LIMIT = 10;
/** A pole only counts as "dominant" once its axis is at least this far from 0. */
const DOMINANT_MIN = 2;

const AXIS_KEYS = Object.keys(AXES) as Axis[];

const emptyMeter = (): Meter => ({ kindness: 0, confidence: 0, playfulness: 0 });
const clamp = (n: number) => Math.max(-METER_LIMIT, Math.min(METER_LIMIT, n));

/** Hidden personality meter, one per horse id. In-memory only. */
export const meters = writable<Record<string, Meter>>({});

export function getMeter(horseId: Card["id"]): Meter {
	return get(meters)[horseId] ?? emptyMeter();
}

export function resetMeter(horseId: Card["id"]) {
	meters.update((m) => ({ ...m, [horseId]: emptyMeter() }));
}

/** Adds the effects to the horse's meter and returns the new meter. */
export function applyEffects(horseId: Card["id"], effects: Effects): Meter {
	const next = { ...getMeter(horseId) };
	for (const axis of AXIS_KEYS) {
		next[axis] = clamp(next[axis] + (effects[axis] ?? 0));
	}
	meters.update((m) => ({ ...m, [horseId]: next }));
	return next;
}

/** How far the meter leans toward a pole (negative if it leans the other way). */
export function poleValue(meter: Meter, pole: Pole): number {
	for (const axis of AXIS_KEYS) {
		const [pos, neg] = AXES[axis];
		if (pole === pos) return meter[axis];
		if (pole === neg) return -meter[axis];
	}
	return 0;
}

/** The pole the meter leans hardest toward, or null if nothing stands out yet. */
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

/** If the meter leans `at` or more toward `pole`, the horse unmatches with `message`. */
export type Dealbreaker = {
	pole: Pole;
	at: number;
	message: string;
};

export function getHorse(horseId: Card["id"]): Card | undefined {
	return horseCards.find((card) => card.id === horseId);
}

/** The first of the horse's dealbreakers that the meter has crossed, if any. */
export function brokenDealbreaker(horseId: Card["id"], meter: Meter): Dealbreaker | undefined {
	return getHorse(horseId)?.dealbreakers?.find((d) => poleValue(meter, d.pole) >= d.at);
}
