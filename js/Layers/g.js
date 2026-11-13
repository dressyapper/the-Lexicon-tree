addLayer("G", {
    name: "G", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        startgen: this.generators,
        generators: {
            lp: {
                amt: new Decimal(0),
                level: new Decimal(1),
                power: new Decimal(0),
    
                //base earn
                base: new Decimal(1),
    
                // floor(power/req)
                req: new Decimal(100),
    
                //effect formula (level)
                effect(level) {
                    let eff = level.add(1).pow(7.5)
                    if (level.gte(100)) {
                        eff = new Decimal(100).add(1).pow(7.5).times(level.sub(100).pow(0.9).add(1))
                    }
                    return eff
                },
    
                unlocked() {
                    return hasChallenge("G", 11)
                }
            },
            a: {
                amt: new Decimal(0),
                level: new Decimal(1),
                power: new Decimal(0),
    
                //base earn
                base: new Decimal(1),
    
                // floor(power/req)
                req: new Decimal(100),
    
                //effect formula (level)
                effect(level) {
                    let eff = level.add(1).pow(6)
                    if (level.gte(100)) {
                        eff = new Decimal(100).add(1).pow(6).times(level.sub(100).pow(0.5).add(1))
                    }
                    return eff
                },
    
                unlocked() {
                    return hasChallenge("G", 12)
                }
            },
            "&": {
                amt: new Decimal(0),
                level: new Decimal(1),
                power: new Decimal(0),
    
                //base earn
                base: new Decimal(10),
    
                // floor(power/req)
                req: new Decimal(1000),
    
                //effect formula (level)
                effect(level) {
                    let eff = level.add(1).pow(10)
                    if (eff.gte(1e100)) {
                        eff = new Decimal(1e100).times(eff.div(1e100).pow(0.5).add(1))
                    }
                    return eff
                },
    
                unlocked() {
                    return hasChallenge("G", 13)
                }
            },
            b: {
                amt: new Decimal(0),
                level: new Decimal(1),
                power: new Decimal(0),
    
                //base earn
                base: new Decimal(100),
    
                // floor(power/req)
                req: new Decimal(10000),
    
                //effect formula (level)
                effect(level) {
                    let eff = level.add(1).pow(5)
                    if (level.gte(100)) {
                        eff = new Decimal(100).add(1).pow(5).times(level.sub(100).pow(0.45).add(1))
                    }
                    return eff
                },
    
                unlocked() {
                    return hasChallenge("G", 14)
                }
            },
            c: {
                amt: new Decimal(0),
                level: new Decimal(1),
                power: new Decimal(0),
    
                //base earn
                base: new Decimal(1),
    
                // floor(power/req)
                req: new Decimal(1e100),
    
                unlocked() {
                    return hasChallenge("G", 15)
                }
            },
            d: {
                amt: new Decimal(0),
                level: new Decimal(1),
                power: new Decimal(0),
    
                //base earn
                base: new Decimal(1),
    
                // floor(power/req)
                req: new Decimal(1e100),
    
                unlocked() {
                    return hasChallenge("G", 16)
                }
            },
            e: {
                amt: new Decimal(0),
                level: new Decimal(1),
                power: new Decimal(0),
    
                //base earn
                base: new Decimal(1),
    
                // floor(power/req)
                req: new Decimal(1e100),
    
                unlocked() {
                    return hasChallenge("G", 21)
                }
            },
            f: {
                amt: new Decimal(0),
                level: new Decimal(1),
                power: new Decimal(0),
    
                //base earn
                base: new Decimal(1),
    
                // floor(power/req)
                req: new Decimal(1e100),
    
                unlocked() {
                    return hasChallenge("G", 22)
                }
            },
        },

        gps: new Decimal(0),

        genbuyableid: {
            lp: 11,
            a: 12,
            "&": 13,
            b: 14,
            c: 15,
            d: 16,
            e: 21,
            f: 22,
        },

        anti: {
            //Anti-generator challenge effects
            lp: new Decimal(1),

            //
            "&": new Decimal(0),
        }
    }},
    color: "rgb(127, 0, 255)",
    milestonePopups: true,
    generator() {
        if (!player.paused && player.G.total.gt(0)) {
            for (genname in player.G.generators) {
                let gen = player.G.generators[genname]
                if (gen.req.eq(Infinity) || gen.req.eq(0) || gen.base.eq(0)) {
                    return
                }
                else {
                    if (gen.unlocked()) {
                        gen.level = gen.power.div(gen.req).floor()
                        gen.power = gen.power.add(gen.base.div(20).div(new Decimal(gen.level).max(1).pow(0.9).div(new Decimal(challengeCompletions("G",player.G.genbuyableid[genname])).add(1).pow(3)).pow(gen.amt)).max(1.01).log(new Decimal(gen.level).sub(3000).div(100).add(1).max(1.01)).times(player.devSpeed || 1))
                    }
                    else {
                        gen.power = new Decimal(0)
                        gen.level = new Decimal(0)
                    }
                }
            }
        }
    },
    update(diff) {
        if (inChallenge("G", 11)) {
            if (challengeCompletions("G", 11) == 0) {
                player.G.anti.lp = player.G.anti.lp.times(1.005)
            }
            else if (challengeCompletions("G", 11) == 1){
                player.G.anti.lp = player.G.anti.lp.times(1.01)
            }
            else if (challengeCompletions("G", 11) == 2){
                player.G.anti.lp = player.G.anti.lp.times(1.5)
            }
            else if (challengeCompletions("G", 11) == 3){
                player.G.anti.lp = player.G.anti.lp.times(1.75)
            }
            else if (challengeCompletions("G", 11) == 4){
                player.G.anti.lp = player.G.anti.lp.times(2)
            }
        }
        else {
            player.G.anti.lp = new Decimal(1)
        }

        if (inChallenge("G", 13)) {
            player.G.anti["&"] = player.G.anti["&"].add(0.05)
            if (player.G.anti["&"].gte(1)) {
                player.A.upgrades.splice(player.A.upgrades.length-1,1)
                player.G.anti["&"] = new Decimal(0)
            }
        }
        for (i in player.G.generators) {
            player.G.generators[i].amt = getBuyableAmount("G", player.G.genbuyableid[i])
        }

        player.G.gps = player.G.generators.lp.power.max(1).times(player.G.generators.a.power.max(1).times(player.G.generators["&"].power.max(1).times(player.G.generators.b.power.max(1).times(player.G.generators.c.power.max(1).times(player.G.generators.d.power.max(1).times(player.G.generators.e.power.max(1).times(player.G.generators.f.power.max(1))))))))



        let base = {
            lp: player.G.generators.lp.base,
            a: player.G.generators.a.base,
            "&": player.G.generators["&"].base,
            b: player.G.generators.b.base,
            c: player.G.generators.c.base,
            d: player.G.generators.d.base,  
            e: player.G.generators.e.base,
            f: player.G.generators.f.base,

        }
        if (hasUpgrade("G", 31)) {base.lp = base.lp.add(1)}
        if (hasUpgrade("G", 32)) {base.lp = base.lp.add(2)}
        if (hasUpgrade("G", 33)) {base.lp = base.lp.add(5)}
        if (hasUpgrade("G", 34)) {base.lp = base.lp.add(10)}
        if (hasUpgrade("G", 35)) {base.lp = base.lp.add(15)}
        if (hasUpgrade("G", 36)) {base.lp = base.lp.add(36)}
        if (hasAchievement("Ach", 73)) {base.lp = base.lp.add(10000)}


        if (hasUpgrade("G", 41)) {base.a = base.a.add(10)}
        if (hasUpgrade("G", 42)) {base.a = base.a.add(20)}
        if (hasUpgrade("G", 43)) {base.a = base.a.add(50)}
        if (hasUpgrade("G", 44)) {base.a = base.a.add(100)}
        if (hasUpgrade("G", 45)) {base.a = base.a.add(150)}
        if (hasUpgrade("G", 46)) {base.a = base.a.add(100000)}


        if (hasUpgrade("G", 51)) {base["&"] = base["&"].add(100)}
        if (hasUpgrade("G", 52)) {base["&"] = base["&"].add(200)}
        if (hasUpgrade("G", 53)) {base["&"] = base["&"].add(500)}
        if (hasUpgrade("G", 54)) {base["&"] = base["&"].add(1000)}
        if (hasUpgrade("G", 55)) {base["&"] = base["&"].add(1500)}
        if (hasUpgrade("G", 56)) {base["&"] = base["&"].add(2000)}

        if (hasUpgrade("G", 61)) {base.b = base.b.add(1000)}
        if (hasUpgrade("G", 62)) {base.b = base.b.add(2000)}
        if (hasUpgrade("G", 63)) {base.b = base.b.add(5000)}
        if (hasUpgrade("G", 64)) {base.b = base.b.add(10000)}
        if (hasUpgrade("G", 65)) {base.b = base.b.add(15000)}
        if (hasUpgrade("G", 66)) {base.b = base.b.add(1e6)}

        

        for (i in player.G.generators) {
            player.G.generators[i].base = base[i]
        }
    },
    onPrestige() {

    },
    requires() {
        let req = new Decimal(5)
        

        return req
    },

    resource: "G", // Name of prestige currency
    baseResource: "F", // Name of resource prestige is based on
    baseAmount() {return player.F.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    branches: ["F", "G"],
    exponent() {
        let exp = new Decimal(0.5)

        return exp
    }, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    doReset(reset) {
        if (layers[reset].row <= this.row) return 

        let keep = []

        layerDataReset(this.layer, keep)

        
    },
    /*prestigeButtonText() {
        try {
            if (tmp[this.layer].layerShown && tmp[this.layer].ampersandformula.gte(1)) {
                return `${player[this.layer].points.lt(1e3) ? (tmp[this.layer].resetDescription !== undefined ? tmp[this.layer].resetDescription : "Reset for ") : ""}+<b>${formatWhole(tmp[this.layer].resetGain)}</b> ${tmp[this.layer].resource} ${tmp[this.layer].resetGain.lt(100) && player[this.layer].points.lt(1e3) ? `<br><br>Next at ${(tmp[this.layer].roundUpCost ? formatWhole(tmp[this.layer].nextAt) : format(tmp[this.layer].nextAt))} ${tmp[this.layer].baseResource}` : ""}` + "<b><br> and +"+formatWhole(tmp[this.layer].ampersandformula)+" &"
            }
            else {
                return `${player[this.layer].points.lt(1e3) ? (tmp[this.layer].resetDescription !== undefined ? tmp[this.layer].resetDescription : "Reset for ") : ""}+<b>${formatWhole(tmp[this.layer].resetGain)}</b> ${tmp[this.layer].resource} ${tmp[this.layer].resetGain.lt(100) && player[this.layer].points.lt(1e3) ? `<br><br>Next at ${(tmp[this.layer].roundUpCost ? formatWhole(tmp[this.layer].nextAt) : format(tmp[this.layer].nextAt))} ${tmp[this.layer].baseResource}` : ""}`
            }
        }
        catch {
            return "Please wait..."
        }
    },*/
    passiveGeneration() {
        function cangenerate() {
            let cangen = true
            return cangen
        }
        let pg = new Decimal(0)

        if (!cangenerate()) {
            pg = new Decimal(0)
        }
        return pg
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        return exp
    },
    row: 6, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "f", description: "f: Reset for F", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    effect() {
        let effect = new Decimal("hi")

        return effect
    },
    effectDescription() {
        return "and your "+"nothing"+" boost nothing by "+"nothing"
    },
    layerShown(){
        if (player.F.total.gte(7) && hasUpgrade("F", 51) && hasUpgrade("F", 52) && hasUpgrade("F", 53) && hasUpgrade("F", 54)) {
            player[this.layer].shown = true
        }
        return player[this.layer].shown
    },
    upgrades: {
        11: {
            title: "Generator LP",
            description: "Unlock the anti-generator LP",
            cost() {return new Decimal(1)},
        },
        12: {
            title: "Generator A",
            description: "Unlock the anti-generator A",
            cost() {return new Decimal(1)},
            unlocked() {return hasUpgrade("G", 11) }
        },
        13: {
            title: "Generator &",
            description: "Unlock the anti-generator &",
            cost() {return new Decimal(1)},
            unlocked() {return hasUpgrade("G", 12) }
        },
        14: {
            title: "Generator B",
            description: "Unlock the anti-generator B",
            cost() {return new Decimal(1)},
            unlocked() {return hasUpgrade("G", 12) }
        },

        31: {
            title: "LP Earn I",
            description: "+1 generation base",
            cost() {return new Decimal(1000)},
            
            currencyLayer: "G",
            currencyInternalName: "gps",
            currencyDisplayName() {return "GPS"},
            unlocked() {return challengeCompletions("G", 11) >= 3 },
            pay() {}
        },
        32: {
            title: "LP Earn II",
            description: "+2 generation base",
            cost() {return new Decimal(2000)},
            
            currencyLayer: "G",
            currencyInternalName: "gps",
            currencyDisplayName() {return "GPS"},
            unlocked() {return hasUpgrade("G",31)},
            pay() {}
        },
        33: {
            title: "LP Earn III",
            description: "+5 generation base",
            cost() {return new Decimal(5000)},
            
            currencyLayer: "G",
            currencyInternalName: "gps",
            currencyDisplayName() {return "GPS"},
            unlocked() {return hasUpgrade("G",32)},
            pay() {}
        },
        34: {
            title: "LP Earn IV",
            description: "+10 generation base",
            cost() {return new Decimal(10000)},
            
            currencyLayer: "G",
            currencyInternalName: "gps",
            currencyDisplayName() {return "GPS"},
            unlocked() {return hasUpgrade("G",33)},
            pay() {}
        },
        35: {
            title: "LP Earn V",
            description: "+15 generation base",
            cost() {return new Decimal(15000)},
            
            currencyLayer: "G",
            currencyInternalName: "gps",
            currencyDisplayName() {return "GPS"},
            unlocked() {return hasUpgrade("G",34)},
            pay() {}
        },
        36: {
            title: "LP Earn VI",
            description: "+36 generation base",
            cost() {return new Decimal(36000)},
            
            currencyLayer: "G",
            currencyInternalName: "gps",
            currencyDisplayName() {return "GPS"},
            unlocked() {return hasUpgrade("G",35)},
            pay() {}
        },

        41: {
            title: "A Earn I",
            description: "+10 generation base",
            cost() {return new Decimal(5e7)},
            
            currencyLayer: "G",
            currencyInternalName: "gps",
            currencyDisplayName() {return "GPS"},
            unlocked() {return challengeCompletions("G", 12) >= 2 },
            pay() {}
        },
        42: {
            title: "A Earn II",
            description: "+20 generation base",
            cost() {return new Decimal(7.5e8)},
            
            currencyLayer: "G",
            currencyInternalName: "gps",
            currencyDisplayName() {return "GPS"},
            unlocked() {return hasUpgrade("G",41)},
            pay() {}
        },
        43: {
            title: "A Earn III",
            description: "+50 generation base",
            cost() {return new Decimal(1.5e9)},
            
            currencyLayer: "G",
            currencyInternalName: "gps",
            currencyDisplayName() {return "GPS"},
            unlocked() {return hasUpgrade("G",42)},
            pay() {}
        },
        44: {
            title: "A Earn IV",
            description: "+100 generation base",
            cost() {return new Decimal(3e9)},
            
            currencyLayer: "G",
            currencyInternalName: "gps",
            currencyDisplayName() {return "GPS"},
            unlocked() {return hasUpgrade("G",43)},
            pay() {}
        },
        45: {
            title: "A Earn V",
            description: "+150 generation base",
            cost() {return new Decimal(5e9)},
            
            currencyLayer: "G",
            currencyInternalName: "gps",
            currencyDisplayName() {return "GPS"},
            unlocked() {return hasUpgrade("G",44)},
            pay() {}
        },
        46: {
            title: "A Earn VI",
            description: "+100000 generation base (requires 4 challenge completions)",
            cost() {return new Decimal(5e10)},
            
            currencyLayer: "G",
            currencyInternalName: "gps",
            currencyDisplayName() {return "GPS"},
            unlocked() {return hasUpgrade("G",45)},
            pay() {}
        },

        51: {
            title: "& Earn I",
            description: "+100 generation base",
            cost() {return new Decimal(1e17)},
            
            currencyLayer: "G",
            currencyInternalName: "gps",
            currencyDisplayName() {return "GPS"},
            unlocked() {return challengeCompletions("G", 12) >= 2 },
            pay() {}
        },
        52: {
            title: "& Earn II",
            description: "+200 generation base",
            cost() {return new Decimal(5e17)},
            
            currencyLayer: "G",
            currencyInternalName: "gps",
            currencyDisplayName() {return "GPS"},
            unlocked() {return hasUpgrade("G",51)},
            pay() {}
        },
        53: {
            title: "& Earn III",
            description: "+500 generation base",
            cost() {return new Decimal(1e18)},
            
            currencyLayer: "G",
            currencyInternalName: "gps",
            currencyDisplayName() {return "GPS"},
            unlocked() {return hasUpgrade("G",52)},
            pay() {}
        },
        54: {
            title: "& Earn IV",
            description: "+1000 generation base",
            cost() {return new Decimal(4e18)},
            
            currencyLayer: "G",
            currencyInternalName: "gps",
            currencyDisplayName() {return "GPS"},
            unlocked() {return hasUpgrade("G",53)},
            pay() {}
        },
        55: {
            title: "& Earn V",
            description: "+1500 generation base",
            cost() {return new Decimal(1e19)},
            
            currencyLayer: "G",
            currencyInternalName: "gps",
            currencyDisplayName() {return "GPS"},
            unlocked() {return hasUpgrade("G",54)},
            pay() {}
        },
        56: {
            title: "& Earn VI",
            description: "+2000 generation base ",
            cost() {return new Decimal(1e20)},
            
            currencyLayer: "G",
            currencyInternalName: "gps",
            currencyDisplayName() {return "GPS"},
            unlocked() {return hasUpgrade("G",55)},
            pay() {}
        },

        61: {
            title: "B Earn I",
            description: "+1000 generation base",
            cost() {return new Decimal(2e24)},
            
            currencyLayer: "G",
            currencyInternalName: "gps",
            currencyDisplayName() {return "GPS"},
            unlocked() {return challengeCompletions("G", 12) >= 2 },
            pay() {}
        },
        62: {
            title: "B Earn II",
            description: "+2000 generation base",
            cost() {return new Decimal(1e25)},
            
            currencyLayer: "G",
            currencyInternalName: "gps",
            currencyDisplayName() {return "GPS"},
            unlocked() {return hasUpgrade("G",61)},
            pay() {}
        },
        63: {
            title: "B Earn III",
            description: "+5000 generation base",
            cost() {return new Decimal(2e25)},
            
            currencyLayer: "G",
            currencyInternalName: "gps",
            currencyDisplayName() {return "GPS"},
            unlocked() {return hasUpgrade("G",62)},
            pay() {}
        },
        64: {
            title: "B Earn IV",
            description: "+10000 generation base",
            cost() {return new Decimal(5e25)},
            
            currencyLayer: "G",
            currencyInternalName: "gps",
            currencyDisplayName() {return "GPS"},
            unlocked() {return hasUpgrade("G",63)},
            pay() {}
        },
        65: {
            title: "B Earn V",
            description: "+15000 generation base",
            cost() {return new Decimal(1e26)},
            
            currencyLayer: "G",
            currencyInternalName: "gps",
            currencyDisplayName() {return "GPS"},
            unlocked() {return hasUpgrade("G",64)},
            pay() {}
        },
        66: {
            title: "B Earn VI",
            description: "+2000 generation base ",
            cost() {return new Decimal(2e26)},
            
            currencyLayer: "G",
            currencyInternalName: "gps",
            currencyDisplayName() {return "GPS"},
            unlocked() {return hasUpgrade("G",65)},
            pay() {}
        },
    },
    milestones: {
       
    },
    bars: {
        lp: {
            direction: RIGHT,
            width: 500,
            height: 50,
            display() {return (player.G.generators.lp.power.sub(player.G.generators.lp.level.times(player.G.generators.lp.req)).div(player.G.generators.lp.req)).times(100).floor()+"%"+" //// Level: "+ player.G.generators.lp.level},
            progress() {return player.G.generators.lp.power.sub(player.G.generators.lp.level.times(player.G.generators.lp.req)).div(player.G.generators.lp.req)},
            fillStyle() {
                return {"background": "grey"}
            },
            unlocked() {
                return hasChallenge("G", 11)
            }
        },
        a: {
            direction: RIGHT,
            width: 500,
            height: 50,
            display() {return (player.G.generators.a.power.sub(player.G.generators.a.level.times(player.G.generators.a.req)).div(player.G.generators.a.req)).times(100).floor()+"%"+" //// Level: "+ player.G.generators.a.level},
            progress() {return player.G.generators.a.power.sub(player.G.generators.a.level.times(player.G.generators.a.req)).div(player.G.generators.a.req)},
            fillStyle() {
                return {"background": tmp.A.color}
            },
            unlocked() {
                return hasChallenge("G", 12)
            }
        },
        "&": {
            direction: RIGHT,
            width: 500,
            height: 50,
            display() {return (player.G.generators["&"].power.sub(player.G.generators["&"].level.times(player.G.generators["&"].req)).div(player.G.generators["&"].req)).times(100).floor()+"%"+" //// Level: "+ player.G.generators["&"].level},
            progress() {return player.G.generators["&"].power.sub(player.G.generators["&"].level.times(player.G.generators["&"].req)).div(player.G.generators["&"].req)},
            fillStyle() {
                return {"background": tmp["&"].color}
            },
            unlocked() {
                return hasChallenge("G", 13)
            }
        },
        b: {
            direction: RIGHT,
            width: 500,
            height: 50,
            display() {return (player.G.generators.b.power.sub(player.G.generators.b.level.times(player.G.generators.b.req)).div(player.G.generators.b.req)).times(100).floor()+"%"+" //// Level: "+ player.G.generators.b.level},
            progress() {return player.G.generators.b.power.sub(player.G.generators.b.level.times(player.G.generators.b.req)).div(player.G.generators.b.req)},
            fillStyle() {
                return {"background": tmp.B.color}
            },
            unlocked() {
                return hasChallenge("G", 14)
            }
        },
    },
    buyables: {
        11: {
            title: "Generator LP",
            description() {
                return ""
            },
            purchaseLimit() {
                let limit = new Decimal(15)

                return limit.floor()
            },
            unlocked() {return hasChallenge("G", 11)},
            cost(x) {
                return x
            },
            display() {
                if (this.purchaseLimit()) {
                    return ""+this.description()+"<br>Cost: " + format(this.cost()) +" G<br>Bought: " + getBuyableAmount(this.layer, this.id) + "/"+format(this.purchaseLimit())
                }
                else {
                    return ""+this.description()+"<br>Cost: " + format(this.cost()) + "G<br>Bought: " + getBuyableAmount(this.layer, this.id)
                }
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                if (player[this.layer].points.sign == -1) return
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let eff = new Decimal(x)
                return eff
            },
            style() {
                return {
                    "height": "100px"
                }
            }
        },
        12: {
            title: "Generator A",
            description() {
                return ""
            },
            purchaseLimit() {
                let limit = new Decimal(10)

                return limit.floor()
            },
            unlocked() {return hasChallenge("G", 12)},
            cost(x) {
                return x
            },
            display() {
                if (this.purchaseLimit()) {
                    return ""+this.description()+"<br>Cost: " + format(this.cost()) +" G<br>Bought: " + getBuyableAmount(this.layer, this.id) + "/"+format(this.purchaseLimit())
                }
                else {
                    return ""+this.description()+"<br>Cost: " + format(this.cost()) + "G<br>Bought: " + getBuyableAmount(this.layer, this.id)
                }
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                if (player[this.layer].points.sign == -1) return
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let eff = new Decimal(x)
                return eff
            },
            style() {
                return {
                    "height": "100px"
                }
            }
        },
        13: {
            title: "Generator &",
            description() {
                return ""
            },
            purchaseLimit() {
                let limit = new Decimal(10)

                return limit.floor()
            },
            unlocked() {return hasChallenge("G", 13)},
            cost(x) {
                return x
            },
            display() {
                if (this.purchaseLimit()) {
                    return ""+this.description()+"<br>Cost: " + format(this.cost()) +" G<br>Bought: " + getBuyableAmount(this.layer, this.id) + "/"+format(this.purchaseLimit())
                }
                else {
                    return ""+this.description()+"<br>Cost: " + format(this.cost()) + "G<br>Bought: " + getBuyableAmount(this.layer, this.id)
                }
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                if (player[this.layer].points.sign == -1) return
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let eff = new Decimal(x)
                return eff
            },
            style() {
                return {
                    "height": "100px"
                }
            }
        },
        14: {
            title: "Generator B",
            description() {
                return ""
            },
            purchaseLimit() {
                let limit = new Decimal(10)

                return limit.floor()
            },
            unlocked() {return hasChallenge("G", 14)},
            cost(x) {
                return x
            },
            display() {
                if (this.purchaseLimit()) {
                    return ""+this.description()+"<br>Cost: " + format(this.cost()) +" G<br>Bought: " + getBuyableAmount(this.layer, this.id) + "/"+format(this.purchaseLimit())
                }
                else {
                    return ""+this.description()+"<br>Cost: " + format(this.cost()) + "G<br>Bought: " + getBuyableAmount(this.layer, this.id)
                }
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                if (player[this.layer].points.sign == -1) return
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let eff = new Decimal(x)
                return eff
            },
            style() {
                return {
                    "height": "100px"
                }
            }
        },
    },
    infoboxes: {
        generator: {
            title: "Generators",
            body: "Generators produce multipliers based on generated level. <br>Their gain starts to diminish at around 3000 levels",
        },
        gps: {
            title: "GPS",
            body: "GPS (Generator Power Score) is the product of all generator power. <br>GPS upgrades do not take any currency.",
        }
    },
    challenges: {
        11: {
            name: "Generator LP",
            challengeDescription() { 
                let x
                if (inChallenge("G", 11)) {
                    x = "LP gain is exponentially dividing every tick <br>Currently: /"+format(player.G.anti.lp)
                }
                else {
                    x = "LP gain is exponentially dividing every tick (scales with challenge completions)"
                }

                return x+"<br>"+challengeCompletions("G",this.id)+"/"+this.completionLimit
            },
            goalDescription() {
                if (challengeCompletions(this.layer, this.id) == 0) {
                    return "Get 10 LP"
                }
                else if (challengeCompletions(this.layer, this.id) == 1) {
                    return "Get 1000 A"
                }
                else if (challengeCompletions(this.layer, this.id) == 2) {
                    return "Get 50 B"
                }
                else if (challengeCompletions(this.layer, this.id) == 3) {
                    return "Get 1 C"
                }
                else if (challengeCompletions(this.layer, this.id) == 4) {
                    return "Get 1e25 LP"
                }
            },
            canComplete(){
                if (challengeCompletions(this.layer, this.id) == 0) {
                    return player.points.gte(9.996)
                }
                else if (challengeCompletions(this.layer, this.id) == 1) {
                    return player.A.points.gte(1000)
                }
                else if (challengeCompletions(this.layer, this.id) == 2) {
                    return player.B.points.gte(50)
                }
                else if (challengeCompletions(this.layer, this.id) == 3) {
                    return player.C.points.gte(1) || hasUpgrade("C", 11)
                }
                else if (challengeCompletions(this.layer, this.id) == 4) {
                    return player.points.gte(1e25)
                }
            },
            unlocked() { 
                return (hasUpgrade("G", 11) ) 
            },
            rewardEffect() {
                return new Decimal(2)
            },
            inChallengeEffect() {
                return new Decimal(4)
            },
            currencyDisplayName: "points",
            completionLimit: 5,
            rewardDescription() {
                let x
                if (challengeCompletions("G",11) == 0) {
                    x = "Unlock the LP generator"
                }
                else {
                    x = "LP generator is better"
                }

                if (challengeCompletions("G", 11) == 2) {
                    x += " and unlock Generator Power Score (GPS)"
                }
                return x
            },
            onEnter() {
                player.points = player.points
            }

        },
        12: {
            name: "Generator A",
            challengeDescription() { 
                if (challengeCompletions("G",11)) {
                    let x = "B-F divides LP gain by alot but A boosts LP (scales with challenge)"

                    return x+"<br>"+challengeCompletions("G",this.id)+"/"+this.completionLimit
                }
            },
            goalDescription() {
                return "Get "+format(new Decimal(1e25).times(new Decimal(1e8).pow(challengeCompletions(this.layer, this.id)).add(1)))+" LP"
            },
            canComplete(){
                return player.points.gte(new Decimal(1e25).times(new Decimal(1e8).pow(challengeCompletions(this.layer, this.id)).add(1)))
            },
            unlocked() { 
                return (hasUpgrade("G", 12)) 
            },
            rewardEffect() {
                return new Decimal(2)
            },
            inChallengeEffect() {
                return new Decimal(4)
            },
            currencyDisplayName: "points",
            completionLimit: 5,
            rewardDescription() {
                let x
                if (challengeCompletions("G",12) == 0) {
                    x = "Unlock the A generator"
                }
                else {
                    x = "A generator is better"
                }
                return x
            },
            onEnter() {
                player.points = player.points
            }
        },
        13: {
            name: "Generator &",
            challengeDescription() { 
                if (true) {
                    let x = "You lose A upgrades around every second, having anyting above A and below G erases point generation and A is not automated for obvious reasons but the first 2 rows of A upgrades with effects caps are squared"

                    return x+"<br>"+challengeCompletions("G",this.id)+"/"+this.completionLimit
                }
            },
            goalDescription() {
                return "Get "+format(new Decimal(1e30).times(new Decimal(1e2).pow(challengeCompletions(this.layer, this.id))).add(1))+" LP"
            },
            canComplete(){
                return player.points.gte(new Decimal(1e30).times(new Decimal(1e2).pow(challengeCompletions(this.layer, this.id))).add(1))
            },
            unlocked() { 
                return (hasUpgrade("G", 13)) 
            },
            rewardEffect() {
                return new Decimal(2)
            },
            inChallengeEffect() {
                return new Decimal(4)
            },
            currencyDisplayName: "points",
            completionLimit: 5,
            rewardDescription() {
                let x
                if (challengeCompletions("G",13) == 0) {
                    x = "Unlock the & generator"
                }
                else {
                    x = "& generator is better"
                }
                return x
            },
            onEnter() {},
            onExit() {
                
            }
        },
        14: {
            name: "Generator B",
            challengeDescription() { 
                if (true) {
                    let x = "LP is ^0.05, A is ^0.1 and B is /4 but unlock a new B buyable, having anything over B and below G erases point generation and the B generator does not work inside this challenge"

                    return x+"<br>"+challengeCompletions("G",this.id)+"/"+this.completionLimit
                }
            },
            goalDescription() {
                return "Get "+format(new Decimal(1500).pow(new Decimal(challengeCompletions(this.layer, this.id)).div(4).add(1)))+" LP"
            },
            canComplete(){
                return player.points.gte(new Decimal(1500).pow(new Decimal(challengeCompletions(this.layer, this.id)).div(4).add(1)))
            },
            unlocked() { 
                return (hasUpgrade("G", 14)) 
            },
            rewardEffect() {
                return new Decimal(2)
            },
            inChallengeEffect() {
                return new Decimal(4)
            },
            currencyDisplayName: "points",
            completionLimit: 5,
            rewardDescription() {
                let x
                if (challengeCompletions("G",14) == 0) {
                    x = "Unlock the B generator"
                }
                else {
                    x = "B generator is better"
                }
                return x
            },
            onEnter() {
                setBuyableAmount("B",21,new Decimal(0))
            },
            onExit() {
                setBuyableAmount("B",21,new Decimal(0))
            }
        }
    },
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "blank",
                "prestige-button",
                "blank",
                ["upgrades",[1]],

            ],
    
            unlocked() {return true}
        },
        "Generators": {
            content: [
                "main-display",
                "blank",
                "prestige-button",
                ["infobox", "generator"],
                "blank",
                ["display-text", function() { 
                    return 'Your LP generator has generated <h2 style="color: ' + "grey" + +'; text-shadow: 0px 0px 10px ' + "grey" + '; display: inline;"> ' + format(player.G.generators.lp.effect(player.G.generators.lp.level))+'x</h2> LP multiplier';
                }],
                ["buyable", [11]],
                ["bar", "lp"],
                "blank",
                ["display-text", function() { 
                    return 'Your A generator has generated <h2 style="color: ' + tmp["A"].color + +'; text-shadow: 0px 0px 10px ' + tmp["A"].color + '; display: inline;"> ' + format(player.G.generators.a.effect(player.G.generators.a.level))+'x</h2> A multiplier';
                }],
                ["buyable", [12]],
                ["bar", "a"],
                "blank",
                ["display-text", function() { 
                    return 'Your & generator has generated <h2 style="color: ' + tmp["&"].color + +'; text-shadow: 0px 0px 10px ' + tmp["&"].color + '; display: inline;"> ' + format(player.G.generators["&"].effect(player.G.generators["&"].level))+'x</h2> & multiplier';
                }],
                ["buyable", [13]],
                ["bar", "&"],
                "blank",
                ["display-text", function() { 
                    return 'Your B generator has generated <h2 style="color: ' + tmp["&"].color + +'; text-shadow: 0px 0px 10px ' + tmp["&"].color + '; display: inline;"> ' + format(player.G.generators.b.effect(player.G.generators.b.level))+'x</h2> B multiplier';
                }],
                ["buyable", [14]],
                ["bar", "b"],

            ],
    
            unlocked() {return hasUpgrade("G", 11)}
        },
        "Anti": {
            content: [
                "main-display",
                "blank",
                "prestige-button",
                "blank",
                "challenges",

            ],
    
            unlocked() {return hasUpgrade("G", 11)}
        },
        "GPS": {
            content: [
                "main-display",
                "blank",
                "prestige-button",
                "blank",
                ["display-text", function() { 
                    return 'You have <h2 style="color: ' + tmp[this.layer].color + +'; text-shadow: 0px 0px 10px ' + tmp[this.layer].color + '; display: inline;"> ' + format(player.G.gps)+'</h2> GPS (Generator Power Score)';
                }],
                "blank",
                ["upgrades",[3,4,5,6,7]],
                "blank",
                ["infobox", "gps"]
                

            ],
    
            unlocked() {return challengeCompletions("G", 11) >= 3}
        },

    },
})


