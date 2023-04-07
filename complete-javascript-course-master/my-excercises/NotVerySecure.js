'use strict';

/*
In this example you have to validate if a user input string is 
alphanumeric. The given string is not nil/null/NULL/None, 
so you don't have to check that.

The string has the following conditions to be alphanumeric:

1) At least one character ("" is not valid)
2) Allowed characters are uppercase / lowercase latin letters and 
   digits from 0 to 9
3) No whitespaces / underscore
*/

const alphanumeric = function(str) {
	const notWhiteSpacesOrUnderscore = (str) => [...str].forEach(ch => ch === " " || ch === "_" ? false : true);
	if(str.length >= 1 && str !== "" && /^[A-Za-z0-9]*$/.test(str) && !notWhiteSpacesOrUnderscore(str)) return true;
	return false;
};

console.log(alphanumeric("Mazinkaiser"));
console.log(alphanumeric("hello world_"));
console.log(alphanumeric("PassW0rd"));
console.log(alphanumeric("     "));