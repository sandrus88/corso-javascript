'use strict';

const reverseString = function(str) {
	return [...str].reverse().join("");		
};

console.log(reverseString("world"));
console.log(reverseString("word"));
