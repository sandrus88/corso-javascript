'use strict';

//parametri di default nelle funzioni
/*
const bookings = [];

const createBooking = function(flightNum, numPassengers = 1, price = 999 * numPassengers) {
//nella versione ES5 per impoostare i parametri di default si faceva
//in questo modo, quindi una variabile se esisteva si dava il suo valore
//altrimenti in questo caso 1 di default. 
//	numPassengers = numPassengers || 1;
//	price = price || 999;
//Dalle versioni successive a ES5 basta dare i valori di 
//default direttamente dentro le tonde della funzione. Per impostare
//i valori di default si possono condizionare ad un altra variabile
//ad esempio price = 999 * numPassengers

	const booking = {
		flightNum,
		numPassengers,
		price
	}
	console.log(booking);
	bookings.push(booking);
};

createBooking("LH123");
createBooking("LH123", 2 , 800);
createBooking("LH123", 2);
createBooking("LH123", 5);
//se, ad esempio, voglio saltare una variabile basta usare undefined
//al posto del valore da assegnare a quella variabile

createBooking("LH123", undefined , 1000);
*/
//////////////////////////////////////////////////////////////////
//come funzionano gli argomenti passati in una funzione, valori vs 
//referenze
/*
const flight = "LH234";
const jonas = {
	name: "Jonas Schmedtmann",
	passport: 2345525324235
};
//creiamo una funzione di check-in

const checkIn = function(flightNum, passenger) {
	//ipotizziamo che numero del volo è cambiato e che vogliamo
	//camviare il nome di passenger 
	flightNum = "LH999";
	passenger.name = "Mr." + passenger.name;

	if (passenger.passport === 2345525324235) {
		alert("Checked in");
	} else {
		alert("Wrong passport!");
	}
};

//checkIn(flight, jonas);
//console.log(flight);//stamperà LH234 poichè essendo un primitivo 
//la funzione non fa altro che creare una copia di flight (flightNum)
//quindi flight rimane uguale
//console.log(jonas);//il nome dell'oggetto jonas invece cambia poichè
//la funzione crea una copia della referenza jonas (passenger), le quali
//puntano alla stessa cella di meoria heap, quindi ogni cambiamneto
//si riflette sull'oggetto jonas

//altro esempio cambio di passaporto prima del check-in
const newPassport = function(person) {
	person.passport = Math.trunc(Math.random() * 10000000000);
};

newPassport(jonas);
checkIn(flight, jonas);
//in altri linguaggi (tipo c++) si parla di passare un valore o una 
//referenza. In js invece non esiste il passaggio per referenza ma solo
//per valore. Quindi anche se si sta passando un oggetto alla funzione
//esso è sempre ritenuto un valore che presente nella heap memory
*/
///////////////////////////////////////////////////////////////////
//First-Class and Higher-Order Functions
/*
in js le funzioni tornano sempre un valore e per questo motivo
si dice che js tratta le funzioni come fossero di "prima classe"
essendo che ogni funzione torna un valore signfica che una funzione
può avere altre funzioni come parametro ma anche una funzione
può ritornare altre funzioni. Questi tipi di funzioni prendono
il nome di "funzione di ordine superiore" o "high-order function"
*/
///////////////////////////////////////////////////////////////////
//Funzioni che accettano altre funzioni in input
/*
const oneWord = function(str) {
	return str.replace(/ /g, "").toLowerCase();// / /g seleziona tutti gli underscores (_) della stringa
}; 

const upperFirstWord = function(str) {
	const [first, ...others] = str.split(" ");
	return [first.toUpperCase(), ...others].join(" ");	
}; 

//ora creiamo una funzione di ordine superiore
const transformer = function(str, fn) {
	console.log(`Original string: ${str}`);
	console.log(`Transformed string: ${fn(str)}`);
	
	console.log(`Transformed string: ${fn.name}`);//le funzioni
	//poichè sono uguali ad oggetti contengono proprietà
	//in questo caso name rappresenta il nome della funzione fn
	//passata come parametro
};

transformer("Javascript is the best!", upperFirstWord);//passiamo 
//solo il valore della funzione perchè sarà la funzione transformer
//che la chiamerà
transformer("Javascript is the best!", oneWord);
*/
/////////////////////////////////////////////////////////////////
//Funzioni che ritornano altre funzioni
/*
const greet = function(greeting) {
	return function(name) {
		console.log(`${greeting} ${name}`);
	}
};

const greeterHey = greet("Hey");
greeterHey("Jonas");
greeterHey("Steven");

//ovviamente possiamo chiamare entrambe le funzioni in una sola chiamata
greet("Hello")("Jonas");

//riscrivere la funzione greet con arrow function
const greet1 = greeting => name => console.log(`${greeting} ${name}`);

greet1("Ciao")("Sandro");
*/
//////////////////////////////////////////////////////////////////
//Metodi di funzioni
/*
const lufthansa = {
	airline: "Lufthansa",
	iataCode: "LH",
	bookings: [],
	//	book: function() {}
	book(flightNum, name) {
		console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`);
		this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
	}
}

lufthansa.book(239, "Jonas Schmedtmann");
lufthansa.book(635, "John Smith");

//dopo anni lufthansa crea una nuoova compagnia

const eurowings = {
	airline: "Eurowings",
	iataCode: "EW",
	bookings: []
}

//adesso supponiamo di voler prenotare un volo con eurowings e 
//per evitare di riscrivere lo stesso metodo book sull'oggetto eurowings
//creiamo una variabile book contenente la funzione book di lufthansa
const book = lufthansa.book;

//se adesso vado a chiamare nuovamente book() darà errore poichè
//la nuova variabile book non è la stessa della funzione lufhtansa
//poichè si è creato un nuovo oggetto che punta a book 

// book(23, "Sarah Williams");// essendo book undefined non appena
//alla riga 149 esegue this.airline, l'oggetto book è undefined
//e quindi da errore per poter far funzionare this, passando
//un oggetto esistono tre metodi di funzioni

//call() method

book.call(eurowings, 23, "Sarah Williams");//il primo argomento
//è l'oggetto così da far funzionare il this e gli altri due sono 
//gli altri valori flightNum, name
console.log(eurowings);

book.call(lufthansa, 239, "Mary Cooper");
console.log(lufthansa);

const swiss = {
	airline: "Swiss Air Lines",
	iataCode: "LX",
	bookings: []
}

book.call(swiss, 583, "Mary Cooper");
console.log(swiss);

//apply() method

//è uguale al metodo call con l'unica differenza che dopo
//il primo argomento accetta un array e non altri argomenti

const flightData = [583, "George Cooper"];
book.apply(swiss, flightData);
console.log(swiss);

//con il moderno js possiamo utilizzare lo stesso array per utilizzare
//il metodo call tramite lo spread operator
//book.call(swiss, ...flightData);

//bind() method è più importante di call() e apply()

//la differenza tra bind e gli altri due metodi è che quest'ultimo
//non chiama direttamente la funzione ma restituisce una nuova 
//funzione in cui verrà passata sempre la stessa this keyword

const bookEW = book.bind(eurowings);//quindi in questo caso
//bookEW è una nuova funzione in cui viene sempre passato 
//eurowings
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, "Steven Williams");

//come le keyword associate, si possono incastonare altri parametri

const bookEW23 = book.bind(eurowings, 23);//questo è un valore che
//contiene lo specifico volo EW23 di eurowings, quindi per completare
//la funzione book basterà aggiungere solo il nome del passeggero

bookEW23("Jonas Schmedtmann");
bookEW23("Martha Cooper");

//esempio con event listeners
//aggiungiamo delle proprietà all'oggetto lufthansa
lufthansa.planes = 300;
lufthansa.buyPlane = function() {
	console.log(this);

	this.planes++;
	console.log(this.planes);
}

document.querySelector(".buy").addEventListener("click", lufthansa.buyPlane.bind(lufthansa));

//esempio di applicazione parziale

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

//supponiamo di voler creare una unica funzione per calcolare l'iva
const addVAT = addTax.bind(null, 0.23);//in questo caso la this keyword 
//non ci interessa quindi la lasciamo a null, poi mettiamo il valore
//di percentuale dell'iva, questa è uguale a scrivere
//const addVAT = value => value + value * 0.23;

console.log(addVAT(100));
console.log(addVAT(23));

//riscrivere la funzione addVAT come funzione che restituisce un altra
//funzione

const addTax1 = function(rate) {
	return function(value) {
		return value + value * rate;
	}
};

const addVAT1 = addTax1(0.23);

console.log(addVAT1(100));
console.log(addVAT1(23));
*/
/////////////////////////////////////////////////////////////////
//Immediately invoked function expressions IIFE
/*
//in js si possono utilizzare delle funzioni che vengono usate
//una volta sola
const runOnce = function() {
	console.log("This will never run again");
};
runOnce();

//per rendere questa funzione una IIFE basta non assegnarla anessuna
//variabile e mettere tutto tra le () echiamarla direttamente
(function() {
	console.log("This will never run again");
})();

//ovviamente funzionerebbe anche per una funzione arrow
(() => console.log("This will ALSO never run again"))();
*/
/////////////////////////////////////////////////////////////////
//Closures

