'use strict';
/*
Data una stringa di parole, restituisce la lunghezza delle parole più corte.

La stringa non sarà mai vuota e non è necessario tenere conto dei diversi tipi di dati.
*/

const shortestWord = function(str) {
	const arrWords = str.split(/[\s,]/);
	let shortestString = arrWords[0];
	for (let i = 0; i < arrWords.length; i++) {
		if (arrWords[i] === "") continue;
		if(arrWords[i].length < shortestString.length) shortestString = arrWords[i];
	}
	return shortestString.length;
}

console.log(shortestWord("ciao mi chiamo sandro cv yyyyyyy uhvhkvvkkvv.vkvk"));