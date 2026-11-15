export type Speaker = "horse" | "donkey";

export type CutsceneLine = {
	speaker: Speaker;
	text: string;
	duration?: number;
};

export type NarrationLine = {
	text: string;
	duration?: number;
};

export const introLines: CutsceneLine[] = [
	{ speaker: "horse", text: "Hey honey, good morning! How are you?" },
	{ speaker: "donkey", text: "...Hey. We need to talk." },
	{ speaker: "horse", text: "What? Is something wrong?" },
	{ speaker: "donkey", text: "I kinda have been keeping something from you." },
	{ speaker: "horse", text: "What do you mean?" },
	{ speaker: "donkey", text: "This is really hard for me to say, but... I'm not actually a horse." },
	{ speaker: "horse", text: "...What?" },
	{ speaker: "donkey", text: "I'm a spy donkey." },
	{ speaker: "horse", text: "WHAT?!" },
	{ speaker: "donkey", text: "I was sent here by the Donkey Army." },
	{ speaker: "horse", text: "The... Donkey Army?" },
	{ speaker: "donkey", text: "Yes." },
	{ speaker: "horse", text: "WE'VE BEEN MARRIED FOR SIX YEARS! WAS ALL OF IT A LIE?!" },
	{ speaker: "horse", text: "YOU MEAN THIS WAS A MILITARY OPERATION?!" },
	{ speaker: "donkey", text: "I cannot discuss ongoing investigations." },
	{ speaker: "horse", text: "..." },
	{ speaker: "donkey", text: "I'm sorry." },
	{ speaker: "horse", text: "Get out." },
	{ speaker: "donkey", text: "Goodbye." },
	{ speaker: "donkey", text: "*The donkey leaves.*" },
	{ speaker: "horse", text: "*Silence.*" },
	{ speaker: "horse", text: "*slowly looks down at their phone*" },
	{ speaker: "horse", text: "*You have 5 new notifications from Hinder*" },
	{ speaker: "horse", text: "...Already?" },
];

export const dateLines: NarrationLine[] = [
  { text: "They had a lovely evening" },
  { text: "and lived happily ever after." },
  { text: "You bounced back." },
];

/** Final title card shown centered after the scene fades out. */
export const dateEnd: NarrationLine = { text: "The End." };
