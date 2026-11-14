import { get, writable } from "svelte/store";

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

export function getMeter(horseId: string): Meter {
	return get(meters)[horseId] ?? emptyMeter();
}

export function resetMeter(horseId: string) {
	meters.update((m) => ({ ...m, [horseId]: emptyMeter() }));
}

/** Adds the effects to the horse's meter and returns the new meter. */
export function applyEffects(horseId: string, effects: Effects): Meter {
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

export type HorseProfile = {
	id: string;
	name: string;
	dealbreakers: Dealbreaker[];
};

export function brokenDealbreaker(
	profile: HorseProfile | undefined,
	meter: Meter
): Dealbreaker | undefined {
	return profile?.dealbreakers.find((d) => poleValue(meter, d.pole) >= d.at);
}