let layerG = {
    resetGen(gen) {
        Object.assign(player.G.generators[gen],layerG.startgen[gen])
    },
    startgen: {
        lp: {
            amt: new Decimal(0),
            level: new Decimal(1),
            power: new Decimal(0),

            //base earn
            base: new Decimal(1),

            // floor(power/req)
            req: new Decimal(100),

            //effect formula (level)
            effect(level) {
                let eff = level.add(1).pow(7.5)
                if (level.gte(100)) {
                    eff = new Decimal(100).add(1).pow(7.5).times(level.sub(100).pow(0.9).add(1))
                }
                return eff
            },

            unlocked() {
                return hasChallenge("G", 11)
            }
        },
        a: {
            amt: new Decimal(0),
            level: new Decimal(1),
            power: new Decimal(0),

            //base earn
            base: new Decimal(1),

            // floor(power/req)
            req: new Decimal(100),

            //effect formula (level)
            effect(level) {
                let eff = level.add(1).pow(6)
                if (level.gte(100)) {
                    eff = new Decimal(100).add(1).pow(6).times(level.sub(100).pow(0.5).add(1))
                }
                return eff
            },

            unlocked() {
                return hasChallenge("G", 12)
            }
        },
        "&": {
            amt: new Decimal(0),
            level: new Decimal(1),
            power: new Decimal(0),

            //base earn
            base: new Decimal(10),

            // floor(power/req)
            req: new Decimal(1000),

            //effect formula (level)
            effect(level) {
                let eff = level.add(1).pow(10)
                if (eff.gte(1e100)) {
                    eff = new Decimal(1e100).times(eff.div(1e100).pow(0.5).add(1))
                }
                return eff
            },

            unlocked() {
                return hasChallenge("G", 13)
            }
        },
        b: {
            amt: new Decimal(0),
            level: new Decimal(1),
            power: new Decimal(0),

            //base earn
            base: new Decimal(1),

            // floor(power/req)
            req: new Decimal(1e100)
        },
        c: {
            amt: new Decimal(0),
            level: new Decimal(1),
            power: new Decimal(0),

            //base earn
            base: new Decimal(1),

            // floor(power/req)
            req: new Decimal(1e100)
        },
        d: {
            amt: new Decimal(0),
            level: new Decimal(1),
            power: new Decimal(0),

            //base earn
            base: new Decimal(1),

            // floor(power/req)
            req: new Decimal(1e100)
        },
        e: {
            amt: new Decimal(0),
            level: new Decimal(1),
            power: new Decimal(0),

            //base earn
            base: new Decimal(1),

            // floor(power/req)
            req: new Decimal(1e100)
        },
        f: {
            amt: new Decimal(0),
            level: new Decimal(1),
            power: new Decimal(0),

            //base earn
            base: new Decimal(1),

            // floor(power/req)
            req: new Decimal(1e100)
        },
    }
}

