'use strict';
/*
//selezione e manipolazione di elementi 
console.log(document.querySelector(".message").textContent);

document.querySelector(".message").textContent = "Correct Number!";

document.querySelector(".number").textContent = 13;
document.querySelector(".score").textContent = 10;


document.querySelector(".guess").value = 23;
console.log(document.querySelector(".guess").value);
*/

//gestione di ogni evento ( click del mouse, spostamentodel cursore etc.)
/*
const secretNumber = Math.trunc(Math.random() * 20 + 1);
let score = 20;
//senza nulla all'interno il metodo random da sempre un numero compreso tra 0 e 1
//per ottenere un numero compreso da 0 a 20 basta moltiplicare per 20 il numero (in questo caso il max sarà 19)
//aggiungendo 1 e troncandolo all'inizio (trunc) dai decimali otteniamo un numero da 0 a 20
document.querySelector(".number").textContent = secretNumber;

document.querySelector(".check").addEventListener("click", function() {
	const guess = Number(document.querySelector(".guess").value);
	console.log(guess, typeof guess);

	if (!guess) {
		document.querySelector(".message").textContent = "No number!";
	} else if (guess === secretNumber) {
		document.querySelector(".message").textContent = "Correct Number!";
	} else if (guess > secretNumber) {
		if (score > 1) {
			document.querySelector(".message").textContent = "Too high!";
			score--;
			document.querySelector(".score").textContent = score;
		} else {
			document.querySelector(".message").textContent = "You lost the game!";
			document.querySelector(".score").textContent = 0;
		}
	} else if (guess < secretNumber) {
		if (score > 1) {
			document.querySelector(".message").textContent = "Too low!";
			score--;
			document.querySelector(".score").textContent = score;
		} else {
			document.querySelector(".message").textContent = "You lost the game!";
			document.querySelector(".score").textContent = 0;
		}
	}
	//	console.log(document.querySelector(".guess").value);
	//	document.querySelector(".message").textContent = "Correct Number!";
});
*/
//manipolazione di CSS
/*
let secretNumber = Math.trunc(Math.random() * 20 + 1);
let score = 20;
let highscore = 0;

document.querySelector(".check").addEventListener("click", function() {
	const guess = Number(document.querySelector(".guess").value);
	console.log(guess, typeof guess);

	//quando non ci sono input
	if (!guess) {
		document.querySelector(".message").textContent = "No number!";

		//quando il giocatore vince		
	} else if (guess === secretNumber) {
		document.querySelector(".message").textContent = "Correct Number!";
		document.querySelector(".number").textContent = secretNumber;

		document.querySelector("body").style.backgroundColor = "#60b347"; //in questo caso non si utilizza .body perchè stiamo selezionando l'intero corpo e non una classe
		document.querySelector(".number").style.width = "30rem"; //il valore da cambiare deve essere sempre una stringa

		if(score > highscore) {
			highscore = score;
			document.querySelector(".highscore").textContent = highscore;
		}
		//quando l'input è troppo grande
	} else if (guess > secretNumber) {
		if (score > 1) {
			document.querySelector(".message").textContent = "Too high!";
			score--;
			document.querySelector(".score").textContent = score;
		} else {
			document.querySelector(".message").textContent = "You lost the game!";
			document.querySelector(".score").textContent = 0;
		}

		//quando l'input è troppo piccolo		
	} else if (guess < secretNumber) {
		if (score > 1) {
			document.querySelector(".message").textContent = "Too low!";
			score--;
			document.querySelector(".score").textContent = score;
		} else {
			document.querySelector(".message").textContent = "You lost the game!";
			document.querySelector(".score").textContent = 0;
		}
	}
});
*/

// Coding Challenge #1

/* 
Implement a game rest functionality, so that the player can make a new guess! Here is how:

1. Select the element with the 'again' class and attach a click event handler
2. In the handler function, restore initial values of the score and secretNumber variables
3. Restore the initial conditions of the message, number, score and guess input field
4. Also restore the original background color (#222) and number width (15rem)

GOOD LUCK 😀
*/
/*
document.querySelector(".again").addEventListener("click", function() {
	score = 20;
	secretNumber = Math.trunc(Math.random() * 20 + 1);
	document.querySelector(".message").textContent = "Start guessing...";
	document.querySelector(".number").textContent = "?";
	document.querySelector(".score").textContent = score;
	document.querySelector(".guess").value = "";
	document.querySelector("body").style.backgroundColor = "#222";
	document.querySelector(".number").style.width = "15rem";
});
*/

//pulizia del codice
let secretNumber = Math.trunc(Math.random() * 20 + 1);
let score = 20;
let highscore = 0;

const displayMessage = function(message) {
	document.querySelector(".message").textContent = message;
};

document.querySelector(".check").addEventListener("click", function() {
	const guess = Number(document.querySelector(".guess").value);
	console.log(guess, typeof guess);

	//quando non ci sono input
	if (!guess) {
//		document.querySelector(".message").textContent = "No number!";
		displayMessage("No number!");
		//quando il giocatore vince		
	} else if (guess === secretNumber) {
//		document.querySelector(".message").textContent = "Correct Number!";
		displayMessage("Correct Number!");
		document.querySelector(".number").textContent = secretNumber;

		document.querySelector("body").style.backgroundColor = "#60b347"; //in questo caso non si utilizza .body perchè stiamo selezionando l'intero corpo e non una classe
		document.querySelector(".number").style.width = "30rem"; //il valore da cambiare deve essere sempre una stringa

		if (score > highscore) {
			highscore = score;
			document.querySelector(".highscore").textContent = highscore;
		}

		//quando guess è sbagliato	
	} else if (guess !== secretNumber) {
		if (score > 1) {
//			document.querySelector(".message").textContent = guess > secretNumber ? "Too high!" : "Too low!";
			displayMessage(guess > secretNumber ? "Too high!" : "Too low!");
			score--;
			document.querySelector(".score").textContent = score;
		} else {
//			document.querySelector(".message").textContent = "You lost the game!";
			displayMessage("You lost the game!");
			document.querySelector(".score").textContent = 0;
		}
	}
});

document.querySelector(".again").addEventListener("click", function() {
	score = 20;
	secretNumber = Math.trunc(Math.random() * 20 + 1);
//	document.querySelector(".message").textContent = "Start guessing...";
	displayMessage("Start guessing...");
	document.querySelector(".number").textContent = "?";
	document.querySelector(".score").textContent = score;
	document.querySelector(".guess").value = "";
	document.querySelector("body").style.backgroundColor = "#222";
	document.querySelector(".number").style.width = "15rem";
});