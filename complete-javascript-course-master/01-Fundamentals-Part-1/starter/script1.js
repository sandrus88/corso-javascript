//Values and Variables
/*
let js = "amazing";
//	if (js === "amazing")
	//	alert("Javascript is FUN!");
	console.log(40 + 8 + 23 - 10);
	
	console.log("Jonas");
	
	let firstName = "Jonas";
	console.log(firstName);
	
	let $years= 3;
	*/

////////////////////////////////////////////////////////////////////////
//Data Types	
/*
let javascriptIsFun = true;
console.log(javascriptIsFun);
	
console.log(typeof true);
console.log(typeof javascriptIsFun);
console.log(typeof 23);
console.log(typeof "Jonas");
	
javascriptIsFun = "YES!";
console.log(typeof javascriptIsFun);
	
let year;
console.log(year);
console.log(typeof year);
	
year = 1991;
console.log(typeof year);
	
console.log(typeof null);
*/

////////////////////////////////////////////////////////////////////////
//let, const and var
/*
let age = 30; // let viene utilizzato all'interno di un blocco
age = 31;

const birthYear = 1991;
//birthYear = 1990;

//const job; un variabile const deve essere sempre dichiarata

var job = "programmer"; // var viene utilizzato all'interno di una funzione
job = "teacher";
*/

////////////////////////////////////////////////////////////////////////
//Basic Operators
/*
const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;
console.log(ageJonas, ageSarah);

console.log(ageJonas * 2, ageJonas / 10, 2 ** 3);
// 2 ** 3 significa 2 elevato a 3 = 2 * 2 * 2

const firstName = "Jonas";
const lasttName = "Schmedtmann";
console.log(firstName + " " + lasttName);

let x = 10 + 5;
x += 10;
x *= 4;
x++;
x--;
x--;
console.log(x);

console.log(ageJonas > ageSarah);
console.log(ageSarah >= 18);

const isFullAge = ageSarah >= 18;

console.log(now - 1991 > now - 2018);
*/

