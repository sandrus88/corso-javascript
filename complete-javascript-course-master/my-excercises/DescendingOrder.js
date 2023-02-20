'use strict';
/*
Il tuo compito è creare una funzione che possa prendere qualsiasi numero intero non negativo come argomento e restituirlo con le sue cifre in ordine decrescente.
In sostanza, riorganizza le cifre per creare il numero più alto possibile.

Examples:
Input: 42145 Output: 54421

Input: 145263 Output: 654321

Input: 123456789 Output: 987654321
*/

const descendingOrder = function(x) {
	if(x < 0) console.log("x deve essere un intero non negativo");
	 let numToString = String(x),
	  numToStringArr = numToString.split(""),
	  numToStringArrSorted = numToStringArr.sort((a, b) => (a - b));
	  
	  
	 numToStringArrSorted = numToStringArrSorted.reverse();
	 numToString = numToStringArrSorted.join("");
	 
	 return parseInt(numToString);
}

console.log(descendingOrder(560982));