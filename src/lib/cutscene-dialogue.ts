export type Speaker = "horse" | "donkey";

export type CutsceneLine = {
	speaker: Speaker;
	text: string;
	duration?: number;
};

export const introLines: CutsceneLine[] = [
	{ speaker: "horse", text: "Hey honey, good morning! How are you?" },
	{ speaker: "donkey", text: "...Hey. We need to talk." },
	{ speaker: "horse", text: "What? Is something wrong?" },
	{ speaker: "donkey", text: "I've been keeping something from you. For a very long time." },
	{ speaker: "horse", text: "Honey, you're scaring me. What's going on?" },
	{ speaker: "donkey", text: "This is really hard for me to say, but... I'm not actually a horse." },
	{ speaker: "horse", text: "...What?" },
	{ speaker: "donkey", text: "I'm a donkey." },
	{ speaker: "horse", text: "WHAT?!" },
	{ speaker: "donkey", text: "I was sent here by the Donkey Army. My mission was to infiltrate horse society." },
	{ speaker: "horse", text: "The... Donkey Army?" },
	{ speaker: "donkey", text: "Yes." },
	{ speaker: "horse", text: "WE'VE BEEN MARRIED FOR SIX YEARS! WAS ALL OF IT A LIE?!" },
	{ speaker: "donkey", text: "Not all of it." },
	{ speaker: "horse", text: "WHAT DOES THAT MEAN?!" },
	{ speaker: "donkey", text: "I did love you. But the mission always came first." },
	{ speaker: "horse", text: "YOU MEAN THIS WAS A MILITARY OPERATION?!" },
	{ speaker: "donkey", text: "I cannot discuss ongoing investigations." },
	{ speaker: "horse", text: "..." },
	{ speaker: "donkey", text: "I'm sorry." },
	{ speaker: "horse", text: "Get out." },
	{ speaker: "donkey", text: "Goodbye, Horse 1." },
	{ speaker: "horse", text: "The donkey leaves." },
	{ speaker: "horse", text: "Silence." },
	{ speaker: "horse", text: "Horse 1 slowly looks down at their phone." },
	{ speaker: "horse", text: "You have 5 new notifications from Hinder." },
	{ speaker: "horse", text: "...Already?" },
];
