'use strict';

/*
Your job is to write a function which increments a string, 
to create a new string.


If the string already ends with a number, the number should be 
incremented by 1.
If the string does not end with a number. the number 1 should be 
appended to the new string.
Examples:

foo -> foo1

foobar23 -> foobar24

foo0042 -> foo0043

foo9 -> foo10

foo099 -> foo100

Attention: If the number has leading zeros the amount of digits 
should be considered.
*/

const incrementString = function(str) {
	if(!str.slice(-1).match(/\d+/)) return str.concat(1);
	return str.slice(0, str.indexOf(Number(str.match(/\d+/g)))).concat(Number(str.match(/\d+/)) + 1);
};

console.log(incrementString("foo"));
console.log(incrementString("foobar23"));
console.log(incrementString("foo0042"));
console.log(incrementString("foo9"));
console.log(incrementString("foo099"));
console.log(incrementString("fo99obar99"));
console.log(incrementString("1"));
console.log(incrementString("009"));
