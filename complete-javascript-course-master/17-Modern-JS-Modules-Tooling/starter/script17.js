//per lavorare con i moduli non importa usare ue strict poichè è 
//inlcuso

//Exporting and Importing in ES6 Modules
//per importare un modulo basta creare un nuoivo file js

//importing module
//per importare si utilizza la keyword import segtuia dal percorso
//del file da importare, funziona siacon l'estensione .js che senza
//inoltre si deve aggiungere l'attributo type module al file html.
//Adesso per importare le variabili espirtate da un altro modulo si
//aggiune dopo import il nome della variabile {tra le graffe} e 
//poi from seguito dal path del file dove si trova la variabile.
//Ovviamnete possiamo cambiare il nome delle variabili utilizzando
//la keyword as.
//Se ad esmpio vogliamo importare tutto contempornaemante si utilizza
//la keyword import seguita da * as e aggiungere un nome come se fosse
//una classe from path file da importare.
//import { addToCart, totalPrice as price, tq } from "./shoppingCart.js"

//addToCart("bread", 5);
//console.log(price, tq);

console.log("importing module");
//import * as ShoppingCart from "./shoppingCart.js";
//ShoppingCart.addToCart("bread", 5);
//console.log(ShoppingCart.totalPrice);

//per importare in maniera dafault basta utlizzare import seguito
//da un nome da attribuire alle variabili da importare 
import addExpense, { cart } from "./shoppingCart.js";
addExpense("pizza", 2);
addExpense("bread", 5);
addExpense("apples", 2);

//se andiamo a stanmpare l'array che nel file shoppingCart era vuoto
//ci renderemo conto che adesso contiene dei dati poichè se si importa
//una variabile da un altro modulo essa non è una semplice copia
//ma rappresenta lo stessa variabile che ocuupa lo stesso psoto in 
//memoria, quindi se si modifica qui lo si trasmetterà anche di la
 
console.log(cart);

