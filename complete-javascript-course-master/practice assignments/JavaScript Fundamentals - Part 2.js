'use strict';
// Functions

function describeCountry(country, population, capitalCity) {
	const description = `${country} has ${population} million people and its capital city is ${capitalCity}`;
	return description;
}

const italyDescription = describeCountry("Italy", 64, "Rome");
const finlandDescription = describeCountry("Finland", 6, "Helsinki");
const germanyDescription = describeCountry("Germany", 80, "Berlin");

console.log(italyDescription, finlandDescription, germanyDescription);


// Function Declarations vs. Expressions
function percentageOfWorld1(population) {
	return (population / 7900) * 100;
}

const percentageItaly = percentageOfWorld1(64);
const percentageFinland = percentageOfWorld1(6);
const percentageGermany = percentageOfWorld1(80);

console.log(percentageItaly, percentageFinland, percentageGermany);

const percentageOfWorld2 = function(population) {
	return (population / 7900) * 100;
}

console.log(percentageOfWorld2(64), percentageOfWorld2(6), percentageOfWorld2(80));

//Arrow Functions
const percentageOfWorld3 = population => (population / 7900) * 100;
const percentageItaly3 = percentageOfWorld3(64);
const percentageFinland3 = percentageOfWorld3(6);
const percentageGermany3 = percentageOfWorld3(80);

console.log(percentageItaly3, percentageFinland3, percentageGermany3);

// Functions Calling Other Functions
const describePopulation = function(country, population) {
	const percentageOfCountry = percentageOfWorld1(population);
	return `${country} has ${population} million people, which is about ${percentageOfCountry}% of the world.`;
}

const italyDescription1 = describePopulation("Italy", 64);
const finlandDescription1 = describePopulation("Finland", 6);
const germanyDescription1 = describePopulation("Germany", 80);

console.log(italyDescription1, finlandDescription1, germanyDescription1);

//Challenge #1
const calcAverage = (firstScore, secondScore, thirdScore) => (firstScore + secondScore + thirdScore) / 3;

//Test 1 
let avgDolphins = calcAverage(44, 23, 71);
let avgKoalas = calcAverage(65, 54, 49);

//console.log(avgDolphins, avgKoalas);

const checkWinner = function(avgDolphins, avgKoalas) {
	if (avgDolphins >= (avgKoalas * 2)) {
		console.log(`Dolphins win ${avgDolphins} vs ${avgKoalas}`);
	} else if (avgKoalas >= (avgDolphins * 2)) {
		console.log(`Koalas win ${avgKoalas} vs ${avgDolphins}`);
	} else {
		console.log("No team wins...");
	}
}

checkWinner(avgDolphins, avgKoalas);

//Test 2 
avgDolphins = calcAverage(85, 54, 41);
avgKoalas = calcAverage(23, 34, 27);

checkWinner(avgDolphins, avgKoalas);

//Introduction to Arrays
const populations = [64, 6, 80, 68];
console.log(populations.length === 4);

const percentages = [percentageOfWorld1(populations[0]), percentageOfWorld1(populations[1]), percentageOfWorld1(populations[2]), percentageOfWorld1(populations[populations.length - 1])];
console.log(percentages);

//Basic Array Operations (Methods)
const neighbours = ["Austria", "Switzerland", "France"];
console.log(neighbours);
neighbours.push("Utopia");
console.log(neighbours);
neighbours.pop();
console.log(neighbours);

if (!neighbours.includes("Germany")) {
	console.log("Probably not a central European country :D");
}

neighbours[neighbours.indexOf("Switzerland")] = "Republic of Switzerland";
console.log(neighbours);

//Challenge #2
const calcTip = function(billValue) {
	return billValue >= 50 && billValue <= 300 ? billValue * (15 / 100) : billValue * (20 / 100);
}

console.log(calcTip(100));

const bills = [125, 555, 44];
console.log(bills);

const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[bills.length - 1])];
console.log(tips);

const total = [(bills[0] + tips[0]), (bills[1] + tips[1]), ((bills[bills.length - 1]) + (tips[tips.length - 1]))];
console.log(total);

