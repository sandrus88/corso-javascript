'use strict';

/*
You'll have to translate a string to Pilot's alphabet 
(NATO phonetic alphabet).

Input:

If, you can read?

Output:

India Foxtrot , Yankee Oscar Uniform Charlie Alfa November Romeo Echo Alfa Delta ?

Note:

1) There are preloaded dictionary you can use, named NATO
2) The set of used punctuation is ,.!?.
3) Punctuation should be kept in your return string, 
   but spaces should not.
4) Xray should not have a dash within.
5) Every word and punctuation mark should be seperated by a space ' '.
6) There should be no trailing whitespace
*/

const toNato = function(str) {
	const lettersToNato = new Map([
	["A", "Alfa"],
	["B", "Bravo"],
	["C", "Charlie"],
	["D", "Delta"],
	["E", "Echo"],
	["F", "Foxtrot"],
	["G", "Golf"],
	["H", "Hotel"],
	["I", "India"],
	["J", "Juliett"],
	["K", "Kilo"],
	["L", "Lima"],
	["M", "Mike"],
	["N", "November"],
	["O", "Oscar"],
	["P", "Papa"],
	["Q", "Quebec"],
	["R", "Romeo"],
	["S", "Sierra"],
	["T", "Tango"],
	["U", "Uniform"],
	["V", "Victor"],
	["W", "Whiskey"],
	["X", "Xray"],
	["Y", "Yankee"],
	["Z", "Zulu"],
	["1", "One"],
	["2", "Two"],
	["3", "Three"],
	["4", "Four"],
	["5", "Five"],
	["6", "Six"],
	["7", "Seven"],
	["8", "Eight"],
	["9", "Nine"],
	["0", "Zero"],
	[",", ","],
	[".", "."],
	["!", "!"],
	["?", "?"],
]);
//	const characters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
//	const charactersToNato = ["Alfa", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot", "Golf", "Hotel", "India", "Juliett", "Kilo", "Lima", "Mike", "November", "Oscar", "Papa", "Quebec", "Romeo", "Sierra", "Tango", "Uniform", "Victor", "Whiskey", "Xray", "Yankee", "Zulu", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Zero"];
	return [...str].map(letter => lettersToNato.get(letter.toUpperCase())).join(" ").replace(/\s{2,}/g, " ");
};

console.log(toNato("If, you can read?"));