///////////////////////////////////////////////////////////////////
//Top-Level await (ES2022)
/*
//dalla versione ES2022 si può utilizzare la keyword await al di fuori
//delle funzione asincrone, almeno nei moduli

//console.log("Start fetching"); 
//const res = await fetch("https://jsonplaceholder.typicode.com/posts");
//const data = await res.json();
//console.log(data);
//ovviamnete usando await nei moduli esso blocca l'esecuzione finchè
//non si fectheranno tutti i dati di questo modulo
//console.log("End fetching"); 

//l'utilizzo di await nei moduli può tornare utile in piccoli progetti
//ma in randi proetti potrebbe risultare dannoso

//adesso creiamo una situazione più realistcia ovvero restituire alcuni
//dati da una funzione asincrona, quindi supponiamo di vcreare una
//funzione che fectha dei dati e ritorna solo l'ultimo dato
import add, { cart } from "./shoppingCart.js";
add("pizza", 2);
add("bread", 5);
add("apples", 2);

console.log(cart);

const getLastPost = async function() {
	const res = await fetch("https://jsonplaceholder.typicode.com/posts");
	const data = await res.json();
	
	return {
		title: data.at(-1).title,
		text: data.at(-1).body,
	}
};

//il valore ritornato non sarà l'oggetto della funzione ma una Promise
//poichè tutte le funzioni asincrone ritornano uns Promise
const lastPost = getLastPost();
console.log(lastPost);

//quindi possiamo utilizzare il metodo then ma risulterebbe brutto 
//lastPost.then(last => console.log(last));

//ecco quindi che utilizziamo await furori dalla funzione asincrona
const lastPostAwait = await getLastPost();
console.log(lastPostAwait);

//supponiamo di importare un modulo che contiene un codice bloccante
//contenetre await. Il modulo importatore eseguirà il suo codice
//bloccante solo dopo che si eseguirà il codice bloccante dell'altro
//modulo
*/
///////////////////////////////////////////////////////////////////
//The Module Pattern
/*
//prima dei ES6 modules per creare moduli si utilizzavano le IIFE funcions
//poichè ogni funzione all'interno contiene dati privati e lo scopo
//di utilizzare le IIFE era appunto che una volta creata la funzione
//essa si esegue una sola volta e ritorna un oggetto contenetnet
//i dati che vogliamo riutilizzare

const ShoppingCart2 = (function() {
	const cart = [];
	const shippingCost = 10;
	const totalPrice = 237;
	const totalQuantity = 23;
	const addToCart = function(product, quantity) {
		cart.push({ product, quantity });
		console.log(`${quantity} ${product} added to cart (shipping cost is ${shippingCost})`);
	};

	const orderStock = function(product, quantity) {
		console.log(`${quantity} ${product} ordered from supplier`);
	};
	
	return {
		addToCart,
		cart,
		totalPrice,
		totalQuantity,
	};
})();

ShoppingCart2.addToCart("apple", 4);
ShoppingCart2.addToCart("pizza", 2);
console.log(ShoppingCart2);

//se ad esmpio vogliamo accedere alla variabile shippingCost che non
//èpresente nell'oggetto ShoppingCart2 esso darà undefined
console.log(ShoppingCart2.shippingCost);

//ma se volessimo accedervi si può poichè tramite le closure,
//in una funzione si può accedere a tutti i suoi dati purchè siano
//creati all'9interno della funzione stessa. supponimao di aggiungere
//alla funzione addToCart un pezzo di stringa contenetete il valore
//di shippingCost, che non è presente nell'oggetto ritornato
*/
//////////////////////////////////////////////////////////////////
//CommonJS Modules
/*
//in passato, oltre al module pattern per creare moduli si utlizzavano
//tabto anche i commonjs modules, i quali viaggiano solo in node.js
//e non sul browser. 
//Nei commonjs ogni modulo rappresenta un file per esrprtare si fa 
//cposi

//export
export.addToCart = function(product, quantity) {
	cart.push({ product, quantity });
	console.log(`${quantity} ${product} added to cart (shipping cost is ${shippingCost})`);
};

//import
const { addToCart } = require("./shoppingCart.js");
*/
//////////////////////////////////////////////////////////////////
//Introduction to NPM

//npm è un sofwtare per js che serve per raggruppare package e 
//dipendenze. Esso serve perchè, prima della sua invenzione,
//per includere librerie esterne si crevano gli script direttamente
//sul file html (un pò come si è fatto nel progetto mapty per 
//includere leaflet).
//dopo aver ibstallato npm, per inizializzarlo in un progetto
//bisgona digitare npm init, non appena termina l'esecuzine npm
//creerà al'interno del proetto un file json.
//adesso installiamo la libreria leaflet ma utilizzando npm,
//digitando npm install leaflet. Terminata l'innstallazione
//npm aggiungerà nel json tra le dipendenze questa librerai con 
//la versione aggiornata, e creeera nel progetto una cartella
//node_modules con all'interno tutte le lubrerie che si andranno a
//creare.
//Adesso intslliamo una delle più popoilari librerie di js che è
//Lodash, che è una collezione di metodi utili per l'utlizzo di 
//array, mappe, date etc. Per installarlo digita 
//npm install --save lodash-es, alla fine npm aggiungerà anche questa
//tra le dipendenze e dentro la cartella node_modules
//adesso utilizziamo un metodo della libreria lodash che serve
//per clonare un oggetto

//import cloneDeep from "./node_modules/lodash-es/cloneDeep.js";
import cloneDeep from "lodash-es";

const state = {
	cart: [{product: "bread", quantity: 5},
	{product: "pizza", quantity: 5},],
	user: {loggedIn: true},
};

//fino ad ora per clonare un oggetto si faceva cosi
const stateClone = Object.assign({}, state);
console.log(stateClone);

//tuttavia se si volesse cambiare un oggetto annidato in state
//state.user.loggedIn = false;

//questo si ripercuote anche in stateClone, dimostrando che non siamo
//di fronte ad un vero clone, e per farlo si impiegherebbe tanto 
//lavoro. Con il metodo deepClone invece di Lodash

