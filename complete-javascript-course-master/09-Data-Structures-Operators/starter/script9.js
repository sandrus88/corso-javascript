'use strict';

// Data needed for a later exercise
const flights =
	'_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun",];

const openingHours = {
	[weekdays[3]]: {
		open: 12,
		close: 22,
	},
	[weekdays[4]]: {
		open: 11,
		close: 23,
	},
	[weekdays[5]]: {
		open: 0, // Open 24 hours
		close: 24,
	}
}
const restaurant = {
	name: 'Classico Italiano',
	location: 'Via Angelo Tavanti 23, Firenze, Italy',
	categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
	starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
	mainMenu: ['Pizza', 'Pasta', 'Risotto'],

	order(starterIndex, mainIndex) {
		return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
	},

	orderDelivery({ starterIndex, mainIndex, time, address }) {
		console.log(`Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`);
	},

	orderPasta(ing1, ing2, ing3) {
		console.log(`Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`);
	},

	orderPizza(mainIngredient, ...otherIngredients) {
		console.log(mainIngredient);
		console.log(otherIngredients);
	},

	openingHours
};

//Destrutturazione di arrays
//per recuperare dei singoli dati da un array per adesso farei cosi
/*
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

//con le destrutturazione presente nel moderno js posso farlo cosi

const [x, y, z] = arr;
console.log(x, y, z);

//per prendere degli elementi dagli array dell'oggetto restaurant si farà cosi

//const [first, second] = restaurant.categories;
//console.log(first, second);

//se volessimo prendere solo il primo e il terzo elemento basta lasciare 
//un "buco" nella dichiarazione

let [first, , second] = restaurant.categories;
console.log(first, second);

//mettiamo caso che il ristorante voglia scambiare la prima categoria 
//con la terza

[first, second] = [second, first];
console.log(first, second);

//aggiungiamo una funzione che ritorni un array contenente un elemento
//dell'array starterMenu e uno di mainMenu

const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

//se c'è un array annidato

const nested = [2, 4, [5, 6]];
//const [i, , j] = nested;
//console.log(i, j);

//e volessimo ottenere anche i singoli elementi dell'array annidato
//si può fare con la destrutturazione della destrutturazione
const [i, , [j, k]] = nested;
console.log(i, j, k);

//con la destrutturazione si possono assegnare anche valori di default
//agli elementi, nel caso in cui non si sappia la lunghezza dell'array
//proviamo ad estrarre 3 elementi da un array [8, 9] (facendo finta che 
//non si sapesse che ha solo due elementi), cosi facendo leggerebbe 8, 9
// e undefinded
//const [p, q, r] = [8, 9];
//console.log(p, q, r);

//per assegnare i valori di default basta metterli tutti = 1
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);
//cosi facendo p = 8, q = 9 e r = 1
*/
////////////////////////////////////////////////////////////////////////
//Destrutturazione di oggetti
//per destrutturare gli oggetti siusanole {} e si danno i nomi delle varaibili
//uguali al nome dellecategorie dell'oggetto
/*
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

//se volessimo cambiare il nome delle proprietà

const { name: restaurantName, openingHours: hours, categories: tags } = restaurant;
console.log(restaurantName, hours, tags);

//nel caso di prendere dati da un oggetto di una API e non si conoscono
//le categorie dell'oggetto stesso, può essere utile impostare dei valori di default
//(come si è visto per gli array), ad esempio vogliamo prendere un valore
//menu che non è presente nell'oggetto restaurant

const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

//se si vuole riassegnare valori a delle variabili con i valori delle
//proprietà di un oggetto utilizzando la destrutturazione

let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };
//mettendo direttamente le {} js darà un errore poichè un oggetto deve
//essere prima dichiarato, per superare l'errore il trucco è mettere tutto
//tra le ()
({ a, b } = obj);
console.log(a, b);

//in caso di oggetti annidati 
const { fri: { open, close } } = openingHours;
console.log(open, close);

const { fri: { open: o, close: c } } = openingHours;
console.log(o, c);

//adesso vediamo una funzione in cui si passa un oggetto destrutturato e stampa 
//una stringa con i valori delle proprietà dell'oggetto stesso

restaurant.orderDelivery({
	time: "22:30",
	address: "Via del Sole, 21",
	mainIndex: 2,
	starterIndex: 2
});
*/
///////////////////////////////////////////////////////////////////////
// The spread operator (...)
//nel caso si volesse aggiungere qualche valore ad un array
/*
const arr = [7, 8, 9];
//con le conoscenze di ora farei un nuovo array aggiungendo i valori 
//singoli di arr scrivendoli manualmente oppure facendo un ciclo loop su
//arr e man man utilizzare il metodo push ad ogni iterazione

const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);

//con lo spread operator diverrebbe cosi

const newArr = [1, 2, ...arr];
console.log(newArr);

//quindi sostanzialmente con lo spread operator si possono ottenere i
//singoli elementi dell'array passato dopo ...
console.log(...newArr);

//supponiamo di voler creare un nuovo menu del ristorante
const newMenu = [...restaurant.mainMenu, "Gnocchi"];
console.log(newMenu);

//creare un array copia
const mainMenuCopy = [...restaurant.mainMenu];

//unire due array
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

//lo spread operator è utilizzabile du tutti gli elementi iterabili di
//js (arrays, strings, maps, sets) ma non sugli oggetti

const str = "Jonas";
const letters = [...str, "", "S."];
console.log(letters);
console.log(...str);

//adesso creiamo una funzione nell'oggetto restaurant con cui si ordina
//solo la pasta
//const ingredients = [prompt("Let's make pasta! Ingredient 1?"), prompt("Ingredient 2?"), prompt("Ingredient 3?")];
//console.log(ingredients);

//restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
//restaurant.orderPasta(...ingredients);

//da js 2018 si può utilizzare lo spread operator anche sugli oggetti

const newRestaurant = { foundedIn: 1998, ...restaurant, founder: "Giuseppe" };
console.log(newRestaurant);

const restaurantCopy = {...restaurant};
restaurantCopy.name = "Ristorante Roma";
console.log(restaurantCopy.name);
console.log(restaurant.name);
*/
///////////////////////////////////////////////////////////////////////
// Rest pattern and parameters
//rest operator ha la stessa sintassi dello spread operator (...) e indica
//in fase di destrutturazione il resto di un array, mentre lo spread decomprime un array
//(da un array di dati si ottengono i singoli elementi dell'array), il rest
//comprime dei dati valori in un array
/*
//spread operator perchè è alla destra di =
const arr = [1, 2, ...[3, 4]];

//rest operator perchè è alla sinistra di =
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);

//nell'esempio del ristorante voglio avere tutto il menu utilizzando 
//rest operator

const [pizza, , risotto, ...otherFood] = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(pizza, risotto, otherFood);

//ovviamente il rest operator va utilizzato come ultimo elemento perchè
//se vado ad aggiungere alla fine pasta, che ho saltato, mi darà errore
//quindi seleziona tutti gli elementi da risotto in poi

//operatore rest sugli oggetti
//ad esempio vogliamo selezionare solo il sabato in un oggetto come 
//giorni festivi e il resto come giorni feriali
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

//operatore rest sulle funzioni
const add = function(...numbers) {
	let sum = 0;
	for(let i = 0; i < numbers.length; i++) sum += numbers[i];
	console.log(sum);
};

add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);

const x = [23, 5, 7];
add(...x);

//aggiungiamo un altro metodo al nostro oggetto ristorante per ordinare 
//la pizza

restaurant.orderPizza("mushrooms", "onion", "olives", "spinach");
restaurant.orderPizza("mushrooms");

//per concludere rest lo utilizziamo per definire più variabili seguiti dalla virgola
//mentre lo spread si utilizza per più valori seguiti dalle virgole
*/
///////////////////////////////////////////////////////////////////////
//Short circuiting && and ||
//possono essere utilizzati anche con valori non booleani
//in un confronto con || se il primo valore è un valore vero salterà direttamente
//l'altro, altrimenti se troverà sempre valori falsi si fermerà non appena
//troverà un valore vero, oppure finchè finisce il confronto e, in questo
//caso darà l'ultimo valore ottenuto
/*
console.log("------ OR ------");

console.log(3 || "Jonas");//qui darà 3
console.log("" || "Jonas");//qui darà Jonas perchè "" da false
console.log(true || 0);//qui darà true
console.log(undefined || null);//qui darà null perchè undefined è false 
//e quindi restituisce l'altro valore del confronto che se null da false
console.log(undefined || 0 || "" || "Hello" || 23 || null);//qui darà 
//Hello perchè i primi tre sono tutti false

restaurant.numGuests = 23;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

const guests2 = restaurant.numGuests || 10;
console.log(guests2);

console.log("------ AND ------");
//l'operatore and funziona al contrario di or, ovvero restituisce subito
//il valore non appena è falso senza verificare l'altro o gli altri valori

console.log(0 && "Jonas");//qui darà 0
console.log(7 && "Jonas");//qui darà Jonas perchè 7 è vero quindi va al
//prossimo, Jonas è pure vero ma non essendoci altri valori da confrontare
//restituisce Jonas

console.log("Hello" && 23 && null && "jonas");

if(restaurant.orderPizza) {
	restaurant.orderPizza("mushrooms", "spinach");
}
//questa possiamo scriverla anche cosi

restaurant.orderPizza && restaurant.orderPizza("mushrooms", "spinach");
*/
///////////////////////////////////////////////////////////////////////
//The nullish coalescing operator ??
//poichè il valore 0 è un valore false nell'eesempio del ||
/*
restaurant.numGuests = 0; //se diamo 0 

const guests = restaurant.numGuests || 10;
console.log(guests);// qui stamperà 10 poichè 0 è false

//per ovviare a questo problema esiste l'opertaore ?? il quale non fa 
//altro che paragonare gli elementi ma solo tramite valori nulli (quindi
//o null o undefined)

const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);// in questo caso stamperà 0
*/
///////////////////////////////////////////////////////////////////////
//Logical assignements operators
/*
//OR assignement operator ||=
const rest1 = {
	name: "Capri",
//	numGuests: 20
	numGuests: 0
};

const rest2 = {
	name: "La Piazza",
	owner: "Giovanni Rossi"
};

//rest1.numGuests = rest1.numGuests || 10;
//rest2.numGuests = rest2.numGuests || 10;
//queste due si possono scrivere anche
//rest1.numGuests ||= 10;
//rest2.numGuests ||= 10;
//ma nel caso a numGuests assegniamo 0 i due oggetti avranno comevalore
//di numGuests = 10 poichè || confronta solo valori veri o falsi e 0
//da sempre false, in questo caso 

//nullish assignement operator ??=
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

//AND assignement operator &&=
rest1.owner &&= "<ANONYMOUS>";
rest2.owner &&= "<ANONYMOUS>";
console.log(rest1);
console.log(rest2);
*/
////////////////////////////////////////////////////////////
//The for-of Loop
/*
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

for(const item of menu) console.log(item);
//per ottenere l'indice dell'iterazione con il ciclo for-of
//è un pò più complicato ma basta iterare non l'array ma il metodo
//entries(), cosi facendo creerà per ogni elemento 
//un array contenente l'indice dell'elemento iterato e 
//l'elemento stesso

for(const item of menu.entries()) {
	console.log(item);	
}

//utilizzando le cose imparate adesso possiamo destrutturare
//item cosi da ottenere una lista di elementi con indice
for(const [i, el] of menu.entries()) {
	console.log(`${i + 1}: ${el}`);	
}
*/
////////////////////////////////////////////////////////////
//Enhanced object literals
/*
//1) dalla versione es06 di js ci sono alcune scorciatoie per la
//scrittura di oggetti supponiamo di avere il nostro oggetto
//restaurant e supponiamo che l'oggetto openingHours sia al 
//di fuori di restaurant
//2) le funzioni all'interno di un oggeto possono essere 
//chiamate semplicemente dando il nome seguito da () {}
//3) ad esempio in openingHours per evitare di scrivere tutti
//i giorni della settimana manualmente si può creare un array
//con i giorni della settimana e dopo dichiarare direttamente
//la posizione dentro dell'array del giorno corrispondente

const weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun",];

const openingHours = {
	[weekdays[3]]: {
		open: 12,
		close: 22,
	},
	[weekdays[4]]: {
		open: 11,
		close: 23,
	},
	[weekdays[5]]: {
		open: 0, // Open 24 hours
		close: 24,
	}
}

const restaurant2 = {
	name: 'Classico Italiano',
	location: 'Via Angelo Tavanti 23, Firenze, Italy',
	categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
	starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
	mainMenu: ['Pizza', 'Pasta', 'Risotto'],

	order(starterIndex, mainIndex) {
		return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
	},

	orderDelivery({ starterIndex, mainIndex, time, address }) {
		console.log(`Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`);
	},

	orderPasta(ing1, ing2, ing3) {
		console.log(`Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`);
	},

	orderPizza(mainIngredient, ...otherIngredients) {
		console.log(mainIngredient);
		console.log(otherIngredients);
	},

	//prima di es06 per chiamare l'oggetto openingHours
	//qui all'interno si faceva cosi
	//openingHours: openingHours
	//ma dalla versione es06 basta semplicemente chiamarlo
	//e js lo risconosce 
	openingHours
};
*/
////////////////////////////////////////////////////////////
//Optional chaining (?.)
/*
//in js sappiamo che se chiamiamo una proprietà di un oggetto che è 
//undefined darà errore, ad esempio se vogliamo se il ristorante
//è aperto il lunedi (non esiste) 

//console.log(restaurant.openingHours.mon.open);// da errore
//quindi con le conoscenze attuali fareiun if per verificare se 
//esiste o meno
//if (restaurant.openingHours.mon) console.log(restaurant.openingHours.mon.open);

//con l'operatore di concatenamento opzionale (?.) posso
//verificare nella stessa linea se esiste o meno 
//se verfica l'esistenza darà il risultao altrimenti
//darà undefined senza andare in errore

console.log(restaurant.openingHours.mon?.open);
//se si volessero verificare più condizioni 

console.log(restaurant.openingHours?.mon?.open);
console.log(restaurant.openingHours.fri?.open);

//esempio pratico, voglio sapere in quali giorni il ristorante
//è aperto o chiusp
const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun",];

for(const day of days) {
	const open = restaurant.openingHours[day]?.open ?? "closed";
	console.log(`On ${day}, we open at ${open}`);
	
}

//l'operatore ?. funziona anche con i metodi
console.log(restaurant.order?.(0, 1) ?? "Method does not exist");
console.log(restaurant.orderRisotto?.(0, 1) ?? "Method does not exist");

//l'operatore ?. funziona anche con gli array
const users = [{name: "Jonas", email: "hello@jonas.io"}];

console.log(users[0]?.name ?? "User array empty");
*/
/////////////////////////////////////////////////////////////
//Looping objects: object keys, values and entries
/*
//si possono iterare anche gli oggetti. Esistono tre modi,
//dipende da cosa vogliamo iterare, si possono iterare i nomi
//delle proprietà (o chiavi), oppure i valori delle proprietà o entrambi
//questi tre metodi che andremo a vedere trasformano l'oggetto
//in un array, quindi itereremo non l'oggetto direttamente.

//nome delle proprietà dell'oggetto passato
const properties =  Object.keys(openingHours);
console.log(properties);

//stampiamo quanti giorni apre il ristorante
console.log(`We are open on ${properties.length} days`);

let openStr = `We are open on ${properties.length} days: `;
for(const day of properties) {
	openStr += `${day}, `;
}
console.log(openStr);

//valore delle proprietà dell'oggetto passato
const values =  Object.values(openingHours);
console.log(values);

//nome e valore delle proprietà
const entries =  Object.entries(openingHours);
console.log(entries);

//adesso vogliamo stampare una stringa con gli orari di 
//apertura e chiusura dei giorni di lavoro
//poichè entries diventa un array con all'interno altri 
//array contenenti due valori (opene e close), si può iterarare
//con la destrutturazione 
for(const [day, {open, close}] of entries) {
	console.log(`On ${day} we open at ${open} and close at ${close}`);
}
*/
/////////////////////////////////////////////////////////////////
//Sets
/*
//set è una struttura di dati univoci, ciò significa un set non 
//può mai avere un duplicato. Per creare un set si usa la keyword new
//seguita da Set(array)
const ordersSet = new Set(["Pasta", "Pizza", "Pizza", "Risotto", "Pasta", "Pizza"]);
console.log(ordersSet);//sulla stampa si creerà un oggetto con soli 
//3 elementi poichè i "doppioni" sono scomparsi
//un set può sembrare uguale ad un array le uniche differenze sono
//1) un set non puà avere duplicati
//2) l'ordine del set è irrilevante
//se si passa una stringa (poichè anche la stringa è iterabile)
console.log(new Set("Jonas"));//si otterrà un oggetto con le singole lettere della stringa
console.log(ordersSet.size);//si ottiene la lunghezza del set
console.log(ordersSet.has("Pizza"));//has è un metodo che indica se è presente l'elemento passato o meno 
console.log(ordersSet.has("Bread"));
ordersSet.add("Garlic Bread");//aggiunge un elemento
ordersSet.delete("Risotto");//elimina un elemento
//ordersSet.clear();//elimina tutti gli elementi
console.log(ordersSet);
//il set è una struttura iterabile
for(const order of ordersSet) console.log(order); 

//Esempio vogliamo creare un array dello staff di un ristorante
//che non ha doppioni
const staff = ["Waiter", "Chef", "Waiter", "Manager", "Chef", "Waiter"];
//dato l'array staff basta creare un set dello staff e usare lo spread operator
const staffUnique = [...new Set(staff)];
console.log(staffUnique);
*/
//////////////////////////////////////////////////////////////////
//Maps fundamentals
/*
//le mappe sono delle strutture dati che contengono elementi
//che vengono archiviati in coppie chiave-valore.
//sono simili agli oggetti con l'unica differenza che negli 
//oggetti le chiavi sono essenzailmente stringhe, mentre nelle mappe
//potrebbero essere anche oggetti, mappe, o array
//il modo migliore per scrivere una mappa e non inizializzarla
//per poi riempirla dopo col metodo set(). la chiamata al metodo
//set() ritorna tutta la mappa creata
const rest = new Map();
rest.set("name", "Classico Italiano");
rest.set(1, "Firenze, Italy");
//ad esempio se provo a stampare qui il metodo set
console.log(rest.set(2, "Lisbon, Portugal"));//stamprà tutta la mappa creata
//ecco perchè di solito si usa il metodo set più volte
rest.set("categories", ['Italian', 'Pizzeria', 'Vegetarian', 'Organic']).set("open", 11).set("close", 23).set(true, "We are open :D").set(false, "We are closed :(");
console.log(rest.get("name"));//il metodo get restituisce il valore della chiave passata
console.log(rest.get(true));
console.log(rest.get(1));

console.log(rest.has("categories"));//ritorna true o false dipende dalla presenza o meno della chaive passata
rest.delete(2);//elimina la chiave se è presente
//rest.clear();//elimina tutti gli elementi della mappa
console.log(rest);
console.log(rest.size);//ritorna la lunghezza della mappa

rest.set([1, 2], "Test");
console.log(rest);
//se volessi recuperare il valore Test facendo cosi
console.log(rest.get([1, 2]));//darà undefined poichè [1, 2] non punta all'array [1, 2] della mappa
//poichè sono diversi quindi si immagazzina in una variabile
const arr = [1, 2];
rest.set(arr, "Test");
console.log(rest.get(arr));//ora darà Test

//le chiavi possono essere oggetti e questo può essere molto utile
//quando dobbiamo prendere elementi dal DOM
rest.set(document.querySelector("h1"), "Heading");
console.log(rest);
*/
//////////////////////////////////////////////////////////////////
//Maps iteration
/*
//esiste un altro modo per popolare le mappe senza l'utilizzo di set
//ed è quello di passare alla mappa un array con all'interno deiversi array
//ognuno di questo conterrà due elementi, il primo è la chiave e il
//secondo è il valore
const question = new Map([
	["question", "What is the best programming language in the world?"],
	[1, "C"],
	[2, "Java"],
	[3, "Javascript"],
	["correct", 3],
	[true, "Correct"],
	[false, "Try again!"],		
]);
console.log(question);
//questa struttura ricorda le entries delmetodo Object
//quindi è facile convertire un oggetto in una mappa
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

//Quiz app
console.log(question.get("question"));
for(const [key, value] of question) {
	if(typeof key === "number") console.log(`Answer ${key}: ${value}`);
}
//per ottenere la risposta dell'utente
const answer = Number(prompt("Your answer"));
console.log(answer);

console.log(question.get(question.get("correct") === answer));

//per convertire una mappa in un array
console.log([...question]);
*/
//////////////////////////////////////////////////////////////////
//Working with strings
/*
const airline = "TAP Air Portugal";
const plane = "A320";
//come per gli array anche nell stringhe si può ottenere ogni lettere
//tramite la posizione

console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
//lo si può ottenere passando la stringa direttamente 
console.log("B737"[0]);

//si può ottenere la lunghezza della stringa
console.log(airline.length);
console.log("B737".length);

//si puè estrarre l'indice di ogni lettera
console.log(airline.indexOf("r"));//questo restituisce la prima r che
//si incontra, se invece volessimo ottenere l'ultima r (se presente)
console.log(airline.lastIndexOf("r"));
//un caso d'uso utile per manipolare gli indici di una stringa
//può essere l'estrazione parziale di una stringa tramite il metodo
//slice()
console.log(airline.slice(4));//stampa una nuova stringa dalla posizione 4
console.log(airline.slice(4, 7));//stampa una nuova stringa compresa tra la posizione 4 e la 7(esclusa)

console.log(airline.slice(0, airline.indexOf(" ")));
console.log(airline.slice(airline.lastIndexOf(" ") + 1));
//mettendo un indice negativo estrarrà dalla fine della stringa
//verso l'inizio ad esempio
console.log(airline.slice(-2));//stampa una nuova stringa al
console.log(airline.slice(-8));//stampa una nuova stringa Portugal
console.log(airline.slice(0, -1));
console.log(airline.slice(2, -2));

//creo una funzione in cui passto un posto a sedere in aereo
//verifico se è un posto che sta in mezzo o no
const checkMiddleSeat = function(seat) {
	//B e E sono i posti in mezzo
	const s = seat.slice(-1);//è una stringa contenente l'ultima lettera
	if (s === "B" || s === "E") console.log("You got the middle seat");
	else console.log("You got lucky");
};

checkMiddleSeat("11B");
checkMiddleSeat("23C");
checkMiddleSeat("3E");

console.log(airline.toLowerCase());//stampa una nuova stringa tutta i minuscolo
console.log(airline.toUpperCase());//stampa una nuova stringa tutta i maiuscolo

//esempio di correggere una stringa scritta errata
const capitalization = function(string) {
	//primo passo è rendere tutto in minuscolo
	const passengerLower = string.toLowerCase();
	const passengerCorrect = passengerLower[0].toUpperCase().concat(passengerLower.slice(1));
	console.log(passengerCorrect);
};
capitalization("jOnAS");

//esempio sul confronto di email 
const email = "hello@jonas.io";
const loginEmail = "  Hello@Jonas.Io \n";

//const lowerEmail = loginEmail.toLowerCase();
//const trimmedEmail = lowerEmail.trim();//elimina gli spazi vuoti
//console.log(trimmedEmail);

//si può evitare di creare due variabili lowerEmail e trimmedEmail
// per normalizzare la stringa
const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail);

//sostituire una stringa
const priceGB = "288,97£"
const priceUS = priceGB.replace("£", "$").replace(",", ".");
console.log(priceUS);

const announcement = "All passengers come to boarding door 23. Boarding door 23!"

console.log(announcement.replace("door", "gate"));//replace sosituisce solo una parola
//se si vuole sosituire tutte la parole passate come parametro e
//presenti nella stringa si usa replaceAll 
console.log(announcement.replaceAll("door", "gate"));

//metodi che restituiscono booleans
const plane1 = "A320neo";
console.log(plane1.includes("A320"));
console.log(plane1.includes("Boeing"));

console.log(plane1.startsWith("Air"));
console.log(plane1.startsWith("A3"));

console.log(plane1.endsWith("Air"));
console.log(plane1.endsWith("neo"));

//esempio vedere se i bagagli possono fare il check-in
const checkBaggage = function(items) {
	const baggage = items.toLowerCase();
	if(baggage.includes("knife") || baggage.includes("gun")) {
		console.log("You are NOT  allowed on board");
	} else {
		console.log("Welcome on aboard!");
	}
};

checkBaggage("I have a laptop, some Food an a pocket Knife");
checkBaggage("Socks and camera");
checkBaggage("Got some snacks and a gun for protection");

//il metodo più potente delle stringhe è sicuramente split()
//che consente di dividere una stringa in più stringhe, divise 
//da una stringa "divisoria", il metodo split ritorna un array 
//contenetente le stringhe divise

console.log("a+very+nice+string".split("+"));
console.log("Jonas Schmedtmann".split(" "));

const [firstName, lastName] = "Jonas Schmedtmann".split(" ");
//adesso vogliamo rendere il cognome maiuscolo e aggiungere 
//la string Mr.

const newName = ["Mr.", firstName, lastName.toUpperCase()].join(" ");
console.log(newName);

const capitalizeName = function(name) {
	const names = name.split(" ");
	const namesUpper = [];
	for(const n of names) {
//		namesUpper.push(n[0].toUpperCase() + n.slice(1));
		namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
	}
	console.log(namesUpper.join(" "));
};

capitalizeName("jessica ann smith davis");
capitalizeName("jonas schmedtmann");

//imbottire una stringa
const message = "Go to gate 23";
console.log(message.padStart(20, "+"));//con questo metodo
//possiamo rendere una stringa più lunga partendo dall'inizio e 
//riempirl con la stringa passata come parametro, quindi in 
//questo caso, stamperà una nuova stringa con 12 + all'inizio più
//la stringa message 
console.log("Jonas".padStart(20, "+"));

console.log(message.padEnd(20, "+"));
console.log(message.padStart(20, "+").padEnd(30, "+"));//in questo caso
//poichè la lunghezza è stata già dichiarata con padStart, il secondo metodo
//padEnd parte da una lunghezza di 20 quindi arriva fino a 30 aggiunngendo
//alla fine 10 +

//esempio generalmente in rete quando si visualizza il numero di 
//una carta di credito si vedono le ultime 4 cifre precedute da
//dei simboli, vogliamo ricreare questo
const maskCreditCard = function(number) {
	const str = number + "";
	const last = str.slice(-4);//con questo prendiamo le ultime quattro cifre
	return last.padStart(str.length, "*");
};

console.log(maskCreditCard(43378463864647384));
console.log(maskCreditCard("346553245324576635"));

//metodo repeat() permette di ripetere più volte una stringa
const message2 = "Bad weather... All Departures Delayed...";
console.log(message2.repeat(5));

const planesInLine = function(n) {
	console.log(`There are ${n} planes in line ${"plane".repeat(n)}`);
};

planesInLine(5);
planesInLine(3);
planesInLine(12);
*/
/////////////////////////////////////////////////////////////////