//le chiusure rappresentano il concetto più difficle in js
//bisogna sapere che non si dichiarano esplicitamente ma sì creano
//automaticamnete dipende dal contesto
const secureBooking = function() {
	let passengerCount = 0;

	return function() {
		passengerCount++;
		console.log(`${passengerCount} passengers`);
	}
};

const booker = secureBooking();

booker();//la funzione booker riesce a manipolare passengerCount
//nonostante non sia più presente nel contesto di esecuzione
booker();
booker();

//una chiusura è l'ambiente variabile chiuso del contesto di 
//esecuzione in cui è stata creata una funzione, 
//anche dopo che quel contesto di esecuzione è sparito

//in altre parole una chiusura dà a una funzione l'accesso a 
//tutte le variabili della sua funzione genitore, 
//anche dopo che è ritornata quella funzione genitore. 
//La funzione mantiene un riferimento al suo ambito esterno, anche 
//dopo che l'ambito esterno sia sparito e preserva la catena 
//dell'ambito nel tempo.

//possiamo effettuvamente vedere una closure utilizzanddo 
//la console e guardando dentro [[Scopes]]:
console.dir(booker);

//esempio 1 in cui si creano le chiusure
let f;

const g = function() {
	const a = 23;
	f = function() {
		console.log(a * 2);
	}
};

