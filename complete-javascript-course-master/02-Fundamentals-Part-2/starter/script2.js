'use strict';
/*
// Activating Strict Mode
let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriversLicense = true;
if (hasDriversLicense) console.log('I can drive :D');

//const interface = 'Audio';
//const private = 534;
*/

////////////////////////////////////////////////////////////////////////
// Functions
/*
function logger() {
	console.log("My name is Jonas");
}

// calling or running or invoking function
logger();
logger();
logger();

function fruitProcessor(apples, oranges) {
	console.log(apples, oranges);
	const juice = `Juice with ${apples} apples and ${oranges} oranges.`
	return juice;
}

const appleJuice = fruitProcessor(5, 0);
console.log(appleJuice);

const appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice);
*/
////////////////////////////////////////////////////////////////////////
// Function Declarations vs. Expressions
/*
//Function Declaration
function calcAge1(birthYear) {
	return 2037 - birthYear;
}

const age1 = calcAge1(1991);

//Function Expression
const calcAge2 = function(birthYear) {
	return 2037 - birthYear;
}

const age2 = calcAge2(1991);
console.log(age1, age2);
*/
////////////////////////////////////////////////////////////////////////
//Arrow Function is a special function expression (non accetta la parola chiave this) 
/*
const calcAge3 = birthYear => 2037 - birthYear;// si usa spesso quando si crea una funzione ad una riga molto semplice 
const age3 = calcAge3(1991);
console.log(age3);

const yearsUntilRetirement = (birthYear, firstname) => {// in questo caso diventa più complesso quindi di solito non si usa qui
	const age = 2037 - birthYear;
	const retirement = 65 - age;
	//return retirement;
	return `${firstname} retires in ${retirement} years`;
}

console.log(yearsUntilRetirement(1991, "Jonas"));
console.log(yearsUntilRetirement(1980, "Bob"));
*/
////////////////////////////////////////////////////////////////////////
// Functions Calling Other Functions
/*
function cutFruitPieces(fruit) {
	return fruit * 4;
}

function fruitProcessor(apples, oranges) {
	const applePieces = cutFruitPieces(apples);
	const orangePieces = cutFruitPieces(oranges);
	const juice = `Juice with ${applePieces} pieces of apple and ${orangePieces} pieces of orange.`
	return juice;
}

console.log(fruitProcessor(2, 3));
*/
////////////////////////////////////////////////////////////////////////
// Reviewing Functions
/*
const calcAge = function(birthYear) {
	return 2037 - birthYear;
}

const yearsUntilRetirement = function(birthYear, firstname) {
	const age = calcAge(birthYear);
	const retirement = 65 - age;
	
	if(retirement > 0) {
		console.log(`${firstname} retires in ${retirement} years`);
		return retirement;
	} else {
		console.log(`${firstname} has already retired!`);
		return -1;
	}
}

console.log(yearsUntilRetirement(1991, "Jonas"));
console.log(yearsUntilRetirement(1950, "Mike"));
*/
////////////////////////////////////////////////////////////////////////
//Introduction to Arrays
/*
const friend1 = "Michael";
const friend2 = "Steven";
const friend3 = "Peter";

const friends = ["Michael", "Steven", "Peter"];// un modo per creare array, questa è la forma più utilizzata
console.log(friends);

const y = new Array(1991, 1984, 2008, 2020);// altro modo per creare array

console.log(friends[0]);// per accedere agli elementi dell'array
console.log(friends[2]);

console.log(friends.length);// per estrarre il numero di elementi dell'array
console.log(friends[friends.length - 1]);// per estrarre l'ultimo elemento dell'array

friends[2] = "Jay";// per sostiuire un elemento dell'array
console.log(friends);

//friends = ["Bob", "Alice"];

const firstname = "Jonas";
const jonas = [firstname, "Schmedtmann", 2037 - 1991, "teacher", friends];
console.log(jonas);

//Exercise
const calcAge = function(birthYear) {
	return 2037 - birthYear;	
}

const years = [1990, 1967, 2002, 2010, 2018];

const age1 = calcAge(years[0]);
const age2 = calcAge(years[1]);
const age3 = calcAge(years[years.length - 1]);
console.log(age1, age2, age3);

const ages = [calcAge(years[0]), calcAge(years[1]), calcAge(years[years.length - 1])];
console.log(ages);
*/
////////////////////////////////////////////////////////////////////////
//Basic Array Operations (Methods)
/*
const friends = ["Michael", "Steven", "Peter"];

// Add elements
const newLenght = friends.push("Jay");// inserisce gli elementi all'interno delle parentesi alla fine dell'array
//il metodo push essendo una funzione ritorna un valore ed è la quantità di elementi presenti nell'array
console.log(friends);
console.log(newLenght);

friends.unshift("John");// inserisce gli elementi all'inizio dell'array
console.log(friends);

// Remove elements
const popped = friends.pop();// rimuove l'ultimo elemento e restituisce l'elemento eliminato non la quantità di elementi
console.log(popped);
console.log(friends);

const shifted = friends.shift();// rimuove il primo elemento e ritorna l'elemento stesso
console.log(shifted);
console.log(friends);

console.log(friends.indexOf("Steven"));// ritorna il valore dell'indice dell'elemento
console.log(friends.indexOf("Bob"));// se l'elemento non esiste ritorna -1

console.log(friends.includes("Steven"));// ritorna true se l'elemento è presente nell'array 
console.log(friends.includes("Bob"));// altrimenti ritorna false
//il metodo includes verifica la presenza di un elemtno comparandolo in senso stretto (===)
// quindi se ad esempio
friends.push(23);
// e controllo con includes passando la stringa "23"
console.log(friends.includes("23"));
// darà false

if(friends.includes("Steven")) {
	console.log("You have a friend called Steven");
}
*/
////////////////////////////////////////////////////////////////////////
//Introduction to Objects
/*
// negli array è possibile accedere agli elementi solamente tramite gli indici, per poter accedere agli elementi dandogli un nome
// esistono le strutture dati chimate oggetti, in sostanza si creano degli elementi con delle parole chiavi (che prendono il nome di proprietà)
// a cui si associa il valore dell'elemento stesso.

const jonas = {
	firstName: "Jonas",
	lastName: "Schmedtmann",
	age: 2037 - 1991,
	job: "teacher",
	friends: ["Michael", "Steven", "Peter"]
};

//la differenza sostanziale tra array ed oggetti è che gli oggetti contengono elementi non strutturati che si possono ricavare dal nome della proprietà
// mentre gli elementi di un array hanno una posizione ben precisa e si possono estrarre solo ricavando l'indice
*/
////////////////////////////////////////////////////////////////////////
//Dot vs. Bracket Notation
/*
const jonas = {
	firstName: "Jonas",
	lastName: "Schmedtmann",
	age: 2037 - 1991,
	job: "teacher",
	friends: ["Michael", "Steven", "Peter"]
};

console.log(jonas);

// per accedere ad un elemento dell'oggetto si può fare in due modi o con il . oppure cone le []
console.log(jonas.lastName);
console.log(jonas["lastName"]);// in questa versione bisogna mettere una stringa con il nome della proprietà oppure inserire un'espressione
// la differenza sostanziale è che mentre con il . posso accedere solo tramite il nome della proprietà
// con le [] posso inserire all'interno un' espressione che è una concatenazione di stringhe 
// ad esempio

const nameKey = "Name";
console.log(jonas["first" + nameKey]);
console.log(jonas["last" + nameKey]); 

const interestedIn = prompt("What do you want to know about Jonas? Choose between firstName, lastName, age, job and friends");
console.log(jonas.interestedIn);// con la chiamata col . darà come risultato undefined poichè non esiste una proprietà chiamata cosi
// invece

if(jonas[interestedIn]) {
	console.log(jonas[interestedIn]);
} else {
	console.log("Wrong request! Choose between firstName, lastName, age, job and friends");
}

// Add Elements
jonas.location = "Portugal";
jonas["twitter"] = "@jonasschmedtman";
console.log(jonas);

console.log(`${jonas.firstName} has ${jonas.friends.length} friends, and his best friend is called ${jonas.friends[0]}`);
*/
////////////////////////////////////////////////////////////////////////
//Object Methods
/*
const jonas = {
	firstName: "Jonas",
	lastName: "Schmedtmann",
	birthYear: 1991,
	job: "teacher",
	friends: ["Michael", "Steven", "Peter"],
	hasDriversLicense: true,

	//	calcAge: function(birthYear) {
	//		return 2037 - birthYear;
	//	}

	//	calcAge: function() {
	//		console.log(this);
	//		return 2037 - this.birthYear;
	//	}

	calcAge: function() {
		this.age = 2037 - this.birthYear;
		return this.age;
	},
	
	getSummary: function() {
		return `${this.firstName} is a ${this.calcAge()}-year old ${this.job}, and he has ${this.hasDriversLicense ? "a" : "no"} driver's license.`;
	}
};

//console.log(jonas.calcAge(1991));
//console.log(jonas["calcAge"](1991));

console.log(jonas.calcAge());

console.log(jonas.age);
console.log(jonas.age);
console.log(jonas.age);

//Challenge

console.log(jonas.getSummary());
*/
////////////////////////////////////////////////////////////////////////
//Iteration: The for Loop
/*
for(let rep = 1; rep <= 10; rep++) {
	console.log(`Lifting weights repetition ${rep}`);
}
*/
////////////////////////////////////////////////////////////////////////
//Looping Arrays, Breaking and Continuing
/*
const jonasArray = [
	"Jonas",
	"Schmedtmann",
	2037 - 1991,
	"teacher",
	["Michael", "Steven", "Peter"],
	true
];

const types = [];

for(let i = 0; i < jonasArray.length; i++) {
	console.log(jonasArray[i], typeof jonasArray[i]);
	
	//types[i] = typeof jonasArray[i];
	types.push(typeof jonasArray[i]);
}
console.log(types);

const years = [1991, 2007, 1969, 2020];
const ages = [];

for(let i = 0; i < years.length; i++) {
	ages.push(2037 - years[i]);
}
console.log(ages);

//continue and break
console.log("--- ONLY STRINGS ---");
for(let i = 0; i < jonasArray.length; i++) {
	if(typeof jonasArray[i] !== "string") continue;
	console.log(jonasArray[i], typeof jonasArray[i]);
}

console.log("--- BREAK WITH NUMBER ---");
for(let i = 0; i < jonasArray.length; i++) {
	if(typeof jonasArray[i] === "number") break;
	console.log(jonasArray[i], typeof jonasArray[i]);
}
*/
////////////////////////////////////////////////////////////////////////
//Looping Backwards and Loops in Loops
/*
const jonasArray = [
	"Jonas",
	"Schmedtmann",
	2037 - 1991,
	"teacher",
	["Michael", "Steven", "Peter"],
	true
];

for (let i = jonasArray.length - 1; i >= 0; i--) {
	console.log(i, jonasArray[i]);
}

for (let exercise = 1; exercise <= 3; exercise++) {
	console.log(`--------- Starting exercise ${exercise}`);

	for (let rep = 1; rep <= 5; rep++) {
		console.log(`Exercise ${exercise}: Lifting weight repetition ${rep}`);
	}
}
*/
////////////////////////////////////////////////////////////////////////
//The while Loop

//for(let rep = 1; rep <= 10; rep++) {
//	console.log(`Lifting weights repetition ${rep}`);
//}

let rep = 1;
while (rep <= 10) {
	console.log(`WHILE: Lifting weights repetition ${rep}`);
	rep++;
}

let dice = Math.trunc(Math.random() * 6) + 1;
console.log(dice);

while (dice !== 6) {
	console.log(`You rolled a ${dice}`);
	dice = Math.trunc(Math.random() * 6) + 1;
	if (dice === 6) console.log("Loop is about to end...");
}