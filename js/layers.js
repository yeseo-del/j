function hasSOUpg(id){
        return hasUpgrade("SO", id)
}

addLayer("SO", {
    name: "Sol", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SO", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    color: "#FFFF00",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "Solar Points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() { return player.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        hasSOUpg(12) ? mult = mult.times(2) : mult = mult
        hasSOUpg(14) ? mult = mult.times(upgradeEffect("SO", 14)) : mult = mult;
        hasSOUpg(15) ? mult = mult.times(upgradeEffect("SO", 15)) : mult = mult;
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        { key: "p", description: "Reset for Solar Points", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    layerShown() { return true },
    upgrades: {
        rows: 1,
        cols: 5,
        11: {
            description: "Double Point gain.",
            cost: new Decimal(1),
        },
        12: {
            description: "Double Solar Point gain.",
            cost: new Decimal(2),
        },
        13: {
            description: "Multiply Point gain based on Solar Points.",
            cost: new Decimal(4),
            effect() {
                return player.SO.points.sqrt().plus(1);
            },
            effectDisplay() {
                return `${format(player.SO.points.sqrt().plus(1))}x`;
            }
        },
        14: {
            description: "Multiply Solar Point gain based on Points",
            cost: new Decimal(8),
            effect() {
                fourteen = ((player.points.sqrt()).sqrt()).sqrt()
                return fourteen.sqrt()
            },
            effectDisplay() {
                return `${format(fourteen)}x`
            }
        },
        15: {
            title: "Solar Blessing α",
            description: "Multiply Point and Solar Point gain by the amount of Solar Blessings you have.",
            cost: new Decimal(16),
            onPurchase() {
                player.SolarBlessings++;
            },
            effect() {
                return player.SolarBlessings * 5;
            },
            effectDisplay() {
                return `${format(upgradeEffect("SO", 15))}x`
            }
        }
    }
});

addLayer("ME", {
    name: "Mercury", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "ME", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
        }
    },
    color: "#36393f",
    requires: new Decimal(1000), // Can be a function that takes requirement increases into account
    resource: "Mercuric Points", // Name of prestige currency
    baseResource: "Solar Points", // Name of resource prestige is based on
    baseAmount() { return player.SO.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        { key: "m", description: "Reset for Mercuric Points", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    layerShown() { return true },
});