const h = function() {
	const b = 777;
	f = function() {
		console.log(b * 2);
	}
};
//dopo aver chiamato la funzione g()
g();
//si può chiamare la funzione f()
f();
//se invece si chiama direttamente la f() senza chiamare la g()
//darà errore che f non è definita
//supponiamo ora di creare unaltra funzione h in cui riassegnamo un 
//altro valore a f
h();
f();
//quindi questo dimostra che f può accedere alla b della funzione h
//poichè adesso si trova nel contesto della funzione h infatti 
console.dir(f);//vdremo in [[Scopes]]: che dentro closure ci sta
//la variabile b dichiarata dentro h

//esempio 2 in cui si creano le chiusure, in cui dimostriamo che
//le variabili presenti nella chiusura hanno la precedenza su altre
//vatiabili dichiarate nell'ambito globale
const boardPassengers = function(n, wait) {
	const perGroup = n / 3;
	//adesso creiamo un timer con il metodo setTimeout(), in cui
	//il primo parametro rappresenta ciòche si vuol fare, e dopo 
	//si scrivono i millisecondi
	setTimeout(function() {
		console.log(`We are now boarding all ${n} passengers`)
		console.log(`There are 3 groups, each with ${perGroup} passengers`)
	}, wait * 1000);//quindi in questo caso tutto 
	//ciò che avviene all'interno della funzione si eseguirà dopo
	//1 secondo

	console.log(`Will start boarding in ${wait} seconds`);
};

//setTimeout(function(){
//	console.log("Timer")
//}, 1000);
//adesso qui creiamo una variabile perGroup
const perGroup = 1000;
boardPassengers(180, 3);