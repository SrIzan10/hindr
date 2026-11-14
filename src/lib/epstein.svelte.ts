export type Person = {
	id: string;
	name: string;
	description: string | null;
	short_description: string | null;
	email_count: number;
	email_sources: string[];
};

export const people: Person[] = [
	{
		id: "jeffrey-epstein",
		name: "Jeffrey Epstein",
		description:
			"Alias accounts used by Jeffrey Epstein, primarily the jeevacation@gmail.com Gmail account",
		short_description: "Epstein alias accounts (jeevacation@gmail.com)",
		email_count: 1069343,
		email_sources: ["yahoo"]
	},
	{
		id: "lesley-groff",
		name: "Lesley Groff",
		description: "Personal assistant and office manager at Epstein's New York office",
		short_description: "Personal assistant, NY office",
		email_count: 230115,
		email_sources: []
	},
	{
		id: "rich-kahn",
		name: "Rich Kahn",
		description: "Staff at Epstein's New York office",
		short_description: "NY office staff",
		email_count: 92049,
		email_sources: ["yahoo"]
	},
	{
		id: "karyna-shuliak",
		name: "Karyna Shuliak",
		description:
			"Belarusian model and dentist, Epstein's girlfriend until his death in 2019",
		short_description: "Epstein's girlfriend until death",
		email_count: 48933,
		email_sources: ["gmail", "yahoo"]
	},
	{
		id: "larry-visosky",
		name: "Larry Visoski",
		description: "Epstein's chief pilot who flew his private jets for nearly three decades",
		short_description: "Epstein's chief pilot",
		email_count: 38726,
		email_sources: []
	},
	{
		id: "bella-klein-yale",
		name: "Bella Klein",
		description: "Administrative assistant at Darren Indyke's law office",
		short_description: "Admin, Indyke's office",
		email_count: 28113,
		email_sources: []
	},
	{
		id: "ann-rodriguez",
		name: "Ann Rodriguez",
		description: "Household manager at Epstein's Palm Beach estate",
		short_description: "Household manager, Palm Beach",
		email_count: 28068,
		email_sources: []
	},
	{
		id: "boris-nikolic",
		name: "Boris Nikolic",
		description:
			"Scientific advisor to Bill Gates, named successor executor in Epstein's will 2 days before his death",
		short_description: "Gates advisor, will executor",
		email_count: 21736,
		email_sources: ["gmail", "yahoo"]
	},
	{
		id: "natalia-molotkova--3",
		name: "Natalia Molotkova",
		description: "Travel agent at Centurion Travel who arranged Epstein's trips",
		short_description: "Travel agent, Centurion",
		email_count: 20559,
		email_sources: []
	},
	{
		id: "stewart-oldfield-",
		name: "Stewart Oldfield",
		description: "Deutsche Bank private banker who managed Epstein's accounts",
		short_description: "Deutsche Bank banker",
		email_count: 17320,
		email_sources: []
	},
	{
		id: "paul-morris-gmail",
		name: "Paul Morris",
		description: "Deutsche Bank private banker",
		short_description: "Deutsche Bank banker",
		email_count: 15246,
		email_sources: []
	},
	{
		id: "darren-indyke",
		name: "Darren Indyke",
		description: "Attorney and co-executor of Epstein's estate",
		short_description: "Attorney, estate executor",
		email_count: 14742,
		email_sources: ["gmail", "yahoo"]
	},
	{
		id: "daphne-wallace-gmail",
		name: "Daphne Wallace",
		description: "Personal assistant at Epstein's office",
		short_description: "Personal assistant",
		email_count: 14718,
		email_sources: []
	},
	{
		id: "brice-gordon",
		name: "Brice Gordon",
		description: "New Zealand-born property manager at Epstein's Zorro Ranch in New Mexico",
		short_description: "Property manager, Zorro Ranch",
		email_count: 14644,
		email_sources: []
	},
	{
		id: "ghislaine-maxwell",
		name: "Ghislaine Maxwell",
		description: "British socialite and Epstein's primary accomplice",
		short_description: "Epstein's primary accomplice",
		email_count: 13428,
		email_sources: ["gmail", "yahoo"]
	},
	{
		id: "jojo-fontanilla",
		name: "Jojo Fontanilla",
		description: "Household staff at Epstein's properties",
		short_description: "Household staff",
		email_count: 13294,
		email_sources: []
	},
	{
		id: "melanie-spinella-",
		name: "Melanie Spinella",
		description: "Administrative staff at Apollo Management, Leon Black's firm",
		short_description: "Admin, Apollo Management",
		email_count: 12701,
		email_sources: []
	},
	{
		id: "merwin-dela-cruz-example",
		name: "Merwin dela cruz",
		description: "Household staff at Epstein's properties",
		short_description: "Household staff",
		email_count: 11790,
		email_sources: []
	},
	{
		id: "google-calendar-recovered",
		name: "Google Calendar",
		description: "Automated Google Calendar notification emails",
		short_description: "Calendar notification service",
		email_count: 11230,
		email_sources: []
	},
	{
		id: "joi-ito",
		name: "Joi Ito",
		description: "Former MIT Media Lab director who resigned over Epstein funding ties",
		short_description: "Former MIT Media Lab director",
		email_count: 10338,
		email_sources: []
	},
	{
		id: "cecile-de-jongh--2",
		name: "Cecile de Jongh",
		description: "Wife of former USVI governor, managed Epstein's Virgin Islands companies",
		short_description: "USVI fixer, former first lady",
		email_count: 9992,
		email_sources: []
	},
	{
		id: "vahe-stepanian-db-2",
		name: "Vahe Stepanian",
		description: "Deutsche Bank private banker",
		short_description: "Deutsche Bank banker",
		email_count: 9796,
		email_sources: []
	},
	{
		id: "david-mitchell",
		name: "David Mitchell",
		description: "Business associate at Mitchell Holdings",
		short_description: "Mitchell Holdings",
		email_count: 9407,
		email_sources: []
	},
	{
		id: "farkas-andrew-l-",
		name: "Farkas, Andrew L.",
		description:
			"Real estate investor, founder of Island Capital Group, co-owned USVI marina with Epstein",
		short_description: "Real estate investor, Island Capital",
		email_count: 8942,
		email_sources: []
	},
	{
		id: "sarah-kellen",
		name: "Sarah Kellen",
		description:
			"Key Epstein assistant who managed his calendar, travel, and contacts. Named as co-conspirator in federal non-prosecution agreement. Later married NASCAR driver Brian Vickers.",
		short_description: "Epstein's personal scheduler",
		email_count: 8741,
		email_sources: ["gmail", "yahoo"]
	},
	{
		id: "gary-kerney-verizon",
		name: "Gary Kerney",
		description: "IT and telecommunications consultant managing Epstein's technology infrastructure.",
		short_description: "IT consultant",
		email_count: 8717,
		email_sources: []
	},
	{
		id: "peggy-siegal",
		name: "Peggy Siegal",
		description: "New York entertainment publicist and Hollywood events organizer",
		short_description: "Entertainment publicist",
		email_count: 8636,
		email_sources: []
	},
	{
		id: "david-stern-",
		name: "David Stern",
		description: "Business associate at Asia Gateway",
		short_description: "Asia Gateway",
		email_count: 8145,
		email_sources: []
	},
	{
		id: "nicole-junkermann",
		name: "Nicole Junkermann",
		description: "German-born investor and health-tech venture capitalist, founder of NJF Holdings",
		short_description: "Investor, NJF Holdings",
		email_count: 7984,
		email_sources: []
	},
	{
		id: "lawrence-krauss",
		name: "Lawrence Krauss",
		description: "Theoretical physicist and cosmologist",
		short_description: "Physicist, cosmologist",
		email_count: 7966,
		email_sources: ["gmail"]
	},
	{
		id: "eric-roth-intljet",
		name: "Eric Roth",
		description: "Pilot and operations manager at International Jet",
		short_description: "Pilot, International Jet",
		email_count: 7718,
		email_sources: []
	},
	{
		id: "martin-a-nowak",
		name: "Martin A. Nowak",
		description:
			"Harvard professor of biology and mathematics. Directed the Program for Evolutionary Dynamics which received major Epstein funding ($6.5M+).",
		short_description: "Harvard biology professor, PED director",
		email_count: 7378,
		email_sources: []
	},
	{
		id: "richard-joslin",
		name: "Richard Joslin",
		description: "Staff at Elysium LLC, Epstein's financial management entity",
		short_description: "Elysium LLC staff",
		email_count: 7169,
		email_sources: []
	},
	{
		id: "kathy-ruemmler-egroupware",
		name: "Kathy Ruemmler",
		description: "Former White House Counsel under Obama who advised Epstein on legal and media strategy",
		short_description: "Former White House Counsel",
		email_count: 7092,
		email_sources: []
	},
	{
		id: "eva-dubin-dubinandco",
		name: "Eva Dubin",
		description:
			"Physician, former Miss Sweden, and Epstein's ex-girlfriend, wife of hedge fund manager Glenn Dubin",
		short_description: "Physician, Epstein's ex, wife of Glenn Dubin",
		email_count: 7050,
		email_sources: []
	},
	{
		id: "noam-chomsky",
		name: "Noam Chomsky",
		description:
			"Legendary MIT linguist and political commentator. Corresponded with Epstein about academic topics and visited him multiple times, including after his 2008 conviction.",
		short_description: "Linguist, MIT professor emeritus",
		email_count: 7013,
		email_sources: ["gmail"]
	},
	{
		id: "faith-kates-extmodels",
		name: "Faith Kates",
		description: "Modeling agent and co-founder of Next Model Management",
		short_description: "Modeling agent, Next Models",
		email_count: 6945,
		email_sources: []
	},
	{
		id: "a-de-rothschild",
		name: "A. de Rothschild",
		description: "Member of the Rothschild banking family",
		short_description: "Rothschild banking family",
		email_count: 6740,
		email_sources: []
	},
	{
		id: "eileen-alexanderson-apollo-adv=sors",
		name: "Eileen Alexanderson",
		description: "Administrative staff at Apollo Management and Elysium LLC",
		short_description: "Admin, Apollo/Elysium",
		email_count: 6446,
		email_sources: []
	},
	{
		id: "amanda-kirby",
		name: "Amanda Kirby",
		description: "Regular correspondent in Epstein's personal network.",
		short_description: "Personal contact",
		email_count: 6349,
		email_sources: []
	},
	{
		id: "brad-wechsler-wechsler",
		name: "Brad Wechsler",
		description: "Former chairman of IMAX Corporation and managing partner of Elysium LLC",
		short_description: "Former IMAX chairman, Elysium",
		email_count: 6300,
		email_sources: []
	},
	{
		id: "deepak-chopra",
		name: "Deepak Chopra",
		description: "Author and alternative medicine advocate",
		short_description: "Author, alt medicine",
		email_count: 6273,
		email_sources: ["gmail"]
	},
	{
		id: "petermandelson",
		name: "Peter Mandelson",
		description: "British politician, former EU Trade Commissioner and Labour cabinet minister",
		short_description: "British politician, former EU Commissioner",
		email_count: 6270,
		email_sources: []
	},
	{
		id: "sultan-bin-sulayem",
		name: "Sultan Bin Sulayem",
		description: "Dubai businessman and chairman of DP World",
		short_description: "Dubai businessman, DP World",
		email_count: 6194,
		email_sources: ["yahoo"]
	},
	{
		id: "stephen-hanson--3",
		name: "Steve Hanson",
		description:
			"New York City restaurateur and founder of BR Guest Hospitality, one of the city's largest restaurant groups. Operated STK, Dos Caminos, and other popular venues.",
		short_description: "NYC restaurateur, BR Guest Hospitality",
		email_count: 6115,
		email_sources: []
	},
	{
		id: "jean-luc-brunel",
		name: "Jean-Luc Brunel",
		description: "French model scout, close accomplice of Epstein",
		short_description: "French model scout",
		email_count: 6062,
		email_sources: ["gmail", "yahoo"]
	},
	{
		id: "jes-staley-jpmorgan",
		name: "Jes Staley",
		description:
			"Former CEO of JPMorgan's private bank and later CEO of Barclays, banned over Epstein ties",
		short_description: "Former JPMorgan/Barclays CEO",
		email_count: 6021,
		email_sources: []
	},
	{
		id: "tazia-smith",
		name: "Tazia Smith",
		description: "Staff member at Deutsche Bank involved in servicing Epstein's accounts.",
		short_description: "Deutsche Bank staff",
		email_count: 6019,
		email_sources: []
	},
	{
		id: "paul-barrett-example",
		name: "Paul Barrett",
		description: "JP Morgan banker on Epstein's accounts",
		short_description: "JP Morgan banker",
		email_count: 5990,
		email_sources: []
	},
	{
		id: "michael-wolff",
		name: "Michael Wolff",
		description: 'Author and journalist who wrote "Fire and Fury"',
		short_description: 'Author, "Fire and Fury"',
		email_count: 5856,
		email_sources: ["gmail"]
	},
	{
		id: "jermaine-ruan-ruan-2",
		name: "Jermaine Ruan",
		description: "Staff member in Epstein's household or office operations.",
		short_description: "Staff member",
		email_count: 5344,
		email_sources: []
	},
	{
		id: "ehud-barak",
		name: "Ehud Barak",
		description:
			"Former Israeli Prime Minister and defense minister. Had extensive business relationship with Epstein, received millions in consulting fees through shell companies.",
		short_description: "Former Israeli Prime Minister",
		email_count: 5182,
		email_sources: ["gmail", "yahoo", "doj"]
	},
	{
		id: "richard-barnett-",
		name: "Richard Barnett",
		description: "HVAC contractor who serviced Epstein's properties.",
		short_description: "HVAC contractor",
		email_count: 4990,
		email_sources: []
	},
	{
		id: "bradley-gillin",
		name: "Bradley Gillin",
		description: "Deutsche Bank staff involved with Epstein's private banking relationship.",
		short_description: "Deutsche Bank staff",
		email_count: 4907,
		email_sources: []
	},
	{
		id: "daniel-sabba-example-2",
		name: "Daniel Sabba",
		description:
			"Deutsche Bank private banking relationship manager associated with Epstein's accounts.",
		short_description: "Deutsche Bank banker",
		email_count: 4869,
		email_sources: []
	},
	{
		id: "emad-hanna",
		name: "Emad Hanna",
		description: "Staff member at Epstein's New York office operations.",
		short_description: "NY office staff",
		email_count: 4861,
		email_sources: ["yahoo"]
	},
	{
		id: "janusz-banasiak-pyscmail",
		name: "Janusz Banasiak",
		description:
			"Estate manager responsible for property maintenance and operations at Epstein's residences.",
		short_description: "Estate manager",
		email_count: 4691,
		email_sources: []
	},
	{
		id: "story-cowles-yahoo",
		name: "Story Cowles",
		description:
			"Personal assistant in Epstein's organization who handled scheduling and logistics.",
		short_description: "Personal assistant",
		email_count: 4629,
		email_sources: []
	},
	{
		id: "lsj-gsj",
		name: "Little St. James / Great St. James",
		description:
			"Little St. James and Great St. James — Epstein's private islands in the US Virgin Islands. Hub of his operations in the Caribbean.",
		short_description: "USVI private islands",
		email_count: 4587,
		email_sources: []
	},
	{
		id: "valeria-chomsky-gmail-3",
		name: "Valeria Chomsky",
		description: "Wife of linguist Noam Chomsky",
		short_description: "Wife of Noam Chomsky",
		email_count: 4572,
		email_sources: []
	},
	{
		id: "ion-nicola",
		name: "Ion Nicola",
		description: "Property manager overseeing operations at Epstein's Palm Beach residence.",
		short_description: "Palm Beach property manager",
		email_count: 4462,
		email_sources: []
	},
	{
		id: "jabor-y-mail",
		name: "Jabor Y",
		description: "Qatar-based business contact",
		short_description: "Qatar business contact",
		email_count: 4431,
		email_sources: []
	},
	{
		id: "bebe-avdiu",
		name: "Bebe Avdiu",
		description: "Assistant to Darren Indyke, Epstein's attorney and estate executor.",
		short_description: "Indyke's assistant",
		email_count: 4420,
		email_sources: []
	},
	{
		id: "alireza-ittihadieh",
		name: "Alireza Ittihadieh",
		description:
			"Private aviation broker at Freestream Aircraft who arranged jet charters and aircraft services for Epstein.",
		short_description: "Private jet broker, Freestream",
		email_count: 4406,
		email_sources: []
	},
	{
		id: "caroline-lang",
		name: "Caroline Lang",
		description:
			"French correspondent, likely associated with Epstein's Paris social circle.",
		short_description: "French personal contact",
		email_count: 4361,
		email_sources: []
	},
	{
		id: "soon-yi-previn-hotmail",
		name: "Soon Yi Previn",
		description:
			"Wife of Woody Allen (married 1997). Adopted daughter of Mia Farrow. Corresponded with Epstein's network alongside Allen.",
		short_description: "Wife of Woody Allen",
		email_count: 4289,
		email_sources: []
	},
	{
		id: "barnaby-marsh",
		name: "Barnaby Marsh",
		description:
			"Philanthropy advisor and risk researcher at the John Templeton Foundation and Oxford. Managed some of Epstein's charitable giving and connected him to academics.",
		short_description: "Philanthropy advisor",
		email_count: 4183,
		email_sources: []
	},
	{
		id: "kosslyn-stephen",
		name: "Kosslyn Stephen",
		description:
			"Cognitive psychologist known for research on mental imagery. Former Harvard psychology chair. Founding dean of Minerva Schools, which received Epstein funding.",
		short_description: "Cognitive psychologist, Minerva Schools dean",
		email_count: 3955,
		email_sources: []
	},
	{
		id: "jennie-saunders-gmail",
		name: "Jennie Saunders",
		description: "Regular correspondent in Epstein's personal network.",
		short_description: "Personal contact",
		email_count: 3954,
		email_sources: []
	},
	{
		id: "am-rican-express-travel",
		name: "American Express Travel",
		description: "American Express Travel booking service used by Epstein",
		short_description: "Travel booking service",
		email_count: 3925,
		email_sources: []
	},
	{
		id: "erika-kellerhals-example",
		name: "Erika Kellerhals",
		description: "Swiss business contact in Epstein's European financial network.",
		short_description: "Swiss business contact",
		email_count: 3882,
		email_sources: []
	},
	{
		id: "ian-osborne",
		name: "Ian Osborne",
		description:
			"British political consultant and tech investor. Former special advisor in UK government. Connected to Epstein through London social circles.",
		short_description: "Political consultant, tech investor",
		email_count: 3854,
		email_sources: []
	},
	{
		id: "elen-capri-example",
		name: "Elen Capri",
		description: "Regular correspondent in Epstein's personal network.",
		short_description: "Personal contact",
		email_count: 3805,
		email_sources: []
	},
	{
		id: "assistant-to-jeffrey-epstein-recovered",
		name: "Assistant to Jeffrey Epstein",
		description:
			'Emails labeled as from "Assistant to Jeffrey Epstein" — likely Lesley Groff, Sarah Kellen, or other rotating staff',
		short_description: "Generic assistant label",
		email_count: 3684,
		email_sources: []
	},
	{
		id: "olivier-colom",
		name: "Olivier Colom",
		description:
			"Associated with Edmond de Rothschild bank. Part of Epstein's European private banking network.",
		short_description: "Edmond de Rothschild associate",
		email_count: 3613,
		email_sources: []
	},
	{
		id: "hiebert-peter-n",
		name: "Hiebert, Peter N.",
		description:
			"Attorney at Winston & Strawn LLP. Handled legal matters for Epstein and his affiliated entities.",
		short_description: "Attorney, Winston & Strawn",
		email_count: 3562,
		email_sources: []
	},
	{
		id: "cynthia-rodriguez-example",
		name: "Cynthia Rodriguez",
		description: "Frequent correspondent in Epstein's network.",
		short_description: "Staff or personal contact",
		email_count: 3426,
		email_sources: []
	},
	{
		id: "nicholas-ribis-resorts",
		name: "Nicholas Ribis",
		description:
			"Casino and hospitality executive at Resorts International. Part of Epstein's business network in gaming and real estate.",
		short_description: "Casino executive, Resorts International",
		email_count: 3375,
		email_sources: []
	},
	{
		id: "ariane-de-rothschild",
		name: "Ariane de Rothschild",
		description: "CEO of Edmond de Rothschild Group, Swiss private banking",
		short_description: "Edmond de Rothschild CEO",
		email_count: 3326,
		email_sources: []
	},
	{
		id: "joscha-bach",
		name: "Joscha Bach",
		description:
			"German-American AI researcher and cognitive scientist known for work on computational consciousness. Spoke at Epstein-funded events.",
		short_description: "AI researcher, cognitive scientist",
		email_count: 3298,
		email_sources: ["gmail", "doj"]
	},
	{
		id: "leon-botstein",
		name: "Leon Botstein",
		description:
			"President of Bard College since 1975, the longest-serving college president in the U.S. Also a noted orchestral conductor (American Symphony Orchestra).",
		short_description: "Bard College president, conductor",
		email_count: 3126,
		email_sources: []
	},
	{
		id: "ramsey-elkholy",
		name: "Ramsey Elkholy",
		description: "Regular business correspondent in Epstein's network.",
		short_description: "Business associate",
		email_count: 3118,
		email_sources: []
	},
	{
		id: "cashkim-bussue-c-r",
		name: "Cashkim Bussue",
		description: "Property maintenance staff at Epstein's US Virgin Islands properties.",
		short_description: "Property staff, USVI",
		email_count: 3078,
		email_sources: []
	},
	{
		id: "jeanne-brennan-gmail",
		name: "Jeanne Brennan",
		description: "Accountant handling financial matters for Epstein or his entities.",
		short_description: "Accountant",
		email_count: 3018,
		email_sources: []
	},
	{
		id: "lyn-fontanilla-recovered",
		name: "lyn fontanilla",
		description: null,
		short_description: null,
		email_count: 2960,
		email_sources: []
	},
	{
		id: "terje-rod-larsen-example",
		name: "Terje Rod-Larsen",
		description:
			"Norwegian diplomat who served as UN Special Envoy and president of the International Peace Institute (IPI). IPI received $650K from Epstein. Resigned in 2020 after revelations about personal loans from Epstein.",
		short_description: "Norwegian diplomat, IPI president",
		email_count: 2900,
		email_sources: []
	},
	{
		id: "ada-clapp",
		name: "Ada Clapp",
		description:
			"Administrative staff at Elysium LLC, one of Epstein's corporate entities used for financial and legal operations.",
		short_description: "Elysium LLC staff",
		email_count: 2831,
		email_sources: []
	},
	{
		id: "steve-bannon",
		name: "Steve Bannon",
		description:
			"Former White House Chief Strategist and Breitbart News chairman. Had communications with Epstein network, reportedly about media strategy.",
		short_description: "Former White House strategist",
		email_count: 2690,
		email_sources: ["gmail"]
	},
	{
		id: "mark-lloyd",
		name: "Mark Lloyd",
		description: "IT consultant who managed technology systems for Epstein's properties and offices.",
		short_description: "IT consultant",
		email_count: 2684,
		email_sources: []
	},
	{
		id: "yury-molodtsov-gmail",
		name: "Yury Molodtsov",
		description:
			"Technology consultant associated with Hewlett Packard Enterprise. Part of Epstein's technology and business network.",
		short_description: "Tech consultant",
		email_count: 2655,
		email_sources: []
	},
	{
		id: "al-seckel",
		name: "Al Seckel",
		description:
			"Perceptual psychologist and author known for work on optical illusions. Organized science salons for Epstein. Later died in mysterious circumstances in France, 2015.",
		short_description: "Perceptual psychologist, science promoter",
		email_count: 2629,
		email_sources: ["gmail"]
	},
	{
		id: "fran--3",
		name: "Fran",
		description: null,
		short_description: null,
		email_count: 2578,
		email_sources: []
	},
	{
		id: "nili-priell",
		name: "Nili Priell",
		description: "Wife of former Israeli PM Ehud Barak, stayed at Epstein's NYC apartment",
		short_description: "Wife of Ehud Barak",
		email_count: 2576,
		email_sources: []
	},
	{
		id: "larry-cohen-bgc3",
		name: "Larry Cohen",
		description:
			"Associated with BGC3, the private office of Bill Gates. Coordinated between Gates' interests and Epstein contacts.",
		short_description: "BGC3 / Gates Foundation associate",
		email_count: 2572,
		email_sources: []
	},
	{
		id: "ny-fbi-recovered",
		name: "(NY) (FBI)",
		description: "Emails tagged with (NY) (FBI) notation — likely from FBI investigation documents",
		short_description: "FBI New York field office",
		email_count: 2552,
		email_sources: []
	},
	{
		id: "daniel-siad-whatsupmanagement",
		name: "Daniel Siad",
		description:
			'Associated with "What\'s Up Management" — likely talent or property management company in Epstein\'s network.',
		short_description: "Management company contact",
		email_count: 2549,
		email_sources: []
	},
	{
		id: "martin-zeman",
		name: "Martin Zeman",
		description: "Regular correspondent in Epstein's business network.",
		short_description: "Business contact",
		email_count: 2524,
		email_sources: []
	},
	{
		id: "michael-glidden-homedepot",
		name: "Michael Glidden",
		description: "Staff member at Epstein's Caribbean properties (Little St. James / Great St. James).",
		short_description: "Caribbean staff",
		email_count: 2509,
		email_sources: []
	},
	{
		id: "scott-denett",
		name: "Scott Denett",
		description: "Regular correspondent in Epstein's operations.",
		short_description: "Staff or associate",
		email_count: 2493,
		email_sources: []
	},
	{
		id: "larry-summers",
		name: "Larry Summers",
		description:
			"Former U.S. Treasury Secretary and Harvard president. Flew on Epstein's plane and accepted donations for Harvard's Program for Evolutionary Dynamics.",
		short_description: "Former Treasury Secretary",
		email_count: 2377,
		email_sources: ["gmail"]
	}
];
