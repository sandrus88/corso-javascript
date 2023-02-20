'use strict';

/*
Write an algorithm that takes an array and moves all of the zeros 
to the end, preserving the order of the other elements.

moveZeros([false,1,0,1,2,0,1,3,"a"]) // returns[false,1,1,2,1,3,"a",0,0]
*/

const arrExample = [false,1,0,1,2,0,1,3,"a"];
const reOrder = function(arr) {
	for(let i = 0; i < arr.length; i++) {
		if(arr[i] === 0) arr.push(arr.splice(arr.indexOf(arr[i]), 1)[0]);
	}
	console.log(arr);
};


reOrder(arrExample);