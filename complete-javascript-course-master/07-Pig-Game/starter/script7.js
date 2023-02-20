'use strict';

//per inizializzare il punteggio a 0 prendiamo i valori dal file html
//in questo caso entrambi gli score hanno la stessa classe quindi li andremo
//a selezionare tramite il loro differente id, per la classe si utilizza
//il .  mentre per l'id si può fare in due  modi:
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");//primo modo
const score1El = document.getElementById("score--1");//secondo modo
const currentScore0El = document.querySelector("#current--0");
const currentScore1El = document.querySelector("#current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
let scores, currentScore, activePlayer, playing;

//condizioni iniziali
const init = function() {
	scores = [0, 0];
	currentScore = 0;
	activePlayer = 0;
	playing = true;

	score0El.textContent = 0;
	score1El.textContent = 0;
	currentScore0El.textContent = 0;
	currentScore1El.textContent = 0;

	//adesso nascondiamo il dado
	diceEl.classList.add("hidden");//hidden è la classe che ho creato in css
	player0El.classList.remove("player--winner");
	player1El.classList.remove("player--winner");
	player0El.classList.add("player--active");
	player1El.classList.remove("player--active");
}

const switchPlayer = function() {
	document.getElementById(`current--${activePlayer}`).textContent = 0;
	activePlayer = activePlayer === 0 ? 1 : 0;
	currentScore = 0;
	player0El.classList.toggle("player--active");//toggle aggiunge la classe tra le () se non  è presente altrimenti la rimuove
	player1El.classList.toggle("player--active");
};

init();

//implementazione della funzionalità del lancio dei dadi
btnRoll.addEventListener("click", function() {
	if (playing) {
		//1. Generare un numero random che simuli il lancio del dado
		const dice = Math.trunc(Math.random() * 6) + 1;
		console.log(dice);
		//2. Mostrare il dado con il numero ottenuto
		diceEl.classList.remove("hidden");
		//per cambiare l'immagine del dado e manipolarla tramite il numero ottenuto
		//si può utilizzare la proprietà src e assegnare come numero il dice ottenuto
		diceEl.src = `dice-${dice}.png`;
		//3. Controllare se il numero è 1
		if (dice !== 1) {
			// aggiungere dice al punteggio attuale
			currentScore += dice;
			document.getElementById(`current--${activePlayer}`).textContent = currentScore;
		} else {
			// cambia giocatore
			switchPlayer();
		}
	}
});

btnHold.addEventListener("click", function() {
	if (playing) {
		//1. aggiungi il punteggio corrente al punteggio totale del giocatore attivo
		scores[activePlayer] += currentScore;
		document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
		//2. controlla se il punteggio del giocatore è >= 100
		if (scores[activePlayer] >= 100) {
			//il gioco termina
			playing = false;
			diceEl.classList.add("hidden");
			document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
			document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");

		} else {
			//cambia il giocatore
			switchPlayer();
		}
	}
});

btnNew.addEventListener("click", init);