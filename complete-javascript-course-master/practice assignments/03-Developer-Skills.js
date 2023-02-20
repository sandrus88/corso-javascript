'use strict';

// Challenge #1
//Data una serie di temperature massime previste, il termometro visualizza una stringa con queste temperature.

//Example: [17, 21, 23] will print "... 17ºC in 1 days ... 21ºC in 2 days ... 23ºC in 3 days ..."

//Create a function 'printForecast' which takes in an array 'arr' and logs a string like the above to the console.

//Use the problem-solving framework: Understand the problem and break it up into sub-problems!

//TEST DATA 1: [17, 21, 23]
//TEST DATA 2: [12, 5, -5, 0, 4]

// 1) Capire il problema
// - Trasformare un array in una stringa separata da ...
// - Cosa è L'X days? Risposta: index + 1

// 2) Scomporre il problema in sottoproblemi
// - Trasforma un array in stringa
// - Trasforma ogni elemento in una stringa con °C
// - Ogni stringa contiene il giorno (index + 1)
// - Aggiungi ... tra gli elementi all'inizio e alla fine
// - Loggare la stringa in console

const printForecast = function (arr) {
	let str = "";
	for(let index = 0; index < arr.length; index++) {
		str += `${arr[index]} °C in ${index + 1} days ... `;
	}
	console.log("... " + str);
};

printForecast([17, 21, 23]);
printForecast([12, 5, -5, 0, 4]);