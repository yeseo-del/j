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
            effect() {
                if (!player.SO.buyables[12].gte(1)) return new Decimal(2);
                return new Decimal(2).times(buyableEffect("SO", 12));
            }
        },
        12: {
            description: "Double Solar Point gain.",
            cost: new Decimal(2),
            effect() {
                if (!player.SO.buyables[12].gte(1)) return new Decimal(2);
                return new Decimal(2).times(buyableEffect("SO", 12));
            }
        },
        13: {
            description: "Multiply Point gain based on Solar Points.",
            cost: new Decimal(4),
            effect() {
                if (!player.SO.buyables[12].gte(1)) {
                    ugh = player.SO.points.plus(1);
                    return ugh.sqrt().log10().plus(1);
                } else {
                    ugh = player.SO.points.plus(1);
                    return (ugh.sqrt().log10().plus(1)).times(buyableEffect("SO", 12));
                }
            },
            effectDisplay() {
                return `${format(upgradeEffect("SO", 13))}x`;
            }
        },
        14: {
            description: "Multiply Solar Point gain based on Points",
            cost: new Decimal(8),
            effect() {
                if (!player.SO.buyables[12].gte(1)) {
                    fourteen = ((player.points.sqrt()).sqrt()).sqrt()
                    return fourteen.sqrt()
                } else { 
                    fourteen = ((player.points.sqrt()).sqrt()).sqrt()
                    return (fourteen.sqrt()).times(buyableEffect("SO", 12));
                }
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
                player.SolarBlessings = player.SolarBlessings.add(1)
            },
            effect() {
                if (player.AddedBlessings.gte(1)) return (player.SolarBlessings.plus(player.AddedBlessings)).times(5);
                return (player.SolarBlessings).times(5);
            },
            effectDisplay() {
                return `${format(upgradeEffect("SO", 15))}x`
            }
        },
        21: {
            description: "Gain a multiplier to Mercuric Points based on your Solar Points.",
            cost: new Decimal(2048),
            unlocked() {
                return hasUpgrade("ME", 11) && hasUpgrade("SO", 15)
            },
            effect() {
                twentyone = player.SO.points.plus(1);
                return player.SO.points.max(1).log10().plus(1);
            },
            effectDisplay() {
                return `${format(upgradeEffect("SO", 21))}x`
            }
        },
        22: {
            description: "Gain a multiplier to Point gain based on your amount of Solar Upgrades.",
            cost: new Decimal(8192),
            unlocked() {
                return hasUpgrade("ME", 11) && hasUpgrade("SO", 21)
            },
            effect() {
                return new Decimal(Math.sqrt(player.SO.upgrades.length));
            },
            effectDisplay() {
                return `${format(upgradeEffect("SO", 22))}x`
            }
        },
        23: {
            description: "Multiply <b>base</b> Point gain based on amount of Solar Buyables bought.",
            cost: new Decimal(32768),
            unlocked() {
                return hasUpgrade("ME", 11) && hasUpgrade("SO", 22)
            },
            effect() {
                return new Decimal(player.SO.buyables[11].plus(player.SO.buyables[12]).sqrt())
            },
            effectDisplay() {
                return `${format(upgradeEffect("SO", 23))}x`
            }
        },
        24: {
            description: "mercuric content",
            cost: new Decimal(69420),
            unlocked() {
                return hasUpgrade("ME", 11) && hasUpgrade("SO", 23)
            }
        },
        25: {
            title: "Solar Blessing β",
            description: "mercuric content",
            cost: new Decimal(69420),
            unlocked() {
                return hasUpgrade("ME", 11) && hasUpgrade("SO", 24)
            },
            onPurchase() {
                player.SolarBlessings = player.SolarBlessings.add(1)
            },
        },
        31: {
            description: "mercuric content 2",
            cost: new Decimal(69420),
            unlocked() {
                return player.ME.unlocked && hasMilestone("ME", 2) && hasUpgrade("SO", 25);
            }
        },
        32: {
            description: "mercuric content 2",
            cost: new Decimal(69420),
            unlocked() {
                return player.ME.unlocked && hasUpgrade("SO", 31);
            }
        },
        33: {
            description: "mercuric content 2",
            cost: new Decimal(69420),
            unlocked() {
                return player.ME.unlocked && hasUpgrade("SO", 32);
            }
        },
        34: {
            description: "mercuric content 2",
            cost: new Decimal(69420),
            unlocked() {
                return player.ME.unlocked && hasUpgrade("SO", 33);
            }
        },
        35: {
            title: "Solar Blessing γ",
            description: "mercuric content 2",
            cost: new Decimal(69420),
            unlocked() {
                return player.ME.unlocked && hasUpgrade("SO", 34);
            },
            onPurchase() {
                player.SolarBlessings = player.SolarBlessings.add(1)
            },
        }
    },
    buyables: {
        rows: 1,
        cols: 2,
        11: {
            display() {
                return `Add a free Solar Blessing to all Solar Blessing's effects. <br> Cost: ${this.cost()} Solar Points <br> Bought: ${player.SO.buyables[11]}`
            },
            cost() {
                return new Decimal(100).max(1).pow(player.SO.buyables[11].plus(1));
            },
            effect() {
                return player.SO.buyables[11];
            },
            unlocked() {
                return hasSOUpg(15);
            },
            canAfford() {
                if (this.cost().lte(player.SO.points)) return true;
                return false;
            },
            buy() {
                player.SO.points = player.SO.points.sub(this.cost());
                player.AddedBlessings = player.AddedBlessings.add(1);
                player.SO.buyables[11] = player.SO.buyables[11].add(1);
            }
        },
        12: {
            display() {
                return `Boost all first row Solar Upgrades, excluding Solar Blessing α. <br> Cost: ${this.cost()} Solar Points <br> Bought: ${player.SO.buyables[12]}`;
            },
            cost() {
                return new Decimal(1000).max(1).pow(player.SO.buyables[12].plus(1));
            },
            effect() {
                return player.SO.buyables[12].times(2);
            },
            unlocked() {
                return hasMilestone("ME", 5);
            },
            canAfford() {
                if (this.cost().lte(player.SO.points)) return true;
                return false;
            },
            buy() {
                player.SO.points = player.SO.points.sub(this.cost());
                player.SO.buyables[12] = player.SO.buyables[12].add(1);
            }
        },
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
        hasMilestone("ME", 1) ? mult = mult.times(player.DumpedMercuricPoints.log10().plus(1)) : mult = mult;
        hasUpgrade("SO", 21) ? mult = mult.times(upgradeEffect("SO", 21)) : mult = mult;
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
            },
            style() {
                return {
                    'height': '90px',
                    'width': '360px',
                }
            },
        },
        2: {
            requirementDescription: `Requires 50 Dumped Mercuric Points`,
            effectDescription: `Unlock a new row of Solar Upgrades (γ)`,
            done() {
                return player.DumpedMercuricPoints.gte(50);
            },
            style() {
                return {
                    'height': '90px',
                    'width': '360px',
                }
            },
        },
        3: {
            requirementDescription: `Requires 500 Dumped Mercuric Points`,
            effectDescription: `Keep the next three Solar Upgrades on Mercuric reset.`,
            done() {
                return player.DumpedMercuricPoints.gte(500);
            },
            style() {
                return {
                    'height': '90px',
                    'width': '360px',
                }
            },
        },
        4: {
            requirementDescription: `Requires 1000 Dumped Mercuric Points`,
            effectDescription: `Unlock Venus. (Current Endgame)`,
            done() {
                return player.DumpedMercuricPoints.gte(1000);
            },
            style() {
                return {
                    'height': '90px',
                    'width': '360px',
                }
            },
        },
        5: {
            requirementDescription: `Freebie!`,
            effectDescription: `Unlock a new Solar Buyable.`,
            done() {
                return hasUpgrade("ME", 13);
            },
            unlocked() {
                return hasUpgrade("ME", 13);
            },
            style() {
                return {
                    'height': '90px',
                    'width': '360px',
                }
            },
        },
        6: {
            requirementDescription: `Requires 100 Mercuric Points`,
            effectDescription: `Keep all Solar Buyables on Mercuric Reset.`,
            done() {
                return player.ME.points.gte(100)
            },
            unlocked() {
                return hasUpgrade("ME", 13);
            },
            style() {
                return {
                    'height': '90px',
                    'width': '360px',
                }
            },
        },
        7: {
            requirementDescription: `Requires 250 Mercuric Points`,
            effectDescription: `Keep the first two Solar Upgrades on Mercuric Reset.`,
            done() {
                return player.ME.points.gte(250)
            },
            unlocked() {
                return hasUpgrade("ME", 13);
            },
            style() {
                return {
                    'height': '90px',
                    'width': '360px',
                }
            },
        },
        8: {
            requirementDescription: `Requires 750 Mercuric Points`,
            effectDescription: `Keep all Solar Upgrades on Mercuric Reset.`,
            done() {
                return player.ME.points.gte(750)
            },
            unlocked() {
                return hasUpgrade("ME", 13);
            },
            style() {
                return {
                    'height': '90px',
                    'width': '360px',
                }
            },
        },
    },
    upgrades: {
        rows: 1,
        cols: 5,
        11: {
            description: "Unlock a new row of Solar Upgrades. (β)",
            cost: new Decimal(1),
        },
        12: {
            description: "Remove Point decay.",
            cost: new Decimal(2),
        },
        13: {
            description: "Unlock non-dumped Mercuric Point milestones.",
            cost: new Decimal(4),
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
            ["milestone", 1],
            ["milestone", 2],
            ["milestone", 3],
            ["milestone", 4],
            "blank",
            "clickables",
            "blank",
            ["bar", "mercuricBar"],
            "blank",
            ]
        },
        "Upgrades": {
            content: ["main-display",
                "upgrades",
                ["milestone", 5],
                ["milestone", 6],
                ["milestone", 7],
                ["milestone", 8],
            ]
        }
    },
    doReset() {
        player.SolarBlessings = new Decimal(0);
        player.AddedBlessings = new Decimal(0);

        player.SO.buyables[11] = new Decimal(0);
        player.SO.buyables[12] = new Decimal(0); 

        if (hasMilestone("ME", 7)) player.SO.upgrades = [11, 12];
        if (hasMilestone("ME", 3)) player.SO.upgrades = [11, 12, 13, 14, 15];
        if (hasMilestone("ME", 8)) player.SO.upgrades = [11, 12, 13, 14, 15, 21, 22, 23, 24, 25, 31, 32, 33, 34, 35];
    }
});

