import { dominantPole, type Effects, type Meter, type Pole } from "./game.svelte";

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
 * The player's backstory (see cutscene-dialogue.svelte.ts): they were happily married for six
 * years until their spouse confessed one morning to being a donkey, sent by the Donkey
 * Army to infiltrate horse society. They're back on Hinder, paranoid, and keep checking
 * that the horse they matched with really is a horse.
 * The horse is just a regular horse reacting to all of this.
 *
 * 10 speaking turns. Turn 0 is the player's opening line; every later turn starts with
 * the horse's `prompt`, and the 3 options are answers to it. Replies only react to the
 * line just sent, so any option fits after any earlier choice.
 * The story (the marriage, the donkey, the spying) is told by the player: at each story
 * turn all 3 options reveal the same beat in a different tone, so it unfolds the same way
 * on every path. The last turn decides where the first date happens.
 */
export const interactions: Interaction[] = [
	{
		options: [
			{
				text: "Are you a racehorse? You've been running through my mind all day.",
				effects: { confidence: 2, playfulness: 1 },
				reply: "Okay, that was smooth. You've done this before."
			},
			{
				text: "Is your name Hay? Because I keep coming back for more.",
				effects: { playfulness: 2, kindness: 1 },
				reply: "That's so corny. I like corn, though."
			},
			{
				text: "I'm a bit nervous. You're the first horse I've messaged in a long time.",
				effects: { confidence: -2, kindness: 1 },
				reply: "Don't be. You're doing fine so far."
			}
		]
	},
	{
		prompt: "Anyway, ask me something. Anything.",
		options: [
			{
				text: "Easy one. You're a horse, right? Four legs, a mane, no secrets?",
				effects: { playfulness: 2, confidence: 1 },
				reply: "Last I checked. Weird first question.",
				variants: {
					playful: "Four legs, one mane, no secrets. I'd like my sugar cube now."
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
				text: "Just one thing. Prove you're a horse.",
				effects: { kindness: -1, confidence: 2 },
				reply: "Prove it? I have hooves. That's all I've got.",
				variants: {
					confident: "Straight to it, huh. Hooves, mane, tail. All real."
				}
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
				text: "The last horse I trusted was a donkey. Six years married. Your word isn't enough.",
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
		prompt: "Wait, six years? How did you find out?",
		options: [
			{
				text: "They told me over breakfast. 'I'm a donkey. The Donkey Army sent me.' Then they left.",
				effects: { playfulness: 2 },
				reply: "The Donkey Army. I didn't know that was a real thing.",
				variants: {
					playful: "The Donkey Army. Sorry, I shouldn't laugh. That's terrible."
				}
			},
			{
				text: "They told me themselves. The Donkey Army sent them to infiltrate horse society. That's why I'm careful.",
				effects: { kindness: 1, playfulness: -1 },
				reply: "Six years undercover. No wonder you're careful.",
				variants: {
					kind: "That's a real betrayal. I get it now."
				}
			},
			{
				text: "They confessed one morning. A spy for the Donkey Army the whole time. I still feel stupid.",
				effects: { confidence: -2, kindness: 1 },
				reply: "You're not stupid. Anyone would trust their spouse.",
				variants: {
					vulnerable: "Trusting someone isn't stupid. That's on them, not you."
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
		prompt: "I'll take that as a pass. Lighter question: rolling in mud, yes or no?",
		options: [
			{
				text: "Yes. My ex hated mud. Should have been a clue.",
				effects: { playfulness: 2, kindness: 1 },
				reply: "Finally, a mud horse. And yes, big clue.",
				variants: {
					playful: "Finally. Last one in the puddle is a donkey."
				}
			},
			{
				text: "No. It's disgusting. And you can hide anything in mud.",
				effects: { kindness: -2, playfulness: -1 },
				reply: "Disgusting? That's my skincare routine.",
				variants: {
					ruthless: "It's mud, not a conspiracy.",
					serious: "Not a single fun bone in your body. Noted."
				}
			},
			{
				text: "I've never dared. My ex said horses don't do that. Would you show me?",
				effects: { confidence: -2, kindness: 1 },
				reply: "Horses definitely do that. Step one, find mud. Step two, commit.",
				variants: {
					vulnerable: "They lied about that too. I'll show you. We'll go slow."
				}
			}
		]
	},
	{
		prompt: "Seriously though, how are you doing now? Since the donkey, I mean.",
		options: [
			{
				text: "Not great. I still look twice at every horse I meet.",
				effects: { confidence: -2, kindness: 1 },
				reply: "Every horse? That sounds exhausting.",
				variants: {
					vulnerable: "That sounds exhausting. For the record, I'm just a horse."
				}
			},
			{
				text: "Fine. I told them to get out and I kept the stable.",
				effects: { confidence: 2, kindness: -2 },
				reply: "I can't tell if that's impressive or scary.",
				variants: {
					confident: "You kept the stable? Okay, power move.",
					ruthless: "Remind me never to get on your bad side."
				}
			},
			{
				text: "Great, actually. Whole stall to myself, and a good story for parties.",
				effects: { playfulness: 2 },
				reply: "It is a good story. I'd lead with it.",
				variants: {
					playful: "Best opener on Hinder. Put it in your bio."
				}
			}
		]
	},
	{
		prompt: "Okay, real question. What are you looking for on here?",
		options: [
			{
				text: "Something honest. No missions, no secrets.",
				effects: { playfulness: -2, confidence: 1 },
				reply: "No secrets. I can do that.",
				variants: {
					serious: "No secrets. Understood. I'll have my papers ready."
				}
			},
			{
				text: "Someone to laugh with. It's been a while since I laughed.",
				effects: { playfulness: 2, kindness: 1 },
				reply: "I can work on that. I know a lot of bad hay jokes.",
				variants: {
					kind: "I like that answer. Let's get you laughing again."
				}
			},
			{
				text: "I just don't want to be alone anymore. The stall's been quiet since they left.",
				effects: { confidence: -2, playfulness: -1 },
				reply: "Me neither. Quiet stalls are the worst.",
				variants: {
					vulnerable: "Me neither. I think that's why I swiped right on you."
				}
			}
		]
	},
	{
		prompt: "Is there anything else you need before you can trust me?",
		options: [
			{
				text: "No. You've been patient with me. I believe you're a horse.",
				effects: { kindness: 2 },
				reply: "Good. Because I am. Promise.",
				variants: {
					kind: "Thank you. I know that wasn't easy to say."
				}
			},
			{
				text: "Doesn't matter what you say. A donkey spy would deny it too.",
				effects: { kindness: -2, confidence: 1 },
				reply: "That's a trap, not a question. I can't win that one.",
				variants: {
					ruthless: "Then nothing I say is ever going to be enough for you."
				}
			},
			{
				text: "Just one. If you were a donkey spy, would you tell me?",
				effects: { playfulness: 2 },
				reply: "I can't keep a secret. My cover would last a day.",
				variants: {
					playful: "I'd be the worst spy. I can't even keep a surprise party quiet."
				}
			}
		]
	},
	{
		prompt: "So, first date. Where are we going?",
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
				text: "A canter through the woods. Just us, no eavesdroppers.",
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
				reply: "You're on. Saturday, the track. Stretch first.",
				variants: {
					playful: "Race you there. Saturday, the track. Loser buys the oats.",
					ruthless: "Fine, the track. Saturday. I'll outrun every doubt you have."
				}
			}
		]
	}
];
