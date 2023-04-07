'use strict';

/*
This time we want to write calculations using functions and get 
the results. Let's have a look at some examples:

seven(times(five())); // must return 35
four(plus(nine())); // must return 13
eight(minus(three())); // must return 5
six(dividedBy(two())); // must return 3
Requirements:

1) There must be a function for each number from 0 ("zero") to 9 
   ("nine")
2) There must be a function for each of the following mathematical 
   operations: plus, minus, times, dividedBy
3) Each calculation consist of exactly one operation and two numbers
4) The most outer function represents the left operand, the most 
   inner function represents the right operand
5) Division should be integer division. For example, this should 
   return 2, not 2.666666...:
eight(dividedBy(three()));
*/

const zero = (func) => func ? func(0) : 0;
const one = (func) => func ? func(1) : 1;
const two = (func) => func ? func(2) : 2;
const three = (func) => func ? func(3) : 3;
const four = (func) => func ? func(4) : 4;
const five = (func) => func ? func(5) : 5;
const six = (func) => func ? func(6) : 6;
const seven = (func) => func ? func(7) : 7;
const eight = (func) => func ? func(8) : 8;
const nine = (func) => func ? func(9) : 9;

const plus = ( b )  => ( a ) => a + b;
const minus = ( b )  => ( a ) => a - b;
const times = ( b )  => ( a ) => a * b;
const dividedBy = ( b )  => ( a ) => Math.trunc(a / b);

console.log(seven(times(five()))); 
console.log(four(plus(nine()))); 
console.log(eight(minus(three()))); 
console.log(six(dividedBy(two())));