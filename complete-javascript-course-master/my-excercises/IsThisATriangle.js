'use strict';
/*
Implementa una funzione che accetti 3 valori interi a, b, c. La funzione deve restituire vero se si può costruire un triangolo 
con i lati di una data lunghezza e falso in ogni altro caso.

(In questo caso, tutti i triangoli devono avere superficie maggiore di 0 per essere accettati).
*/


const isTriangle = function(a, b, c) {
	return a + b > c && b + c > a && a + c > b;
};

console.log(isTriangle(1, 1, 1));
