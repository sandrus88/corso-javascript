'use strict';
/*
Given a string of words, you need to find the highest scoring word.

Each letter of a word scores points according to its position in the alphabet: a = 1, b = 2, c = 3 etc.

For example, the score of abad is 8 (1 + 2 + 1 + 4).

You need to return the highest scoring word as a string.

If two words score the same, return the word that appears earliest in the original string.

All letters will be lowercase and all inputs will be valid.
*/

//come assegnare ad ogni lettera il numero di posizione corrispondente ('hello'.charCodeAt(2) - 96) output 5
//abcdefghijklmnopqrstuvwxyz

const highestScoringWord = function(str) {
	const arrOfStrings = str.toLowerCase().split(/[\s,]/);
	let firstString = arrOfStrings[0];
	let currentScore = 0;
	
	for (let i = 0; i < arrOfStrings.length; i++) {
		let sumScores = 0;
		for (let y = 0; y < arrOfStrings[i].split("").length; y++) {
			sumScores += arrOfStrings[i].charCodeAt(y) - 96;
		}
		if (sumScores > currentScore) {
			currentScore = sumScores;
			firstString = arrOfStrings[i];
		} else if (sumScores === currentScore) continue;

	}
	return firstString;
};

console.log(highestScoringWord("ciao mi chiamo kdoosva osvakdo"));