const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false;
console.log(stateDeepClone);

//supponiamo di voler condividere il progetto con un altro sviluppatore
//oppure pubblicarlo su git, è buona norma non incliudere mai la 
//cartella node_modules perchè appesentirebbe tanto il progetto
//rallentando la velocità di esecuzione, ecco che quindi 
//essendo stato creato il json e tra le dipendenze ci sono queste
//librerie, basta basta riutilizzare npm e digitando
//npm install esso recupererà queste dal json

//////////////////////////////////////////////////////////////////
//Bundling With Parcel and NPM Scripts

//per utilizzare al meglio npm e i moduli è utile creare un bundler
//di moduli affinchè non ci sia bisogno di importarli singolarmente
//per ogni modulo, ecco che allora utilizziamo Parcel che è un 
//bundler di moduli.
//per installarlo digita npm install parcel --save-dev, alla fine
//dell'installazione npm registrerà parcel tra le devDependencies.
//l'obiettivo di questa lezione è impacchettare i moduli script17.js
//cloneDeep.js e shoppingCart.js
//per lanciare Parcel ci sono due modi 

//1) digitare npx parcel index.html

//Parcel sostanzialmente crea all'interno del progetto una cartella
//dist con all'interno delle copie di files. Per la produzione
//invieremo questa cartella

//se dovessimo cambuare qualcosa al modulo ogni volta che si ricarica
//la pagina, il cambiamento si vedrà anche nel browser.
//Con queste righe di codice che capirà solo Parcel, imponiamo al 
//browser, ogni volta che si aggiorna la pagina, di non vedere i 
//cambianenti avvenuti all'interno del modulo, potrebbe tirnare
//utile in fase di sviluppo (modulo caldo)
if(module.hot) {
	module.hot.accept();
};

//generalmente per importare dei moduli non si usa l'intero path
//ma solo la libreria

//2) esiste un altro modo per lanciare Parcel ed è attraverso npm
//che rappresenta il modo più utilizzato anche perchè con npm
//si può evitare di ripetere le stesse cose creando degli script
//sul file json. Ad esempio creaimo questo script sul json
//"start": "parcel index.html", digitando semplicemente
//npm run start esso eseguirà durettamnte questo script. 
//Alla fine dello sviluppo bisogna creare una versione compressa del
//progetto per eliminare il codice morto. Con Parcel creaimo
//un altro script "build": "parcel build index.html" e lanciamo
//npm run build

//////////////////////////////////////////////////////////////////
//Configuring Babel and Polyfilling
/*
//la configurazione di babel serve per trasfoenmare un codice moderno
//in quello più vecchio (quindi trasforma un codice scritto con ES6 in 
//uno con ES5, ad esempio trasforma const o let in var etc). 
//Fortunatamanete parcel posssiede di già babel quindi non c'è bisogno
//di configurarlo

class Person {
	greeting = "Hey"
	constructor(name) {
		this.name = name;
		console.log(`${this.greeting}, ${this.name}`)
	}
};

const jonas = new Person("Jonas");

console.log("Jonas" ?? null);

//babel riesce a tradurre la sintassi di ES6 in ES5 ma per tradurre
//le nuove funzionalità Promise oppure alcuni metodi dell'array (tipo
//find) si usa il polyfilling
console.log(cart.find(el => el.quantity >= 2));

Promise.resolve("TEST").then(x => console.log(x));

//Polyfilling
//per importare tutto il pacchetto
import "core-js/stable";

//se invece, èper esempio, sappiamo di già che ci interessa 
//tradurre solo il metodo find degli array
//import "core-js/stable/array/find";

//Polyfilling async functions
//per tradurre le funzioni asincrone bisgona installare 
//npm i regenerator-runtime e importarlo
import "regenerator-runtime/runtime";
*/
//////////////////////////////////////////////////////////////////
//Let's Fix Some Bad Code: Part 1 and Part 2
/*
//in questa lezione rifaremo il codice del file clean.js con il 
//moderno js
*/
