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
 * The player's backstory: they were happily married for six years until their spouse
 * turned out to be a donkey spy filing reports on the stable. They're back on Hinder,
 * paranoid, and keep checking that the horse they matched with really is a horse.
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
				text: "Are you a racehorse? Because you've been running through my mind all day.",
				effects: { confidence: 2, playfulness: 1 },
				reply: "Neigh-ce one 😏 Smooth. You've clearly done this before."
			},
			{
				text: "Is your name Hay? Because I can't stop thinking about grazing with you.",
				effects: { playfulness: 2, kindness: 1 },
				reply: "Okay that's corny... and I love corn."
			},
			{
				text: "Honestly I'm nervous. You're the first horse I've dared to message in a long time.",
				effects: { confidence: -2, kindness: 1 },
				reply: "Aww. Relax, you're doing great. The first message is the hardest."
			}
		]
	},
	{
		prompt: "So, what do you want to know about me? Ask me anything.",
		options: [
			{
				text: "Easy one first. You ARE a horse, right? Four legs, one mane, zero secrets?",
				effects: { playfulness: 2, confidence: 1 },
				reply: "Last time I checked 😄 Strange first question, though.",
				variants: {
					playful: "Four legs, one mane, zero secrets. Do I get a sugar cube for passing? 😄"
				}
			},
			{
				text: "Sorry, this will sound odd... you are actually a horse, aren't you?",
				effects: { confidence: -2, kindness: 1 },
				reply: "Um, yes? It's fine, you can ask. Now I'm curious, though.",
				variants: {
					vulnerable: "I am. No need to apologise. Something tells me there's a story there."
				}
			},
			{
				text: "Just one thing. Prove to me that you're a horse.",
				effects: { kindness: -1, confidence: 2 },
				reply: "Prove it? I have hooves. What more do you want?",
				variants: {
					confident: "Straight to the point. I like that. Hooves, mane, tail, all real."
				}
			}
		]
	},
	{
		prompt: "Okay, I have to know. Why would you even ask that?",
		options: [
			{
				text: "I'd rather be honest with you from the start. I was married for six years. My spouse turned out to be a donkey.",
				effects: { kindness: 2 },
				reply: "Oh. I'm so sorry. That must have been awful.",
				variants: {
					kind: "Oh no. I'm so sorry. Thank you for trusting me with that."
				}
			},
			{
				text: "Because the last 'horse' I trusted was a donkey in a hat. Six years of marriage. So no, your word isn't enough.",
				effects: { kindness: -2, playfulness: 1 },
				reply: "A donkey in a hat? Ouch. Also, rude. I'm not them.",
				variants: {
					ruthless: "That's rough, but I'm not the one who lied to you. Ease up."
				}
			},
			{
				text: "Because my spouse of six years was a donkey. I check everyone now. It's procedure.",
				effects: { playfulness: -2, confidence: 1 },
				reply: "Six years? ...Procedure. Right. That's fair, I guess.",
				variants: {
					serious: "Six years. I get it, but this is starting to feel like a background check."
				}
			}
		]
	},
	{
		prompt: "Hold on. Six years? How did you find out?",
		options: [
			{
				text: "The hat blew off in the wind. Then I found a radio in the hay. Not just a donkey. A donkey SPY, reporting on our hay schedule.",
				effects: { playfulness: 2 },
				reply: "A spy? On HAY? What's so classified about hay?",
				variants: {
					playful: "A hay spy 😂 Sorry. Sorry. That's terrible. Go on."
				}
			},
			{
				text: "I found the reports. They were a spy, filing notes on our stable for six years. I'm telling you so you know why I'm careful.",
				effects: { kindness: 1, playfulness: -1 },
				reply: "A spy. Six years of reports. No wonder you're careful.",
				variants: {
					kind: "That's a real betrayal. Thank you for explaining. I get it now."
				}
			},
			{
				text: "I found a radio in the hay. They were a spy the whole time. I still feel stupid for trusting so easily.",
				effects: { confidence: -2, kindness: 1 },
				reply: "You're not stupid. Anyone would trust their own spouse.",
				variants: {
					vulnerable: "Hey. Trusting someone isn't stupid. That's on them, not on you."
				}
			}
		]
	},
	{
		prompt: "Okay. So what would make you feel safe with me?",
		options: [
			{
				text: "Say 'neigh' for me. Full whinny, with feeling.",
				effects: { playfulness: 2, confidence: 1 },
				reply: "Neeeigh. How was that?",
				variants: {
					playful: "NEEEIGH 😄 Ten out of ten, right? Be honest."
				}
			},
			{
				text: "Could you maybe say 'neigh'? Sorry, I know it's silly.",
				effects: { confidence: -2, kindness: 1 },
				reply: "Neigh. See? Not silly, and one hundred percent horse.",
				variants: {
					vulnerable: "Neigh. It's not silly at all. Ask as many times as you need."
				}
			},
			{
				text: "Say 'neigh'. And if I hear a single hee-haw, we're done.",
				effects: { kindness: -2, playfulness: 1 },
				reply: "Neigh. No hee-haw. Wow, tough crowd.",
				variants: {
					ruthless: "Neigh. There. I'm not on trial, you know."
				}
			}
		]
	},
	{
		prompt: "Did I pass? Good. Something lighter, then. Rolling in mud: yes or no?",
		options: [
			{
				text: "Yes! My ex hated mud. That should have been a clue.",
				effects: { playfulness: 2, kindness: 1 },
				reply: "Finally, a mud horse. And yes, huge clue.",
				variants: {
					playful: "Finally! Last one in the puddle is a donkey 😄"
				}
			},
			{
				text: "No. It's disgusting, and it's a great place to hide a transmitter.",
				effects: { kindness: -2, playfulness: -1 },
				reply: "Disgusting?! That's my skincare routine you're talking about.",
				variants: {
					ruthless: "It's mud, not a conspiracy. Not everything is about your ex.",
					serious: "Not a single fun bone in your body, is there?"
				}
			},
			{
				text: "I've never dared. My ex said horses don't do that. Would you show me?",
				effects: { confidence: -2, kindness: 1 },
				reply: "Horses absolutely do that. Step one: find mud. Step two: commit.",
				variants: {
					vulnerable: "They lied about that too. We'll go slow, there's a technique to it."
				}
			}
		]
	},
	{
		prompt: "Can I ask how you're doing now? Since the donkey, I mean.",
		options: [
			{
				text: "Not great. I still check the hay for radios every night.",
				effects: { confidence: -2, kindness: 1 },
				reply: "Every night? That sounds exhausting. You deserve a quiet stall.",
				variants: {
					vulnerable: "Oh, you poor thing. For the record, my hay is just hay."
				}
			},
			{
				text: "Fine. I kicked them out and kept the stable. They got the hat.",
				effects: { confidence: 2, kindness: -2 },
				reply: "...I can't tell if that's impressive or scary.",
				variants: {
					confident: "You kept the stable? Okay, that's a power move.",
					ruthless: "Remind me never to get on your bad side."
				}
			},
			{
				text: "Great, actually. I got the stall to myself and a very good story for parties.",
				effects: { playfulness: 2 },
				reply: "It IS a good story. I'd lead with it, honestly.",
				variants: {
					playful: "Best opener on Hinder 😂 Put it in your bio."
				}
			}
		]
	},
	{
		prompt: "Getting real for a second. What are you actually looking for on here?",
		options: [
			{
				text: "Something honest. No hats, no radios, no secrets.",
				effects: { playfulness: -2, confidence: 1 },
				reply: "No secrets. I can do that.",
				variants: {
					serious: "No secrets. Understood. I'll have my papers ready."
				}
			},
			{
				text: "Someone to laugh with. I haven't laughed since the hat came off.",
				effects: { playfulness: 2, kindness: 1 },
				reply: "Then let me work on that. I know a lot of bad hay jokes.",
				variants: {
					kind: "That's a lovely answer. Let's get you laughing again."
				}
			},
			{
				text: "Honestly, I just don't want to be alone anymore. The stall has been very quiet since they left.",
				effects: { confidence: -2, playfulness: -1 },
				reply: "Hey. Me neither. Quiet stalls are the worst.",
				variants: {
					vulnerable: "Me neither. I think that's why I swiped right on you."
				}
			}
		]
	},
	{
		prompt: "Is there anything else you need from me before you can trust me?",
		options: [
			{
				text: "No. You've been patient with me. I believe you're a horse.",
				effects: { kindness: 2 },
				reply: "That's all I wanted to hear. And I am. Promise.",
				variants: {
					kind: "Thank you. I know that wasn't easy to say after everything."
				}
			},
			{
				text: "It doesn't matter what you say. A donkey spy would deny it too, so I can never really know.",
				effects: { kindness: -2, confidence: 1 },
				reply: "That's not a question, that's a trap. What am I supposed to say?",
				variants: {
					ruthless: "Then nothing I say will ever be enough for you, will it?"
				}
			},
			{
				text: "Just one. If you WERE a donkey spy, would you tell me?",
				effects: { playfulness: 2 },
				reply: "I can't keep a secret. I'd blow my cover in a day.",
				variants: {
					playful: "I'd be the worst spy ever. I can't even keep a surprise party quiet 😄"
				}
			}
		]
	},
	{
		prompt: "So do I get a first date? Where are we going?",
		options: [
			{
				text: "The paddock at sunset. Wide open, nowhere to hide a radio.",
				effects: { kindness: 2 },
				reply: "It's a date! Saturday, the paddock, sunset. I'll bring apples and nothing else. 💕",
				variants: {
					kind: "Perfect. Saturday, the paddock, sunset. I'll bring my good side 💕",
					vulnerable: "The paddock at sunset. I'll be at the gate early so you don't have to be nervous 💕",
					ruthless: "Fine. The paddock, Saturday. Search me at the gate if you have to."
				}
			},
			{
				text: "A canter through the woods. Just the two of us, no eavesdroppers.",
				effects: { confidence: 1, playfulness: -1 },
				reply: "A canter in the woods? Say less. Saturday. I'll save you the shady side of the path.",
				variants: {
					confident: "Bold. I like it. Saturday, and I know a trail nobody else uses 😘",
					serious: "Quiet woods, no distractions. Saturday. I'll come alone, I promise.",
					ruthless: "Fine, the woods. Saturday. You can check the bushes for donkeys first."
				}
			},
			{
				text: "The racetrack. Donkeys can't keep up, so I'll know for sure.",
				effects: { confidence: 2, playfulness: 2 },
				reply: "Oh, you're ON. Saturday, the track. Stretch first, you'll need it 😏",
				variants: {
					playful: "Race you there! Saturday, the track. Loser buys the oats 😘",
					ruthless: "Fine, the track. Saturday. I'll outrun every doubt you have."
				}
			}
		]
	}
];
