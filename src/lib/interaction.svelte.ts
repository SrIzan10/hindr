import { dominantPole, type Effects, type HorseProfile, type Meter, type Pole } from "./game.svelte";

export type ReplyOption = {
	/** What the user sends */
	text: string;
	/** How this line nudges the hidden meter (roughly -2..+2 per axis) */
	effects: Effects;
	/** What the horse answers back by default */
	reply: string;
	/** Answers used instead when the meter (after this line) leans hardest toward a pole */
	variants?: Partial<Record<Pole, string>>;
};

export type Interaction = {
	/** What the horse asks to open this turn (sent after the previous reply). Turn 0 has none: the player opens. */
	prompt?: string;
	options: [ReplyOption, ReplyOption, ReplyOption];
};

export function pickReply(option: ReplyOption, meter: Meter): string {
	const pole = dominantPole(meter);
	return (pole && option.variants?.[pole]) ?? option.reply;
}

/**
 * Andrew's backstory: he was happily married for six years until his spouse turned out
 * to be a donkey spy filing reports on the stable. He's back on Hinder, charming but
 * paranoid, and keeps checking that the player really is a horse.
 */
export const horseProfiles: Record<string, HorseProfile> = {
	andrew: {
		id: "andrew",
		name: "Andrew",
		dealbreakers: [
			{
				pole: "ruthless",
				at: 5,
				message: "You know what? You sound exactly like my ex. I'm not doing this twice. Unmatched. 🐴💨"
			},
			{
				pole: "serious",
				at: 4,
				message: "This is starting to feel like a debriefing. I've had enough interrogations for one lifetime. Unmatched."
			}
		]
	}
};

/**
 * 10 speaking turns. Turn 0 is the player's opening line; every later turn starts with
 * the horse's `prompt`, and the 3 options are answers to it. Replies only react to the
 * line just sent, so any option fits after any earlier choice.
 * The story (the marriage, the donkey, the spying) is revealed through the prompts, so it
 * unfolds the same way on every path. The last turn decides where the first date happens.
 */
