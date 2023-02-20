'use strict';
/*
Your goal in this kata is to implement a difference function, which subtracts one list from another and returns the result.

It should remove all values from list a, which are present in list b keeping their order.

arrayDiff([1,2],[1]) == [2]
If a value is present in b, all of its occurrences must be removed from the other:

arrayDiff([1,2,2,2,3],[2]) == [1,3]
*/

const arrayDiff = function(a, b) {
	let res = [];
	for (let i = 0; i < a.length; i++) {
		if (b.indexOf(a[i]) === -1) res.push(a[i]);
	}
	for (let i = 0; i < b.length; i++) {
		if (a.indexOf(b[i]) === -1) res.push(b[i]);
	}
	return res;
}

console.log(arrayDiff([0, 2, 3, 6, "a"], [3, 6, 7, 25, "a"]));