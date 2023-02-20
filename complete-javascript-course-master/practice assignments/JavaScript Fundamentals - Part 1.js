'use strict';
//Values and Variables
const country = "Italy";
const continent = "Europe";
let population = 640000000;

console.log(country);
console.log(continent);
console.log(population);

//Data Types
const isIsland = true;
let language;

console.log(typeof isIsland);
console.log(typeof population);
console.log(typeof country);
console.log(typeof language);

//let, const and var
language = "italian";
//isIsland = false;

//Basic Operators
console.log(population / 2);
population++;
console.log(population);
console.log(population > 6000000);
console.log(population < 33000000);
const description = country + " is in " + continent + ", and its " + population + " million people speak " + language;
console.log(description);

//Challenge #1

const massMark = 78;
const heightMark = 1.69;
const massJohn = 92;
const heightJohn = 1.95;
/*
const massMark = 95;
const heightMark = 1.88;
const massJohn = 85;
const heightJohn = 1.76;
*/
const BMIMark = massMark / heightMark ** 2;
const BMIJohn = massJohn / (heightJohn * heightJohn);
const markHigherBMI = BMIMark > BMIJohn;

console.log(BMIMark, BMIJohn, markHigherBMI);

//Strings and Template Literals
const otherDescription = `${country} is in ${continent}, and its ${population} million people speak ${language}`;
console.log(otherDescription);

//Taking Decisions: if / else Statements

if (population > 33000000) {
	console.log(`${country}'s population is above average`);
} else {
	console.log(`${country}'s population is ${population - 33000000} below average`);
}

//Challenge #2

if (BMIMark > BMIJohn) {
	console.log(`Mark's BMI ${BMIMark} is higher than John's ${BMIJohn}`);
} else {
	console.log(`John's ${BMIJohn} is higher than Mark's BMI ${BMIMark}`);
}

//Type Conversion and Coercion

console.log('9' - '5'); // 4
console.log('19' - '13' + '17'); // "617"
console.log('19' - '13' + 17); // 23
console.log('123' < 57); // false
console.log(5 + 6 + '4' + 9 - 4 - 2); // 1143

//Equality Operators: == vs. ===
/*
const numNeighbours = Number(prompt("How many neighbour countries does your country have?"));

if (numNeighbours === 1) {
	console.log("Only 1 border!");
} else if (numNeighbours > 1) {
	console.log("More than 1 border");
} else {
	console.log("No borders");
}
*/
//Logical Operators

if (language === "english" && population < 50000000 && !isIsland) {
	console.log(`You should live in ${country} :)`);
} else {
	console.log(`${country} does not meet your criteria :(`);
}

//Challenge #3

const firstTeam = "Dolphins";
const secondTeam = "Koalas";
//const averageScoreDolphins = (96 + 108 + 89) / 3;
//const averageScoreKoalas = (88 + 91 + 110) / 3;
//console.log(averageScoreDolphins, averageScoreKoalas);

//if(averageScoreDolphins === averageScoreKoalas) {
//	console.log(`${firstTeam} and ${secondTeam} drew`);
//} else if(averageScoreDolphins > averageScoreKoalas) {
//	console.log(`${firstTeam} wins the trophy`);
//} else {
//	console.log(`${secondTeam} wins the trophy`);
//}

const averageScoreDolphins = (97 + 112 + 101) / 3;
const averageScoreKoalas = (109 + 95 + 106) / 3;
console.log(averageScoreDolphins, averageScoreKoalas);

if (averageScoreDolphins === averageScoreKoalas && (averageScoreDolphins && averageScoreKoalas) >= 100) {
	console.log(`${firstTeam} and ${secondTeam} drew`);
} else if (averageScoreDolphins > averageScoreKoalas && averageScoreDolphins >= 100) {
	console.log(`${firstTeam} wins the trophy`);
} else if (averageScoreDolphins < averageScoreKoalas && averageScoreKoalas >= 100) {
	console.log(`${secondTeam} wins the trophy`);
} else {
	console.log(`No team wins the trophy`);
}

//The switch Statement

const languageSwitch = "chinese";

switch (languageSwitch) {
	case "chinese":
	case "mandarin":
		console.log("MOST number of native speakers!");
		break;
	case "spanish":
		console.log("2nd place in number of native speakers!");
		break;
	case "english":
		console.log("3rd place");
		break;
	case "hindi":
		console.log("Number 4");
		break;
	case "arabic":
		console.log("5th most spoken language");
		break;
	default:
		console.log("Great language too :D'");
}

//The Conditional (Ternary) Operator

population > 33000000 ? console.log(`${country}'s population is above average`) : console.log(`${country}'s population is below average`);

//Challenge #4

const bill = 430;
const tip = bill >= 50 && bill <=300 ? bill * (15/100) : bill * (20/100);

console.log(`The bill was ${bill}, the tip was ${tip}, and the total value
${bill + tip}`);