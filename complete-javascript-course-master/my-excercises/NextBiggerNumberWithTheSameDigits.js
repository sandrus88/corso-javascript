'use strict';

/*
Create a function that takes a positive integer and returns 
the next bigger number that can be formed by rearranging its digits. 
For example:

12 ==> 21
513 ==> 531
2017 ==> 2071
nextBigger(num: 12)   // returns 21
nextBigger(num: 513)  // returns 531
nextBigger(num: 2017) // returns 2071
If the digits can't be rearranged to form a bigger number, 
return -1:

9 ==> -1
111 ==> -1
531 ==> -1
nextBigger(num: 9)   // returns -1
nextBigger(num: 111) // returns -1
nextBigger(num: 531) // returns -1
*/

const nextBigger = function(n) {
  const sortedDigits = n => String(n).split("").sort((a, b) => b - a);
  const max = +sortedDigits(n).join("");
  for (let i = n + 1; i <= max; i++) {
    if (max === +sortedDigits(i).join("")) return i;
  }
  return -1;
}

console.log(nextBigger(12));
console.log(nextBigger(513));
console.log(nextBigger(2017));
console.log(nextBigger(414));
console.log(nextBigger(144));
console.log(nextBigger(3144));
console.log(nextBigger(31144));
console.log(nextBigger(9));
console.log(nextBigger(111));
console.log(nextBigger(531));

