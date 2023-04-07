'use strict';

/*
Complete the function that

1) accepts two integer arrays of equal length
2) compares the value each member in one array to the corresponding 
   member in the other
3) squares the absolute value difference between those two values
4) returns the average of those squared absolute value difference 
   between each member pair.
Examples
[1, 2, 3], [4, 5, 6]              -->   9   because (9 + 9 + 9) / 3
[10, 20, 10, 2], [10, 25, 5, -2]  -->  16.5 because (0 + 25 + 25 + 16) / 4
[-1, 0], [0, -1]                  -->   1   because (1 + 1) / 2
*/

const solution = function(firstArray, secondArray) {
	let difference;
	const squares = [];
	if(firstArray.length !== secondArray.length) return "Arrays must have equal length";
	for(let i = 0; i < firstArray.length; i++) {
		difference = firstArray[i] - secondArray[i];
		squares.push(difference**2);
		}
	return squares.reduce((acc, val) => acc + val)/squares.length;	
};

console.log(solution([1, 2, 3], [4, 5, 6]));
console.log(solution([10, 20, 10, 2], [10, 25, 5, -2]));
console.log(solution([-1, 0], [0, -1]));
