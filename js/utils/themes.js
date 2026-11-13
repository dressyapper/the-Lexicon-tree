// ************ Themes ************
var themes =  ["default", "goodluck"]

var colors = {
	//Normal
	default: {
		1: "#ffffff",//Branch color 1
		2: "#bfbfbf",//Branch color 2
		3: "#7f7f7f",//Branch color 3
		color: "#dfdfdf",
		points: "#ffffff",
		locked: "#bf8f8f",
		background: "#0f0f0f",
		background_tooltip: "rgba(0, 0, 0, 0.75)",
	},

	//secret
	goodluck: {
		1: "#ffffff",//Branch color 1
		2: "#bfbfbf",//Branch color 2
		3: "#7f7f7f",//Branch color 3
		color: "#dfdfdf",
		points: "#ffffff",
		locked: "#bf8f8f",
		background: "#0f0f0f",
		background_tooltip: "rgba(0, 0, 0, 0.75)",
	},

	//layers
	Alphabet: {
		1: "rgb(255, 255, 255)",
		2: "rgb(255, 255, 255)",
		3: "rgb(255, 255, 255)",
		color: "rgb(255, 255, 255)",
		points: "rgb(255, 255, 255)",
		locked: "rgb(44, 0, 0)",
		background: "rgb(95, 0, 0)",
		background_tooltip: "rgba(255, 255, 255, 0.5)",
	},
	Black: {
		1: "rgb(0, 0, 0)",
		2: "rgb(0, 0, 0)",
		3: "rgb(0, 0, 0)",
		color: "rgb(46, 46, 46)",
		points: "rgb(255, 255, 255)",
		locked: "rgb(0, 0, 0)",
		background: "rgb(0, 0, 0)",
		background_tooltip: " rgba(0, 0, 0, 0.5)",
	},
	Christmas: {
		1: "rgb(255, 255, 255)",
		2: "rgb(255, 255, 255)",
		3: "rgb(255, 255, 255)",
		color: "rgb(255, 0, 0)",
		points: "rgb(0, 255, 0)",
		locked: "rgb(64, 0, 0)",
		background: "rgb(200, 200, 200)",
		background_tooltip: " rgba(0, 0, 0, 0.5)",
	},
	Diamond: {
		1: "rgb(255, 255, 255)",
		2: "rgb(255, 255, 255)",
		3: "rgb(255, 255, 255)",
		color: "rgb(255, 255, 255)",
		points: "rgb(255, 255, 255)",
		locked: "rgb(0, 99, 112)",
		background: "rgb(0, 225, 255)",
		background_tooltip: " rgba(0, 125, 255, 0.5)",
	},
	Energized: {
		1: "rgb(0, 255, 255)",
		2: "rgb(255, 255, 0)",
		3: "rgb(255, 255, 0)",
		color: "rgb(255, 255, 255)",
		points: "rgb(255, 255, 255)",
		locked: "rgb(41, 36, 0)",
		background: "rgb(218, 218, 0)",
		background_tooltip: " rgba(0, 125, 255, 0.5)",
	},
	Fish: {
		1: "rgb(0, 139, 14)",
		2: "rgb(0, 137, 23)",
		3: "rgb(16, 118, 0)",
		color: "rgb(64, 255, 0)",
		points: "rgb(0, 253, 245)",
		locked: "rgb(41, 36, 0)",
		background: "rgb(0, 218, 214)",
		background_tooltip: " rgba(0, 0, 0, 0.5)",
	},
	Galaxy: {
		1: "rgb(255, 255, 0)",
		2: "rgb(217, 255, 0)",
		3: "rgb(159, 238, 0)",
		color: "rgb(127, 115, 255)",
		points: "rgb(135, 0, 253)",
		locked: "rgb(41, 36, 0)",
		background: "rgb(0, 0, 0)",
		background_tooltip: " rgba(0, 0, 75, 0.75)",
	},
}
function changeTheme() {
	colors_theme = colors[options.theme || "default"];
	document.body.style.setProperty('--background', colors_theme["background"]);
	document.body.style.setProperty('--background_tooltip', colors_theme["background_tooltip"]);
	document.body.style.setProperty('--color', colors_theme["color"]);
	document.body.style.setProperty('--points', colors_theme["points"]);
	document.body.style.setProperty("--locked", colors_theme["locked"]);
	specialThemeFX()
}
function getThemeName() {
	return options.theme? options.theme : "default";
}

function switchTheme() {
	let index = themes.indexOf(options.theme)
	if (options.theme === null || index >= themes.length-1 || index < 0) {
		options.theme = themes[0];
	}
	else {
		index ++;
		options.theme = themes[index];
	}
	changeTheme();
	resizeCanvas();
}



function addTheme(theme) {
	if (!themes.includes(theme)) {
		themes.push(theme)
	}
}

function specialThemeFX() {
	if (options.theme == "Alphabet") {
		let loop = setInterval(() => {

			if (options.theme != "Alphabet") {
				clearInterval(loop)
			}
			else {
				if (player.currentTab != "none") {
					document.body.style.setProperty('--background', colorSubtract(tmp[player.currentTab].color, "rgb(75,75,)"));
				}
				else {
					document.body.style.setProperty('--background', "black");
				}
			}


		})
		
	}
	else if (options.theme == "goodluck") {
		
	}
}
