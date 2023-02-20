'use strict';

/*
//Scoping in practice
function calcAge(birthYear) {
	const age = 2037 - birthYear;

	function printAge() {
		const output = `${firstName}, you are ${age}, born in ${birthYear}`;
		console.log(output);

		if (birthYear >= 1981 && birthYear <= 1996) {
			var millenial = true; //le variabili dichiarate con var, essendo antecedenti a ES06, 
			//non hanno uno scope di blocco ma possiedono solo scope globale 
			//o quello di funzione, quindi, in questo caso, 
			//semplicemente ignora lo scope di blocco e va in quello di funzione
			//ecco perchè è visibile al di fuori del blocco if, purchè all'interno della funzione.

			const str = `Oh, and you're a millenial, ${firstName}`;
			console.log(str);

			function add(a, b) {
				return a + b;
			}
		}
		console.log(millenial);
//		console.log(add(2, 3));
	}

	printAge();
	return age;
}

const firstName = "Jonas";
calcAge(1991);
*/
////////////////////////////////////////////////////////////////////////
/*
//Hoisting in practice (se si accede alle variabili (stesso discorso vale per le funzioni) 
//prima che vengano definite js li inserisce in una zona chiamata TDZ (Temporal Dead Zone)
//ovvero js le crea "fidandosi" che verranno definite successivamente)
// Variabili
console.log(me);
//console.log(job);
//console.log(year);

var me = "Jonas"; // si può accedere a variabili dichiarate con var prima che si definiscano poichè js da il valore di undefined
let job = "teacher";// al contrario le variabili dichiarate con let e const prima di accedervi vanno definite altrimenti da errore che devono prima essere definite 
const year = 1991;

//Funzioni
console.log(addDecl(2, 3)); // la dichiarazione funzione viene svolta da js anche prima di essere assegnata 
console.log(addExpression(2, 3)); // mentre la funzione espressione e freccia se vengono dichiarate con let o const 
// vanno in TDZ, mentre se dichiarate con var (essendo che js assegna a var undefined)
// in esecuzine darà un errore in cui dice che la funzione non è una funzione (poichè è come se chiamassimo
//undefined(2, 3);)
console.log(addArrow(2, 3));

function addDecl(a, b) { 
	return a + b;
}

const addExpression = function(a, b) {
	return a + b;
};

const addArrow = (a, b) => a + b;
*/
/////////////////////////////////////////////////////////////////////////

// The this keyword in practice ( è sempre riferita all'oggetto che chiama il metodo e assume un valore che dipende dal contesto 
//in cui viene definita una funzione)
/*
console.log(this); // qui essendo nello scope globale si riferisce all'oggetto window del browser

const calcAge = function(birthYear) { // nella funzione espressione la parola this non si riferisce a nessun oggetto
//ecco perchè in esecuzione da undefined
	console.log(2037 - birthYear);
	console.log(this);
};

calcAge(1991);

const calcAgeArrow = birthYear => { // la funzione freccia invece non accetta la keyword this e quindi si riferisce all'oggetto presente nel parent scope ( in questo caso nel global scope )
// e quindi window
	console.log(2037 - birthYear);
	console.log(this);
};

calcAgeArrow(1980);
 
const jonas = {
	year: 1992,
	calcAge: function() {
		console.log(this); // in questo caso si riferisce all'oggetto jonas poichè
		// è l'oggetto jonas che chiama il metodo calcAge dopo
		console.log(2037 - this.year);
	}
};

jonas.calcAge();

//a esempio creaimo un nuovo oggetto

const matilda = {
	year: 2017
};

//adesso assegnamo a matilda la stessa funzione calcAge di jonas
matilda.calcAge = jonas.calcAge;
// chiamaimao adesso il metodo calcAge tramite matilda
matilda.calcAge(); //in questo caso this punterà a matilda percè è l'oggetto che sta chiamando il metodo
//se assegniamo il valore della funzione di jonas ad un altra variabile
//const f = jonas.calcAge; // e chiamiamo la funzione f come una normale funzione
//f(); // in esecuzione console.log(this); sarà undefined e darà un errore 
//poichè in console.log(2037 - this.year); year non può essere una prooprietà di undefined

//Arguments keyword

const addExpression = function(a, b) {
	console.log(arguments);
	return a + b;
};

addExpression(2, 5);
// la parola chiave arguments esiste nelle funzioni regolari ma no nella funzione freccia
*/
////////////////////////////////////////////////////////////////////////

//Primitives vs Objects in practice
//Primitives types
let lastName = "Williams";
let oldLastName = lastName;
lastName = "Davis";

console.log(lastName, oldLastName);

//Reference types
const jessica = {
	firstName: "Jessica",
	lastName: "Williams",
	age: 27	
};

const marriedJessica = jessica;
marriedJessica.lastName = "Davis";

console.log("Before marriage:", jessica);
console.log("After marriage:", marriedJessica);

//Copying objects
/*
const jessica2 = {
	firstName: "Jessica",
	lastName: "Williams",
	age: 27	
};

const jessicaCopy = Object.assign({}, jessica2);// con questa chiamata si creerà un altro oggetto uguale a jessica 2
jessicaCopy.lastName = "Davis";

console.log("Before marriage:", jessica2);
console.log("After marriage:", jessicaCopy);

//si tratta di una copia "superficiale" poichè si creano due oggetti uguali in cui è possibile modficare le proprietà
// ma se ad esempio l'oggetto iniziale contiene un altro oggetto all'interno (tipo un array) 
// se si va a modificare nell'oggetto copia tale array lo modificherà anche all'oggetto originale perchè servirebbe creare un clone 
// che impareremo dopo.
*/
 const jessica2 = {
	firstName: "Jessica",
	lastName: "Williams",
	age: 27,
	family: ["Alice", "Bob"]	
};

const jessicaCopy = Object.assign({}, jessica2);// con questa chiamata si creerà un altro oggetto uguale a jessica 2
jessicaCopy.lastName = "Davis";

jessicaCopy.family.push("Mary");
jessicaCopy.family.push("John");
console.log("Before marriage:", jessica2);
console.log("After marriage:", jessicaCopy);