////////////////////////////////////////////////////////////////////////
//Operator Precedence
/*
const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;

console.log(now - 1991 > now - 2018);

let x, y;
x = y = 25 - 10 - 5;
console.log(x, y);

const averageAge = (ageJonas + ageSarah) / 2;
console.log(ageJonas, ageSarah, averageAge);
*/
////////////////////////////////////////////////////////////////////////
//Strings and Template Literals
/*
const firstName = "Jonas";
const job = "teacher";
const birthYear = 1991;
const year = 2037;

const jonas = "I'm " + firstName + ", a " + (year - birthYear) + " year old " + job + "!";
console.log(jonas);

const jonasNew = `I'm ${firstName}, a ${year - birthYear} year old ${job}!`;
console.log(jonasNew);

console.log('String with \n\
multiple \n\
lines');

console.log(`String
multiple
lines`);
*/
////////////////////////////////////////////////////////////////////////
//Taking Decisions: if / else Statements
/*
const age = 15;

if (age >= 18) {
	console.log("Sarah can start driving license");
} else {
	const yearsLeft = 18 - age;
	console.log(`Sarah is too young. Wait another ${yearsLeft} years :)`);
}

const birthYear = 2012;

let century;
if (birthYear <= 2000) {
	century = 20;
} else {
	century = 21;
}
console.log(century);
*/
//////////////////////////////////////////////////////////////////////// 
//Type Conversion and Coercion
/*
//type conversion
const inputYear = "1991";
console.log(Number(inputYear));
console.log(inputYear + 18);
console.log(Number(inputYear) + 18);

console.log(Number("Jonas"));
console.log(typeof NaN);

console.log(String(23), 23);

/* 
nella conversione ad un booleano (capita poche volte) in javascript esistono 5 valori che se convertiti danno false
e sono lo zero (0), la stringa vuota (""), il valore indefinifito (undefined), il valore nullo (null)
e il non numero (NaN)


console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean("Jonas"));
console.log(Boolean({})); // con il  simbolo {} si identifica un oggetto vuoto
console.log(Boolean(""));

//type coercion
console.log("I'm " + 23 + " years old");// in presenza di addizione js trasforma un numero in stringa concatenando
console.log("23" - "10" - 3);// in presenza di sottrazione, moltiplicazione e divisione js trasforma una stringa in numero svolgendo l'operazione
console.log("23" * "2");
console.log("23" / "2");

let n = "1" + 1; // da "11"
n = n - 1; // trasforma "11" in un numero ottenendo 10
console.log(n);

// in javascript la trasformazione in booleano è automatica 
const money = 0;
if (money) {// se money è 0 darà false, con altri valori darà true
  console.log("Don't spend it all ;)");
} else {
  console.log('You should get a job!');
}

let height;
if (height) { // height è undefinde quindi darà false, se le si da un valore sarò true
  console.log('YAY! Height is defined');
} else {
  console.log('Height is UNDEFINED');
}
*/
//////////////////////////////////////////////////////////////////////// 
//Equality Operators: == vs. ===
/*
const age = 18;
if(age === 18) console.log("You just became an adult (strict)"); // l'operatore === è detto stretto perchè non attua conversioni 

if(age == 18) console.log("You just became an adult (loose)"); // l'operatore == è detto libero perchè attua conversioni 

const ageString = "18";
if(ageString === 18) console.log("You just became an adult (strict) string version"); 

if(ageString == 18) console.log("You just became an adult (loose) string version");// in questo caso la console stampa questa stringa perchè js (tramite l'operatore == e non ===) ha converito la stringa "18" in 18

//generalmente si usa sempre === e non ==, altrimenti, se necessario, va fatta la conversione manuale
// con la funzione prompt è possibile estrarre un valore dal web (il valore sarà sempre una stringa)

//prompt("What's your favourite number?");

//per memorizzare il valore basta assegnarlo ad una variabile

const favourite = Number(prompt("What's your favourite number?"));
console.log(favourite);
console.log(typeof favourite);

if (favourite === 23) { 
  console.log('Cool! 23 is an amzaing number!')
} else if (favourite === 7) {
  console.log('7 is also a cool number')
} else if (favourite === 9) {
  console.log('9 is also a cool number')
} else {
  console.log('Number is not 23 or 7 or 9') //stamperà questa stringa perchè è "23" e non 23
}

//se convertiamo favourite in un numero tramite la function Number otterremo questa stringa "Cool! 23 is an amzaing number!"

//per utilizzare il diverso nel confronto si usa !== (stretto) e != (libero), anche in questo caso meglio utilizzare quello in forma stretta

const secondAge = 19;
if(secondAge !== 18) console.log("You don't just became an adult (strict)"); 

if(secondAge != 18) console.log("You don't just became an adult (loose)"); 
*/
//////////////////////////////////////////////////////////////////////// 
//Logical Operators
/*
const hasDriversLicense = true;
const hasGoodVision = true;

console.log(hasDriversLicense && hasGoodVision);
console.log(hasDriversLicense || hasGoodVision);
console.log(!hasDriversLicense);

//if (hasDriversLicense && hasGoodVision) {
//	console.log("Sarah is able to drive!");
//} else {
//	console.log("Someone else should drive...");
//}

const isTired = false;
console.log(hasDriversLicense && hasGoodVision && isTired);

if (hasDriversLicense && hasGoodVision && !isTired) {
	console.log("Sarah is able to drive!");
} else {
	console.log("Someone else should drive...");
}
*/
//////////////////////////////////////////////////////////////////////// 
//The switch Statement
/*
const day = "friday";

switch (day) {
	case "monday":
		console.log("Plan course structure");
		console.log("Go to coding meetup");
		break;
	case "tuesday":
		console.log("Prepare theory videos");
		break;
	case "wednesday":
	case "thursday":
		console.log("Write code examples");
		break;
	case "friday":
		console.log("Record videos");
		break;
	case "saturday":
	case "sunday":
		console.log("Enjoy the weekend :D");
		break;	
	default:
		console.log("Not a valid day!");					
}

if (day === "monday") {
	console.log("Plan course structure");
	console.log("Go to coding meetup");
} else if (day === "tuesday") {
	console.log("Prepare theory videos");
} else if (day === "wednesday" || day === "thursday") {
	console.log("Write code examples");
} else if (day === "friday") {
	console.log("Record videos");
} else if (day === "saturday" || day === "sunday") {
	console.log("Enjoy the weekend :D");
} else {
	console.log("Not a valid day!");
}
*/
//////////////////////////////////////////////////////////////////////// 
//The Conditional (Ternary) Operator

const age = 23;
age >= 18 ? console.log("I like to drink wine") : console.log("I like to drink water");

const drink = age >= 18 ? "wine" : "water";
console.log(drink);

let drink2;
if (age >= 18) {
  drink2 = "wine";
} else {
  drink2 = "water";
}
console.log(drink2);

console.log(`I like to drink ${age >= 18 ? "wine" : "water"}`);

