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
        rows: 3,
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
                ugh = player.SO.points.plus(1)
                return ugh.sqrt().log10().plus(1)
            },
            effectDisplay() {
                return `${format(upgradeEffect("SO", 13))}x`;
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
        },
        21: {
            description: "Gain a multiplier to Mercuric Points based on your Solar Points.",
            cost: new Decimal(2048),
            unlocked() {
                return hasUpgrade("ME", 11) && hasUpgrade("SO", 25)
            },
            effect() {
                return player.SO.points.log10().plus(1);
            },
            effectDisplay() {
                return `${format(upgradeEffect("SO", 21))}x`
            }
        },
        22: {
            description: "mercuric content",
            cost: new Decimal(69420),
            unlocked() {
                return hasUpgrade("ME", 11)
            }
        },
        23: {
            description: "mercuric content",
            cost: new Decimal(69420),
            unlocked() {
                return hasUpgrade("ME", 11)
            }
        },
        24: {
            description: "mercuric content",
            cost: new Decimal(69420),
            unlocked() {
                return hasUpgrade("ME", 11)
            }
        },
        25: {
            title: "Solar Blessing β",
            description: "mercuric content",
            cost: new Decimal(69420),
            unlocked() {
                return hasUpgrade("ME", 11)
            },
            onPurchase() {
                player.SolarBlessings++;
            },
        },
        31: {
            description: "mercuric content 2",
            cost: new Decimal(69420),
            unlocked() {
                return player.ME.unlocked;
            }
        },
        32: {
            description: "mercuric content 2",
            cost: new Decimal(69420),
            unlocked() {
                return player.ME.unlocked && hasUpgrade("SO", 21);
            }
        },
        33: {
            description: "mercuric content 2",
            cost: new Decimal(69420),
            unlocked() {
                return player.ME.unlocked && hasUpgrade("SO", 22);
            }
        },
        34: {
            description: "mercuric content 2",
            cost: new Decimal(69420),
            unlocked() {
                return player.ME.unlocked && hasUpgrade("SO", 23);
            }
        },
        35: {
            title: "Solar Blessing γ",
            description: "mercuric content 2",
            cost: new Decimal(69420),
            unlocked() {
                return player.ME.unlocked && hasUpgrade("SO", 24);
            },
            onPurchase() {
                player.SolarBlessings++;
            },
        }
    },
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
        hasMilestone("ME", 1) ? mult = mult.times(player.DumpedMercuricPoints.log10().plus(1)) : mult = mult;
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
    bars: {
        mercuricBar: {
            display() {
                return `${player.DumpedMercuricPoints}/1000`;
            },
            direction: UP,
            width: 90,
            height: 250,
            progress() {
                return player.DumpedMercuricPoints.div(1000);
            }
        }
    },
    milestones: {
        1: {
            requirementDescription: `Requires 5 Dumped Mercuric Points`,
            effectDescription: `Gain a multiplier to Mercuric Points based on Dumped Mercuric Points. (log10(dumped))`,
            done() {
                return player.DumpedMercuricPoints.gte(5);
            }
        },
        2: {
            requirementDescription: `Requires 50 Dumped Mercuric Points`,
            effectDescription: `Unlock a new row of Solar Upgrades (γ)`,
            done() {
                return player.DumpedMercuricPoints.gte(50);
            }
        }
    },
    upgrades: {
        rows: 1,
        cols: 5,
        11: {
            description: "Unlock a new row of Solar Upgrades. (β)",
            cost: new Decimal(1),
        }
    },
    clickables: {
        rows: 1,
        cols: 1, 
        11: {
            display() {
                return !player.DumpedMercuricPoints.gte(1000) ? `Dump all of your Mercuric Points (${player.ME.points}) into the container.` : `You have filled the container!`
            },
            canClick() {
                if (player.ME.points.gte(1)) return true;
                return false;
            },
            onClick() {
                if (player.DumpedMercuricPoints.gte(1000)) return;

                player.DumpedMercuricPoints = player.DumpedMercuricPoints.plus(player.ME.points)
                player.ME.points = new Decimal(0)
            }
        }
    },
    tabFormat: {
        "Mercuric Dump": {
            content: ["main-display",
            "prestige-button",
            "blank",
            "milestones",
            "blank",
            "clickables",
            "blank",
            ["bar", "mercuricBar"],
            "blank",
            ]
        },
        "Upgrades": {
            content: ["main-display",
            "upgrades"    
            ]
        }
    },
    doReset() {
        player.SolarBlessings = 0;
    }
});

