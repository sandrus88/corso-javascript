'use strict';

/*
You are given an array (which will have a length of at least 3, 
but could be very large) containing integers. 
The array is either entirely comprised of odd integers or 
entirely comprised of even integers except for a single integer N. 
Write a method that takes the array as an argument and returns 
this "outlier" N.

Examples
[2, 4, 0, 100, 4, 11, 2602, 36]
Should return: 11 (the only odd number)

[160, 3, 1719, 19, 11, 13, -21]
Should return: 160 (the only even number)
*/

const outlier = function(arr) {
	const isEven = function(arr) {
		const evens = arr.filter(num => num % 2 === 0);
		if (evens.length >= 2) return true;
		return false;
	};
	const filteredArr = arr.length >= 3 && isEven(arr.slice(0, 3)) ? arr.filter(num => num % 2 === 0) : arr.filter(num => num % 2 !== 0);
	const value = Number(arr.filter(num => !filteredArr.includes(num)));
	return `The outlier of this array is: ${value} (the only ${value % 2 ? "odd" : "even"} number)`;
};

console.log(outlier([2, 4, 0, 100, 4, 11, 2602, 36]));
console.log(outlier([160, 3, 1719, 19, 11, 13, -21]));
console.log(outlier([0, 1, 2]));
console.log(outlier([1, 2, 3]));
console.log(outlier([2, 6, 8, 10, 3]));
console.log(outlier([0, 0, 3, 0, 0]));
console.log(outlier([1, 1, 0, 1, 1]));