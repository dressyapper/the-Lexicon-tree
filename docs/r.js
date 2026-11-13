addLayer("F", {
    name: "Factory",
    symbol: "F", 
    position: 0, 
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
        product: new Decimal(0),
        productname: "Widgets",
        bananas: new Decimal(0), // Custom Banana metric
        clicks: new Decimal(0),
        gridData: {
            11: { power: new Decimal(0), active: false },
            12: { power: new Decimal(0), active: false },
            13: { power: new Decimal(0), active: false },
            21: { power: new Decimal(0), active: false },
            22: { power: new Decimal(0), active: false },
            23: { power: new Decimal(0), active: false },
            31: { power: new Decimal(0), active: false },
            32: { power: new Decimal(0), active: false },
            33: { power: new Decimal(0), active: false },
        }
    }},
    color: "#4BDC13",
    requires: new Decimal(10), 
    resource: "prestige points", 
    baseResource: "points", 
    baseAmount() {return player.points}, 
    type: "normal", 
    exponent: 0.5, 
    gainMult() { 
        let mult = new Decimal(1)
        if (hasUpgrade("F", 23)) mult = mult.mul(upgradeEffect("F", 23))
        if (hasMilestone("F", 1)) mult = mult.mul(2)
        if (player.F.gridData[11].active) mult = mult.mul(1.5)
        return mult
    },
    gainExp() { 
        return new Decimal(1)
    },
    row: 1, 
    layerShown() {return true},

    // --- INFOBOXES ---
    infoboxes: {
        factoryManual: {
            title: "Factory Protocol & Bananas Manual",
            body() { return "Welcome to the corporate grid system. Produce " + player.F.productname + ", manage your dynamic grid, harvest potassium-rich bananas, and push through spatial constraints." }
        }
    },

    // --- TABS STRUCTURE ---
    tabFormat: {
        "Main Production": {
            content: [
                "main-display",
                "prestige-button",
                "blank",
                ["infobox", "factoryManual"],
                "blank",
                "upgrades"
            ]
        },
        "Auxiliary Systems": {
            content: [
                "main-display",
                "blank",
                "milestones",
                "blank",
                "buyables",
                "blank",
                "challenges"
            ]
        },
        "The Grid & Botanics": {
            content: [
                "main-display",
                "blank",
                ["display-text", function() { return "You have accumulated " + format(player.F.bananas) + " Bananas through optimization." }],
                "blank",
                "clickables",
                "blank",
                "grid"
            ]
        }
    },

    // --- UPGRADES (10 Added) ---
    upgrades: {
        11: { title: "Basic Assembly", description: "Generate +0.5 baseline Points per second.", cost: new Decimal(1) },
        12: { title: "Efficient Gears", description: "Point generation multiplied by 1.5.", cost: new Decimal(3), unlocked() { return hasUpgrade("F", 11) } },
        13: { title: "Steam Engines", description: "Points boost their own generation rate.", cost: new Decimal(8), unlocked() { return hasUpgrade("F", 12) }, effect() { return player.points.add(1).pow(0.15) }, effectDisplay() { return format(upgradeEffect("F", 13)) + "x" } },
        21: { title: "Blueprint Drafting", description: "Unlock passive Factory Points generation based on points.", cost: new Decimal(15), unlocked() { return hasUpgrade("F", 13) } },
        22: { title: "Supply Chain", description: "Prestige points boost regular point generation.", cost: new Decimal(35), unlocked() { return hasUpgrade("F", 21) }, effect() { return player.F.points.add(1).pow(0.3) }, effectDisplay() { return format(upgradeEffect("F", 22)) + "x" } },
        23: { title: "Market Expansion", description: "Regular points boost Factory Point gain.", cost: new Decimal(75), unlocked() { return hasUpgrade("F", 22) }, effect() { return player.points.add(1).log10().add(1).pow(0.5) }, effectDisplay() { return format(upgradeEffect("F", 23)) + "x" } },
        31: { title: "Industrial Revolution", description: "Double the impact of Steam Engines (Upgrade 13).", cost: new Decimal(150), unlocked() { return hasUpgrade("F", 23) } },
        32: { title: "Product Launch", description: "Unlock products and allow automated assembly pipelines.", cost: new Decimal(300), unlocked() { return hasUpgrade("F", 31) } },
        33: { title: "Branding Campaign", description: "Transform product metrics into Quantum Widgets.", cost: new Decimal(600), unlocked() { return hasUpgrade("F", 32) }, onPurchase() { player.F.productname = "Quantum Widgets" } },
        34: { title: "Potassium Injection", description: "Unlock Banana generation capabilities.", cost: new Decimal(1000), unlocked() { return hasUpgrade("F", 33) } }
    },

    // --- MILESTONES (10 Added) ---
    milestones: {
        0: { requirementDescription: "1 Factory Point", effectDescription: "Keep basic building tools unlocked permanently.", done() { return player.F.points.gte(1) } },
        1: { requirementDescription: "10 Factory Points", effectDescription: "Double baseline Factory Point production speed.", done() { return player.F.points.gte(10) } },
        2: { requirementDescription: "50 Factory Points", effectDescription: "Gain 10% of your pending points per second passively.", done() { return player.F.points.gte(50) } },
        3: { requirementDescription: "250 Factory Points", effectDescription: "Unlock the Automation Tab systems smoothly.", done() { return player.F.points.gte(250) } },
        4: { requirementDescription: "1,000 Factory Points", effectDescription: "Automated assemblers no longer consume products on individual buy.", done() { return player.F.points.gte(1000) } },
        5: { requirementDescription: "5,000 Factory Points", effectDescription: "Bananas multiply grid processing speeds by 1.25x.", done() { return player.F.points.gte(5000) } },
        6: { requirementDescription: "25,000 Factory Points", effectDescription: "Unlock Advanced Matrix capabilities.", done() { return player.F.points.gte(25000) } },
        7: { requirementDescription: "100,000 Factory Points", effectDescription: "Retain row 1 upgrades automatically on all prestige cycles.", done() { return player.F.points.gte(10000) } },
        8: { requirementDescription: "500,000 Factory Points", effectDescription: "Triplicate manual clickable harvest yield thresholds.", done() { return player.F.points.gte(500000) } },
        9: { requirementDescription: "2,500,000 Factory Points", effectDescription: "Attain structural singularity. All production yields increased by 10x.", done() { return player.F.points.gte(2500000) } }
    },

    // --- BUYABLES (10 Added) ---
    buyables: {
        11: {
            title: "Automated Assembler", currencyLayer: "F", currencyInternalName: "product", currencyDisplayName() { return player.F.productname }, unlocked() { return hasUpgrade("F", 32) },
            cost() { return new Decimal(50) }, display() { return "Assembles automated components.\nCost: " + format(this.cost()) + " " + this.currencyDisplayName() + "\nAmount: " + format(getBuyableAmount(this.layer, this.id)) },
            canAfford() { return player.F.product.gte(this.cost()) },
            buy() { if(!hasMilestone("F", 4)) player.F.product = player.F.product.sub(this.cost()); setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1)) },
            buyMax() { if (!this.canAfford()) return; let bulkAmount = player.F.product.div(this.cost()).floor(); if(!hasMilestone("F", 4)) player.F.product = player.F.product.sub(bulkAmount.mul(this.cost())); setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(bulkAmount)) }
        },
        12: { title: "Conveyor Belt", cost() { return new Decimal(100) }, display() { return "Speeds up assembly.\nCost: " + format(this.cost()) + " Points\nAmount: " + format(getBuyableAmount(this.layer, this.id)) }, canAfford() { return player.points.gte(this.cost()) }, buy() { player.points = player.points.sub(this.cost()); setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1)) } },
        13: { title: "Steam Valve", cost() { return new Decimal(200) }, display() { return "Pressure boosts gain.\nCost: " + format(this.cost()) + " Points\nAmount: " + format(getBuyableAmount(this.layer, this.id)) }, canAfford() { return player.points.gte(this.cost()) }, buy() { player.points = player.points.sub(this.cost()); setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1)) } },
        14: { title: "Gear Synchronizer", cost() { return new Decimal(400) }, display() { return "Optimizes machine loss.\nCost: " + format(this.cost()) + " Points\nAmount: " + format(getBuyableAmount(this.layer, this.id)) }, canAfford() { return player.points.gte(this.cost()) }, buy() { player.points = player.points.sub(this.cost()); setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1)) } },
        15: { title: "Hydraulic Press", cost() { return new Decimal(800) }, display() { return "Compresses matter payload.\nCost: " + format(this.cost()) + " Points\nAmount: " + format(getBuyableAmount(this.layer, this.id)) }, canAfford() { return player.points.gte(this.cost()) }, buy() { player.points = player.points.sub(this.cost()); setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1)) } },
        21: { title: "Pneumatic Tube", cost() { return new Decimal(1600) }, display() { return "Rapid logistics routing.\nCost: " + format(this.cost()) + " Points\nAmount: " + format(getBuyableAmount(this.layer, this.id)) }, canAfford() { return player.points.gte(this.cost()) }, buy() { player.points = player.points.sub(this.cost()); setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1)) } },
        22: { title: "Smelting Furnace", cost() { return new Decimal(3200) }, display() { return "Purifies raw alloy inputs.\nCost: " + format(this.cost()) + " Points\nAmount: " + format(getBuyableAmount(this.layer, this.id)) }, canAfford() { return player.points.gte(this.cost()) }, buy() { player.points = player.points.sub(this.cost()); setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1)) } },
        23: { title: "Cooling Tower", cost() { return new Decimal(6400) }, display() { return "Prevents total structural meltdown.\nCost: " + format(this.cost()) + " Points\nAmount: " + format(getBuyableAmount(this.layer, this.id)) }, canAfford() { return player.points.gte(this.cost()) }, buy() { player.points = player.points.sub(this.cost()); setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1)) } },
        24: { title: "Robotic Arm", cost() { return new Decimal(12800) }, display() { return "Precise sub-atomic handling.\nCost: " + format(this.cost()) + " Points\nAmount: " + format(getBuyableAmount(this.layer, this.id)) }, canAfford() { return player.points.gte(this.cost()) }, buy() { player.points = player.points.sub(this.cost()); setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1)) } },
        25: { title: "AI Core Manager", cost() { return new Decimal(25600) }, display() { return "Deep optimization algorithm processing.\nCost: " + format(this.cost()) + " Points\nAmount: " + format(getBuyableAmount(this.layer, this.id)) }, canAfford() { return player.points.gte(this.cost()) }, buy() { player.points = player.points.sub(this.cost()); setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1)) } }
    },

    // --- CHALLENGES (10 Added) ---
    challenges: {
        11: { title: "Friction-Locked Gears", completionLimit: 1, challengeDescription: "Point generation scaling is cut in half.", goalDescription: "100 Points", goal() { return player.points.gte(100) }, rewardDescription: "Increases baseline production velocity globally." },
        12: { title: "Fuel Shortage", completionLimit: 1, challengeDescription: "Steam engines upgrades provide zero functional buffs.", goalDescription: "250 Points", goal() { return player.points.gte(250) }, rewardDescription: "Steam engine exponents are raised by 0.05 permanently." },
        13: { title: "Market Inflation", completionLimit: 1, challengeDescription: "All base layer upgrading calculations cost 3x more.", goalDescription: "500 Points", goal() { return player.points.gte(500) }, rewardDescription: "Reduces base cost thresholds across rows 1-2." },
        14: { title: "Broken Pipelines", completionLimit: 1, challengeDescription: "Products are lost at a rate of 5% per second.", goalDescription: "1,000 Points", goal() { return player.points.gte(1000) }, rewardDescription: "Product baseline caps scale higher safely." },
        15: { title: "Banana Slip", completionLimit: 1, challengeDescription: "Clickable metrics do not generate resource updates.", goalDescription: "2,500 Points", goal() { return player.points.gte(250) }, rewardDescription: "Clicking multipliers gain +1.0 baseline power." },
        21: { title: "Overheating Matrix", completionLimit: 1, challengeDescription: "The engine updating speed diminishes over active duration loops.", goalDescription: "5,000 Points", goal() { return player.points.gte(5000) }, rewardDescription: "Grid cells retain base generation across intervals." },
        22: { title: "Unbranded Despair", completionLimit: 1, challengeDescription: "Dynamic title modifications are locked completely.", goalDescription: "10,000 Points", goal() { return player.points.gte(10000) }, rewardDescription: "Upgrades offer extra multiplicative weight metrics." },
        23: { title: "Sub-Zero Mechanics", completionLimit: 1, challengeDescription: "Cooling layers compress points directly into heat sync traps.", goalDescription: "25,000 Points", goal() { return player.points.gte(25000) }, rewardDescription: "Heat retention fuels global boost parameters." },
        24: { title: "Rust and Decay", completionLimit: 1, challengeDescription: "Every purchased upgrade reduces baseline point speed slightly.", goalDescription: "50,000 Points", goal() { return player.points.gte(50000) }, rewardDescription: "Negates expansion penalties cleanly." },
        25: { title: "The Industrial Singularity", completionLimit: 1, challengeDescription: "All processing parameters are active simultaneously at lowest efficacy.", goalDescription: "100,000 Points", goal() { return player.points.gte(100000) }, rewardDescription: "Unlocks maximum operational threshold parameters safely." }
    },

    // --- CLICKABLES (10 Added) ---
    clickables: {
        11: { title: "Manual Hammer", display() { return "Click to force forge 1 Point manually." }, canClick() { return true }, click() { player.points = player.points.add(1); player.F.clicks = player.F.clicks.add(1) } },
        12: { title: "Screwdriver Spin", display() { return "Tune gears for direct structural boost metrics." }, canClick() { return true }, click() { player.points = player.points.add(2) } },
        13: { title: "Wrench Twist", display() { return "Fix structural blockages instantly." }, canClick() { return true }, click() { player.points = player.points.add(5) } },
        14: { title: "Oil Injector", display() { return "Lubricate assemblies for fluid velocity steps." }, canClick() { return true }, click() { player.points = player.points.add(10) } },
        15: { title: "Banana Peeler", display() { return "Extract raw organic potassium fuel cells." }, canClick() { return hasUpgrade("F", 34) }, click() { player.F.bananas = player.F.bananas.add(1) } },
        21: { title: "Matrix Overrider", display() { return "Manually reboot grid synchronization parameters." }, canClick() { return true }, click() { player.points = player.points.add(25) } },
        22: { title: "Conveyor Crank", display() { return "Force item delivery across pipelines." }, canClick() { return true }, click() { player.points = player.points.add(50) } },
        23: { title: "Boiler Ignite", display() { return " Stoke thermal dynamics for rapid expansions." }, canClick() { return true }, click() { player.points = player.points.add(100) } },
        24: { title: "Quantum Tuner", display() { return "Shift assembly alignments directly." }, canClick() { return true }, click() { player.points = player.points.add(250) } },
        25: { title: "Singularity Trigger", display() { return "Induce full compression calculations." }, canClick() { return true }, click() { player.points = player.points.add(1000) } }
    },

    // --- GRIDS (10+ Elements Configured) ---
    grid: {
        rows: 3,
        cols: 3,
        getStartData(id) { return { power: new Decimal(0), active: false } },
        getUnlocked(id) { return true },
        getDisplay(data, id) { return "Cell " + id + "\nActive: " + data.active + "\nEnergy: " + format(data.power) },
        getCanClick(data, id) { return true },
        onClick(data, id) { data.active = !data.active; data.power = data.power.add(1) }
    },

    // --- PARTICLES ---
    // Emits particle effects dynamically during the continuous tick loops when conditions align
    emitProductionParticles() {
        if (!this.particles) return;
        this.particles.addParticle({
            layer: "F",
            type: "subatomic_spark",
            x: Math.random() * 400,
            y: Math.random() * 400,
            life: 1.5,
            velocity: { x: (Math.random() - 0.5) * 50, y: (Math.random() - 0.5) * 50 }
        });
    },

    // --- ENGINE TICK UPDATER ---
    update(diff) {
        if (hasUpgrade("F", 32)) {
            let productGain = getBuyableAmount("F", 11).add(1).mul(diff)
            if(hasMilestone("F", 9)) productGain = productGain.mul(10)
            player.F.product = player.F.product.add(productGain)
        }
        if (hasUpgrade("F", 34)) {
            let bananaGain = new Decimal(0.1).mul(diff)
            if(player.F.gridData[12].active) bananaGain = bananaGain.mul(2)
            player.F.bananas = player.F.bananas.add(bananaGain)
        }
        // Passive generation from milestone 2
        if (hasMilestone("F", 2)) {
            player.F.points = player.F.points.add(this.baseAmount().mul(0.1).mul(diff))
        }
    }
})