//Introduction to Objects
const myCountry = {
	country: "Italy",
	capital: "Rome",
	language: "italian",
	population: 64,
	neighbours: ["Austria", "Switzerland", "France"],
};

//Dot vs. Bracket Notation
console.log(`${myCountry.country} has ${myCountry.population} million ${myCountry.language}-speaking people, ${myCountry.neighbours.length} neighbouring countries and a capital called ${myCountry.capital}`);
myCountry.population += 2;
console.log(myCountry.population);
myCountry["population"] -= 2;
console.log(myCountry["population"]);

//Object Methods
const myCountry2 = {
	country: "Italy",
	capital: "Rome",
	language: "italian",
	population: 64,
	neighbours: ["Austria", "Switzerland", "France"],

	describe: function() {
		console.log(`${this.country} has ${this.population} million ${this.language}-speaking people, ${this.neighbours.length} neighbouring countries and a capital called ${this.capital}`);
	},

	checkIsland: function() {
		this.isIsland = this.neighbours.length === 0 ? true : false;
	}
};

myCountry2.describe();
myCountry2.checkIsland();
console.log(myCountry2);

//Challenge #3
const mark = {
	firstName: "Mark",
	lastName: "Miller",
	mass: 78,
	height: 1.69,

	calcBMI: function() {
		this.bMI = this.mass / this.height ** 2;
		return this.bMI;
	}
}

const john = {
	firstName: "John",
	lastName: "Smith",
	mass: 92,
	height: 1.95,

	calcBMI: function() {
		this.bMI = this.mass / this.height ** 2;
		return this.bMI;
	}
}

mark.calcBMI();
john.calcBMI();
console.log(mark.bMI, john.bMI);

if (mark.bMI > john.bMI) {
	console.log(`${mark.firstName} ${mark.lastName}'s BMI (${mark.bMI}) is higher than ${john.firstName} ${john.lastName}'s (${john.bMI})`);
} else if (john.bMI > mark.bMI) {
	console.log(`${john.firstName} ${john.lastName}'s BMI (${john.bMI}) is higher than ${mark.firstName} ${mark.lastName}'s (${mark.bMI})`);
}

//Iteration: The for Loop
for(i = 1; i <= 50; i++) {
	console.log(`Voter number ${i} is currently voting`);
}

//Looping Arrays, Breaking and Continuing
const percentages2 = [];

for (let i = 0; i < populations.length; i++) {
	const percentPop = percentageOfWorld1(populations[i]);
	percentages2.push(percentPop);
}

console.log(percentages2);
console.log(percentages, percentages2);

//Looping Backwards and Loops in Loops
const listOfNeighbours = [['Canada', 'Mexico'], ['Spain'], ['Norway', 'Sweden',
'Russia']];

for(let firstIteration = 0; firstIteration < listOfNeighbours.length; firstIteration++) {
	if(listOfNeighbours[firstIteration].length === 1) continue; 
	
	for(let secondIteration = 0; secondIteration < listOfNeighbours[firstIteration].length; secondIteration++) {
		console.log(`Neighbour: ${listOfNeighbours[firstIteration][secondIteration]}`);
	}
}

//The while Loop
const percentages3 = [];

let y = 0;
while(y < populations.length) {
	const percentPop = percentageOfWorld1(populations[y]);
	percentages3.push(percentPop);
	y++;
}

console.log(percentages3);
console.log(percentages, percentages3);

//Challenge #4
const bills1 = [32, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips1 = [];
const totals1 = [];

for(let i = 0; i < bills1.length; i++) {
	tips1.push(calcTip(bills1[i]));
	totals1.push(bills1[i] + tips1[i]);
}

console.log(tips1, totals1);

const calcAverage1  = function(arr) {
	let sum = 0;
	for(let i = 0; i < arr.length; i++ ) {
		sum = sum + arr[i];
	}
	return sum / arr.length;
}

console.log(totals1); 
console.log(calcAverage1(totals1));
