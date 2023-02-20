// Remember, we're gonna use strict mode in all scripts now!
'use strict';

// Using Google, StackOverflow and MDN
//PROBLEMA 1
//Lavoriamo per un'azienda che costruisce un termometro per smart home. Il nostro compito più recente è questo: "Dato un array di temperature di un giorno, calcola l'ampiezza della temperatura. Tieni presente che a volte potrebbe esserci un errore del sensore.
/*
const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];

// 1) Capire il problema
// - Cos'è l'ampiezza della temperatura? Risposta: differenza tra la temperatura più alta e quella più bassa
// - Come calcolare la tempertaura massima e minima?
// - Cosa è l'errore del sensore e a cosa serve?

// 2) Scomporre il problema in piccoli problemi
// - Come ignorare gli errori?
// - Trova il valore massimo nell'array delle temperature
// - Trova il valore minimo nell'array delle temperature
// - Sottrai il valore min dal max ( ampiezza ) e restituiscilo

const calcTempAmplitude = function (temps) {
	let max = temps[0];
	let min = temps[0];
	for(let i = 0; i < temps.length; i++) {
		const curTemp = temps[i]; 
		if(typeof curTemp !== "number") continue;
		if(curTemp > max) max = curTemp;
		if(curTemp < min) min = curTemp;
	}
	console.log(max, min);
	return max - min;
};

const amplitude = calcTempAmplitude(temperatures);
console.log(amplitude);

//PROBLEMA 2
//- La funzione deve ricevere 2 array di temperature

// 1) Capire il problema
// - Con due array posso implementare la stessa logica 2 volte?
// No! Basta unire i 2 array all'inizio

// 2) Scomporre il problema in piccoli problemi
// - Come unire 2 arrays?

const calcTempAmplitudeBug = function (temps1, temps2) {
	const temps = temps1.concat(temps2);
	console.log(temps);
	
	let max = temps[0];
	let min = temps[0];
	for(let i = 0; i < temps.length; i++) {
		const curTemp = temps[i]; 
		if(typeof curTemp !== "number") continue;
		if(curTemp > max) max = curTemp;
		if(curTemp < min) min = curTemp;
	}
	console.log(max, min);
	return max - min;
};

const amplitudeBug = calcTempAmplitudeBug([3, 5, 1], [9, 0, 5]);
console.log(amplitudeBug);
*/
//Debugging with the Console and Breakpoints
// Ipotizziamo di voler misurare la temperatura in Kelvin (basta aggiungere 273 alla gradazione standard in celsius)

const measureKelvin = function () {
	const measurement = {
		type: "temp",
		unit: "celsius",
//		value: Number(prompt("Degrees celsius:"))
		value: 10
	}

	console.table(measurement);
	
//	console.log(measurement.value);
//	console.warn(measurement.value);
//	console.error(measurement.value);
	const kelvin = measurement.value + 273;
	return kelvin;
};

console.log(measureKelvin());

// Debug using a debugger
const calcTempAmplitudeBug = function (temps1, temps2) {
	const temps = temps1.concat(temps2);
	console.log(temps);
	
	let max = 0;
	let min = 0;
	for(let i = 0; i < temps.length; i++) {
		const curTemp = temps[i]; 
		if(typeof curTemp !== "number") continue;
		if(curTemp > max) max = curTemp;
		if(curTemp < min) min = curTemp;
	}
	console.log(max, min);
	return max - min;
};

const amplitudeBug = calcTempAmplitudeBug([3, 5, 1], [9, 4, 5]);
console.log(amplitudeBug);