export const interactions: Interaction[] = [
	{
		options: [
			{
				text: "Are you a racehorse? Because you've been running through my mind all day.",
				effects: { confidence: 2, playfulness: 1 },
				reply: "Neigh-ce one 😏 It's been a while since anyone flirted with me."
			},
			{
				text: "Is your name Hay? Because I can't stop thinking about grazing with you.",
				effects: { playfulness: 2, kindness: 1 },
				reply: "Okay that's corny... and I love corn."
			},
			{
				text: "Honestly I'm nervous, you're the first horse I've ever dared to message.",
				effects: { confidence: -2, kindness: 1 },
				reply: "Aww. Relax, I'm nervous too. It's my first time back on here."
			}
		]
	},
	{
		prompt: "Before we go any further, I have to ask. You ARE a horse, right?",
		options: [
			{
				text: "Last time I checked. Four legs, one mane, zero secrets.",
				effects: { playfulness: 2, confidence: 1 },
				reply: "Zero secrets. Good. Sorry, I ask everyone now.",
				variants: {
					playful: "Zero secrets! You have no idea how refreshing that is 😄"
				}
			},
			{
				text: "Um, yes? Should I be worried about that question?",
				effects: { confidence: -2, kindness: 1 },
				reply: "No, no. It's not you, it's me. I've got... history.",
				variants: {
					vulnerable: "Don't worry, it's not you. I'm the jumpy one here."
				}
			},
			{
				text: "What kind of question is that? Obviously.",
				effects: { kindness: -1, confidence: 2 },
				reply: "Okay, okay. Touchy. That's either very horse or very suspicious.",
				variants: {
					confident: "Alright, alright. I like a horse who knows what they are."
				}
			}
		]
	},
	{
		prompt: "Here's why I ask. I was married. Happily, for six years. Then my spouse turned out to be a donkey.",
		options: [
			{
				text: "I'm so sorry. That must have been awful.",
				effects: { kindness: 2 },
				reply: "Thank you. It was. Looking back, the ears should have tipped me off.",
				variants: {
					kind: "Thank you. You're the first one who didn't laugh."
				}
			},
			{
				text: "A DONKEY? How do you miss that for six years?",
				effects: { kindness: -2, playfulness: 1 },
				reply: "They wore a very convincing hat, alright?",
				variants: {
					ruthless: "They wore a hat. And you could show a little compassion."
				}
			},
			{
				text: "That's a serious breach of trust. How did you find out?",
				effects: { playfulness: -2, confidence: 1 },
				reply: "The hat came off in the wind. Six years, gone in one gust.",
				variants: {
					serious: "The hat came off. You sound like the investigators, by the way."
				}
			}
		]
	},
	{
		prompt: "It gets worse. Not just a donkey. A donkey SPY. Six years of secret reports on our stable.",
		options: [
			{
				text: "A spy? What is there to spy on in a stable?",
				effects: { playfulness: 2 },
				reply: "The hay rotation schedule, apparently. Highly classified.",
				variants: {
					playful: "Hay schedules. Oat inventories. My snoring patterns. They were thorough 😄"
				}
			},
			{
				text: "That's a real betrayal. No wonder you're careful.",
				effects: { kindness: 1, playfulness: -1 },
				reply: "Thanks for getting it. Most horses just go 'hee-haw' at me and laugh.",
				variants: {
					kind: "Thank you. It helps to hear someone say that out loud."
				}
			},
			{
				text: "I'd never recover. I trust way too easily too.",
				effects: { confidence: -2, kindness: 1 },
				reply: "Then we'll have to look out for each other.",
				variants: {
					vulnerable: "Me too. That's exactly what scares me about this."
				}
			}
		]
	},
	{
		prompt: "So you'll understand why I need a quick check. Say 'neigh' for me.",
		options: [
			{
				text: "Neeeigh. Full whinny, with feeling.",
				effects: { playfulness: 2, confidence: 1 },
				reply: "Flawless. Not a hint of hee-haw.",
				variants: {
					playful: "Beautiful. I'd know that whinny anywhere 😄"
				}
			},
			{
				text: "Neigh? Sorry, I'm shy about my voice.",
				effects: { confidence: -2, kindness: 1 },
				reply: "That was a lovely neigh. Quiet, but one hundred percent horse.",
				variants: {
					vulnerable: "Don't be shy. That's the most honest neigh I've heard in years."
				}
			},
			{
				text: "Hee-haw. Kidding. Or am I?",
				effects: { kindness: -2, playfulness: 1 },
				reply: "NOT funny. ...Okay, a little funny. Never do it again.",
				variants: {
					ruthless: "That's not a joke to me. Careful."
				}
			}
		]
	},
	{
		prompt: "You pass. Okay, something lighter. Rolling in mud: yes or no?",
		options: [
			{
				text: "Yes. A clean coat is overrated.",
				effects: { playfulness: 2, kindness: 1 },
				reply: "Finally. My ex hated mud. That should have been a clue.",
				variants: {
					playful: "Finally! Last one in the puddle is a donkey 😄"
				}
			},
			{
				text: "No. That's disgusting.",
				effects: { kindness: -2, playfulness: -1 },
				reply: "Disgusting?! That's my skincare routine you're talking about.",
				variants: {
					ruthless: "That's exactly what the donkey used to say.",
					serious: "Not a single fun bone in your body, is there?"
				}
			},
			{
				text: "I've never tried it. Would you show me?",
				effects: { confidence: -2, kindness: 1 },
				reply: "I'd be honoured. Step one: find mud. Step two: commit.",
				variants: {
					vulnerable: "Of course. We'll go slow, there's a technique to it."
				}
			}
		]
	},
	{
		prompt: "Enough about my disaster. Has anyone ever trampled YOUR heart?",
		options: [
			{
				text: "I got stood up once and waited two hours anyway.",
				effects: { confidence: -2, kindness: 1 },
				reply: "Two hours? I'd never do that to you. I'm not the one with a double life.",
				variants: {
					vulnerable: "That's awful. For the record, I show up. Always."
				}
			},
			{
				text: "No. I'm usually the one doing the trampling.",
				effects: { confidence: 2, kindness: -2 },
				reply: "...I can't tell if that's a brag or a warning.",
				variants: {
					confident: "Okay, that was smooth. Terrifying, but smooth.",
					ruthless: "That's a warning, and I'm starting to hear it."
				}
			},
			{
				text: "My last date took me to the races to watch their ex run.",
				effects: { playfulness: 2 },
				reply: "Their EX? Rough. Still better than finding a radio in the hay.",
				variants: {
					playful: "Oh no 😂 Still beats finding a radio in the hay."
				}
			}
		]
	},
	{
		prompt: "Getting real for a second. What are you actually looking for on here?",
		options: [
			{
				text: "Something honest. No games, no secrets.",
				effects: { playfulness: -2, confidence: 1 },
				reply: "No secrets. You have no idea how good that sounds.",
				variants: {
					serious: "No secrets. Good. I've had enough files kept on me."
				}
			},
			{
				text: "Someone to laugh with. The rest sorts itself out.",
				effects: { playfulness: 2, kindness: 1 },
				reply: "Good answer. I haven't laughed this much since before the hat came off.",
				variants: {
					kind: "That's a lovely answer. I think I'm already laughing again."
				}
			},
			{
				text: "Honestly, I just don't want to be alone anymore.",
				effects: { confidence: -2, playfulness: -1 },
				reply: "Hey. Me neither. The stall has been very quiet since they left.",
				variants: {
					vulnerable: "Me neither. I think that's why I swiped right on you."
				}
			}
		]
	},
	{
		prompt: "Last check, I promise. If you WERE a donkey spy, would you tell me?",
		options: [
			{
				text: "I'd tell you everything. You deserve the truth this time.",
				effects: { kindness: 2 },
				reply: "That's all I ever wanted to hear. Low bar, I know.",
				variants: {
					kind: "That might be the nicest thing anyone has said to me since the divorce."
				}
			},
			{
				text: "A good spy wouldn't. So you'll never really know.",
				effects: { kindness: -2, confidence: 1 },
				reply: "That is NOT reassuring. Why would you say that?",
				variants: {
					ruthless: "That's exactly what a donkey would say."
				}
			},
			{
				text: "I can't keep a secret. I'd blow my cover in a day.",
				effects: { playfulness: 2 },
				reply: "Honestly, that's the most attractive thing you've said so far.",
				variants: {
					playful: "Worst spy ever. I love that for us 😄"
				}
			}
		]
	},
	{
		prompt: "Alright. I believe you. Where are we going for our first date?",
		options: [
			{
				text: "The paddock at sunset. I know where the best apples fall.",
				effects: { kindness: 2 },
				reply: "It's a date! Saturday, the paddock, sunset. Open field, nowhere to hide a radio. 💕",
				variants: {
					kind: "Perfect. Saturday, the paddock, sunset. I'll bring my good side 💕",
					vulnerable: "The paddock at sunset. I'll be at the gate early so you don't have to be nervous 💕",
					ruthless: "Fine. The paddock, Saturday. Wide open, where I can keep an eye on you."
				}
			},
			{
				text: "A canter through the woods. Just the two of us.",
				effects: { confidence: 1, playfulness: -1 },
				reply: "A canter in the woods? Say less. Saturday. I'll save you the shady side of the path.",
				variants: {
					confident: "Bold. I like it. Saturday, and I know a trail nobody else uses 😘",
					serious: "Quiet woods, no distractions, no eavesdroppers. Saturday. That sounds exactly right.",
					ruthless: "Fine, the woods. Saturday. I'll be checking the bushes for donkeys."
				}
			},
			{
				text: "The racetrack. I want to see what those legs can do.",
				effects: { confidence: 2, playfulness: 2 },
				reply: "Oh, you're ON. Saturday, the track. Stretch first, you'll need it 😏",
				variants: {
					playful: "Race you there! Saturday, the track. Loser buys the oats 😘",
					ruthless: "Fine, the track. Saturday. Donkeys can't keep up, so we'll see what you really are."
				}
			}
		]
	}
];
