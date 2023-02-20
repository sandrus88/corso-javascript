'use strict';

const score0 = document.getElementById("score0");
const score1 = document.getElementById("score1");
const numberLeft = document.getElementById("number-left");
const numberRight = document.getElementById("number-right");
const btnNewGame = document.querySelector(".new-game");
const btnPutPaper = document.getElementById("paper");
const btnPutScissors = document.getElementById("scissors");
const btnPutRock = document.getElementById("rock");
const endGame = document.querySelector(".end-game");
let scores, playing;
const init = function() {
	scores = [0, 0];
	playing = true;
	score0.textContent = 0;
	score1.textContent = 0;
	numberLeft.classList.add("hidden");
	numberRight.classList.add("hidden");
	endGame.textContent = "Start the game!"
	endGame.classList.remove("bigger");
};

const putting = function(number) {
	if (playing) {
	const put = Math.trunc(Math.random() * 3) + 1;
	numberLeft.classList.remove("hidden");
	numberRight.classList.remove("hidden");
	numberLeft.src = `morra-${number}.png`;
	numberRight.src = `morra-${put}.png`;
		if ((number === 1 && put === 2) || (number === 2 && put === 3) || (number === 3 && put === 1)) {
			scores[1]++;
			score1.textContent = scores[1];
		} else if ((number === 1 && put === 3) || (number === 2 && put === 1) || (number === 3 && put === 2)) {
			scores[0]++;
			score0.textContent = scores[0];
		}
	}
	if (scores[0] === 20 || scores[1] === 20) {
		playing = false;
		numberLeft.classList.add("hidden");
		numberRight.classList.add("hidden");
		if (scores[0] === 20) {
			endGame.classList.add("bigger");
			endGame.textContent= "The winner is player 1";
		} else {
			endGame.classList.add("bigger");
			endGame.textContent= "The winner is player 2";
		}
	}
};

init();

btnPutPaper.addEventListener("click", () => { putting(1); });
btnPutScissors.addEventListener("click", () => { putting(2); });
btnPutRock.addEventListener("click", () => { putting(3); });
btnNewGame.addEventListener("click", init);