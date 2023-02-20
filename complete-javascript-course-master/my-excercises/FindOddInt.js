'use strict';

/*
Dato un array di numeri interi, trova quello che appare un numero dispari di volte.

Ci sarà sempre un solo numero intero che appare un numero dispari di volte.

Examples
[7] should return 7, because it occurs 1 time (which is odd).
[0] should return 0, because it occurs 1 time (which is odd).
[1,1,2] should return 2, because it occurs 1 time (which is odd).
[0,1,0,1,0] should return 0, because it occurs 3 times (which is odd).
[1,2,2,3,3,3,4,3,3,3,2,2,1] should return 4, because it appears 1 time (which is odd).
*/


//- quando un numero è pari o dispari; if(number % 2==0) il numero è pari altrimenti è dispari

const findOddInt = function(arr) {
	let count = 0;
	for (let i = 0; i < arr.length; i++) {
		for (let y = 0; y < arr.length; y++) {
			if (arr[i] === arr[y]) count++;
		}
		if (count % 2 !== 0) return arr[i];
	}
	return -1;
};

console.log(findOddInt([0]));
console.log(findOddInt([1, 2, 1]));
console.log(findOddInt([5, 5, 6, 7, 7, 7]));
console.log(findOddInt([2, 3, 4]));
console.log(findOddInt([1, 1, 5, 5, 6, 6]));

