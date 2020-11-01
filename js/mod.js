let modInfo = {
	name: "The Solar System Tree",
	id: "earth/solar-system-tree",
	author: "earth",
	pointsName: "points",
	discordName: "",
	discordLink: "",
	changelogLink: "https://github.com/Acamaeda/The-Modding-Tree/blob/master/changelog.md",
  offlineLimit: 24,  // In hours
	initialStartPoints: new Decimal(0), // Used for hard resets and new players
	miscellaneousGarbage: {
		SolarBlessings: 0,
	}
}

// Set your version in num and name
let VERSION = {
	num: "0.1",
	name: "appendix gaming",
}

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if (!canGenPoints()) return new Decimal(0);
	let gain = new Decimal(1)

	hasSOUpg(23) ? gain = gain.times(upgradeEffect("SO", 23)) : gain = gain;

	// Base gain
	if (!hasUpgrade("ME", 12)) {
	let b = new Decimal(player.points.sqrt());
	let c = new Decimal(1).sub(b);
	gain = c;
	if (gain.lte(0.1)) gain = new Decimal(0.1);
	} else {
	gain = new Decimal(1);
	}


	// With other garbage
	hasSOUpg(11) ? gain = gain.times(upgradeEffect("SO", 11)) : gain = gain;
	hasSOUpg(13) ? gain = gain.times(upgradeEffect("SO", 13)) : gain = gain;
	hasSOUpg(15) ? gain = gain.times(upgradeEffect("SO", 15)) : gain = gain;
	hasSOUpg(22) ? gain = gain.times(upgradeEffect("SO", 22)) : gain = gain;

	return gain;
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() {
	return {
		SolarBlessings: new Decimal(0),
		DumpedMercuricPoints: new Decimal(0),
		AddedBlessings: new Decimal(0),
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
//	if (player.SolarBlessings === 1) return true;
	return false;

}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600000) // Default is 1 hour which is just arbitrarily large
}