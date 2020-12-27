// User variables
let currentColor = "";
let score = 0;
let numberColorsSeen = 0;

// Settings
let secondsBeforeGameStart = 5;
let numberOfColors = 10;
let secondsBetweenColors = 6;

/** Given colors in form of #XXXXXX and #YYYYYY, 
determines score that should be awarded. */
colorScore = (given, actual) => 
	Math.round((((255 ** 2) * 3) - squareOfColorDistance(given, actual)) / 195);

squareOfColorDistance = (color1, color2) =>
	distanceOfHexValuesBetween(color1, color2, 1, 3) ** 2 +
	distanceOfHexValuesBetween(color1, color2, 3, 5) ** 2 +
	distanceOfHexValuesBetween(color1, color2, 5, 7) ** 2 ;

distanceOfHexValuesBetween = (color1, color2, start, end) => 
	parseInt(color1.slice(start,end), 16) - 
	parseInt(color2.slice(start,end), 16);

// https://stackoverflow.com/a/1484514
getRandomColor = () => {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

generateNewColor = () => {
	$("#score").html(score);
	currentColor = getRandomColor();
	$("#color").css("background-color", currentColor);
	numberColorsSeen++;
	// Update number of colors seen in UI
	$("#colors-seen").html(numberColorsSeen + "/" + numberOfColors)
};

nextColor = () => {
	console.log("colorScore: " + "#" + $("#answer").val() + ", " + currentColor);
	score += colorScore("#" + $("#answer").val(), currentColor);
	generateNewColor();
}

startGame = () => {
	let count = secondsBetweenColors;
	generateNewColor();
	timerIntervalID = setInterval(() => {
		$("#time-left").html(count);
		if(count == 0) {
			if(numberColorsSeen == numberOfColors) {
				// 'round' over 
				clearInterval(timerIntervalID);
				// TODO at end, display score in color box
			} else {
				nextColor();
				count = secondsBetweenColors;
			}
		} else {
			count--;
		}
	}, 1000);
};

$(document).ready(() => {
	let countBeforeStart = secondsBeforeGameStart;
	$("#color-text").css("font-size", 36);
	$("#color-text").html(countBeforeStart);
	pregameIntervalID = setInterval(() => {
		$("#color-text").html(countBeforeStart);
		if(countBeforeStart == 0) {
			$("#color-text").html("");
			startGame();
			clearInterval(pregameIntervalID);
		} else {
			countBeforeStart--;
		}
	}, 1000);
});