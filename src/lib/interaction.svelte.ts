import { dominantPole, type Effects, type Meter, type Pole } from "./game.svelte";

export type ReplyOption = {
	text: string;
	effects: Effects;
	reply: string;
	variants?: Partial<Record<Pole, string>>;
};

export type Interaction = {
	prompt?: string;
	options: [ReplyOption, ReplyOption, ReplyOption];
};

export function pickReply(option: ReplyOption, meter: Meter): string {
	const pole = dominantPole(meter);
	return (pole && option.variants?.[pole]) ?? option.reply;
}

export const interactions: Interaction[] = [
	{
		options: [
			{
				text: "Are you a racehorse? You've been running through my mind all day.",
				effects: { confidence: 2, playfulness: 1 },
				reply: "Okay, that was kinda smooth. You've done this before."
			},
			{
				text: "Are you called Hay? Because I keep coming back for more.",
				effects: { playfulness: 2, kindness: 1 },
				reply: "Coming back for more? You'll get more than enough ;)"
			},
			{
				text: "I'm a bit nervous. You're the first horse I've messaged in a long time.",
				effects: { confidence: -2, kindness: 1 },
				reply: "Don't be. You're doing great so far."
			}
		]
	},
	{
		prompt: "Anyway, ask me something. Anything.",
		options: [
			{
				text: "Let's start easy. Proe you're a horse",
				effects: { playfulness: 2, confidence: 1 },
				reply: "Prove it? Last I checked I was a horse. Weird first question.",
				variants: {
					playful: "Prove it? I want to prove other things ;)"
				}
			},
			{
				text: "Sorry, this will sound odd. You are actually a horse, aren't you?",
				effects: { confidence: -2, kindness: 1 },
				reply: "Um, yes? It's fine, you can ask.",
				variants: {
					vulnerable: "I am. Don't apologise."
				}
			},
			{
				text: "Just one thing. Your a horse, right?",
				effects: { kindness: -1, confidence: 2, playfulness: -1 },
				reply: "Yup. That's all I've got.",
				variants: {
					confident: "Y",
				},
			}
		]
	},
	{
		prompt: "Why would you even ask that, though?",
		options: [
			{
				text: "I'd rather be honest. I was married for six years. My spouse turned out to be a donkey.",
				effects: { kindness: 2 },
				reply: "Oh. I'm sorry. That's awful.",
				variants: {
					kind: "Oh no. I'm sorry. Thanks for telling me."
				}
			},
			{
				text: "The last horse I trusted was a donkey. Six years married. Your word isn't enough for this.",
				effects: { kindness: -2, playfulness: 1 },
				reply: "Ouch. I'm not them, though.",
				variants: {
					ruthless: "That's rough. I'm not the one who lied to you, though."
				}
			},
			{
				text: "My spouse of six years was a donkey. I check everyone now. It's procedure.",
				effects: { playfulness: -2, confidence: 1 },
				reply: "Procedure. Right. Fair enough, I guess.",
				variants: {
					serious: "I get it. It does feel a bit like a background check."
				}
			}
		]
	},
	{
		prompt: "Okay. What would make you feel safe with me?",
		options: [
			{
				text: "Say 'neigh' for me. Full whinny, with feeling.",
				effects: { playfulness: 2, confidence: 1 },
				reply: "Neeeigh. There, with feeling.",
				variants: {
					playful: "NEEEIGH. Ten out of ten, I'd say."
				}
			},
			{
				text: "Could you say 'neigh'? I know it's silly, sorry.",
				effects: { confidence: -2, kindness: 1 },
				reply: "Neigh. Not silly. All horse.",
				variants: {
					vulnerable: "Neigh. It's not silly. Ask as often as you need."
				}
			},
			{
				text: "Say 'neigh'. One hee-haw and we're done.",
				effects: { kindness: -2, playfulness: 1 },
				reply: "Neigh. No hee-haw. Tough crowd.",
				variants: {
					ruthless: "Neigh. There. I'm not on trial, you know."
				}
			}
		]
	},
	{
		prompt: "I'll take that as a pass. So, first date. Where are we going?",
		options: [
			{
				text: "The paddock at sunset. Wide open, nowhere to hide.",
				effects: { kindness: 2 },
				reply: "It's a date. Saturday, the paddock, sunset. I'll bring apples.",
				variants: {
					kind: "Perfect. Saturday, the paddock, sunset. I'll bring apples.",
					vulnerable: "The paddock at sunset. I'll be at the gate early so you're not waiting alone.",
					ruthless: "Fine. The paddock, Saturday. Search me at the gate if you have to."
				}
			},
			{
				text: "A walk in the woods. Just us, no eavesdroppers.",
				effects: { confidence: 1, playfulness: -1 },
				reply: "The woods it is. Saturday. I know a good path.",
				variants: {
					confident: "Bold. I like it. Saturday. I know a trail nobody uses.",
					serious: "Quiet woods, no distractions. Saturday. I'll come alone.",
					ruthless: "Fine, the woods. Saturday. Check the bushes for donkeys first if you want."
				}
			},
			{
				text: "The racetrack. Donkeys can't keep up, so I'll know for sure.",
				effects: { confidence: 2, playfulness: 2 },
				reply: "Bet, see you there next saturday.",
				variants: {
				  playful: "See you there!",
					ruthless: "Fine, next saturday. I'll outrun every doubt you have."
				}
			}
		]
	}
];
