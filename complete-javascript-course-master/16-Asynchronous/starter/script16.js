'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function(data, className = "") {
	const html = `
	<article class="country ${className}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>`;

	countriesContainer.insertAdjacentHTML("beforeend", html);
	countriesContainer.style.opacity = 1;
};

const renderError = function(msg) {
	countriesContainer.insertAdjacentText("beforeend", msg);
	//countriesContainer.style.opacity = 1;
};

const getJSON = function(url, errorMsg = "Something went wrong") {
	return fetch(url)
		.then(response => {
			if (!response.ok) throw new Error(`${errorMsg} (${response.status})`)
			return response.json()
		})
};
///////////////////////////////////////
//Asynchronous JavaScript, AJAX and APIs

//fino ad ora tutto il codice che abbiamo scritto è detto "sincrono"
//significa che ogni istruzione si esegue non appena termina 
//termina l'esecuzione l'istruzione precedente. Supponiamo però
//che una determinata istruzione impieghi del tempo prima di eseguirsi
//(ad esempio quando impostiamo un timer, oppure quando abbiamo come
//istruzione alert), questi sono tutti esempi in cui il codice principale 
//"si blocca", ovvero se prima non si esegue quella istruzione
//non si eseguirà il resto del codice. Ecco che qui interviene
//la programmazione "asincrona", cioè quella che comunque prosegue 
//ad eseguire l'intero codice nonostante quell'istruzione sia 
//in stand-by. In js lo use-case più usato per utilizzare la
//programmaziione asincrona sono le chiamate AJAX.

///////////////////////////////////////////////////////////////////
//Our First AJAX Call: XMLHttpRequest
/*
//in js ci sono diversi modi per fare una chiamata AJAX inizieremo 
//con quello più vecchio
const getCountryData = function(country) {
	const request = new XMLHttpRequest();
	request.open("GET", `https://restcountries.com/v2/name/${country}`);//con questo apriamo la richiesta
	request.send();//con questo inviamo la richiesta 

	request.addEventListener("load", function() {//con questo riceveremo
		//la risposta che sarà un JSON	
		//adesso convertiamo il JSON di risposta in un dato js
		const [data] = JSON.parse(this.responseText);
		console.log(data);

		const html = `
	<article class="country">
	  <img class="country__img" src="${data.flag}" />
	  <div class="country__data">
		<h3 class="country__name">${data.name}</h3>
		<h4 class="country__region">${data.region}</h4>
		<p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
		<p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
		<p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
	  </div>
	</article>`;

		countriesContainer.insertAdjacentHTML("beforeend", html);
		countriesContainer.style.opacity = 1;
	});
};

//adesso chiamamiamo la funzione creata per i paesi, ma notiamo che
//aggiornsando la pagina può capitare che i dati delle nazioni 
//cambiano ordine, questo perchè js non appena esegue la prima
//va subito alla seconda chiamata che è anch'essa una chiamata AJAX
//, che carica altri dati. Per poter ovvviare a questo ed avere 
//un ordine preciso basterebbe fare un concatenamento.
getCountryData("portugal");
getCountryData("italy");
getCountryData("usa");
*/
///////////////////////////////////////////////////////////////////
//Welcome to Callback Hell
/*
//in questa sezione creeremo una sequenza di chiamate AJAX in modo
//che ogni chiamata segua un ordine e venga eseguita non appena
//termina la precedente

const getCountryAndNeighbour = function(country) {
	//AJAX call country 1
	const request = new XMLHttpRequest();
	request.open("GET", `https://restcountries.com/v2/name/${country}`);
	request.send();

	request.addEventListener("load", function() {
		const [data] = JSON.parse(this.responseText);
		console.log(data);

		//render country 1
		renderCountry(data);

		//Get neighbour country 2
		const neighbour = data.borders?.[0];//qui utiliziamo direttamente
		//l'optional ? perchè ci sono stati che non hanno paesi 
		//confinanti, quindi la chiamata AJAX si eseguirà solo
		//se borders contiene dati

		//AJAX call country 2
		const request2 = new XMLHttpRequest();
		request2.open("GET", `https://restcountries.com/v2/alpha/${neighbour}`);
		request2.send();
		
		//poichè chiamiamo un listener all'interno di un altro 
		//listener, questa chiamata AJAX non potrà mai esistere 
		//se non si fa la prima chiamata AJAX (listener)
		request2.addEventListener("load", function() {
			const data2 = JSON.parse(this.responseText);
			console.log(data2);

			//render country 2
			renderCountry(data2, "neighbour");
		});
	});
};

//getCountryAndNeighbour("portugal");
getCountryAndNeighbour("usa");

//immaginadi voler concatenare più paesi con i loro confinanti,
//si dovranno annidare listener all'interno di listener etc. e 
//in questo modo renderebbe il codice meno leggibile e propenso 
//a bug. Ecco perchè dalla versione ES6  di js questo si risolve
//con le Promises function
*/
//////////////////////////////////////////////////////////////////
//Promises and the Fetch API

//in questa sezione sostiuiremo il vecchio modo di fare le chiamate
//AJAX con il nuovo utilizzzando il Fetch API

//vecchio modo 
//const request = new XMLHttpRequest();
//	request.open("GET", `https://restcountries.com/v2/name/${country}`);
//	request.send();

//nuovo modo
//const request = fetch(`https://restcountries.com/v2/name/portugal`);
//console.log(request);

//la reqeust ritorna un Promise, che rappresenta un oggetto che 
//viene utilizzato come un contenitore per un risultato futuro di 
//un'operazione asincrona. L'utilizzo delle Promises giova per 
//due motivi:
//1)non ci sarà più bisogno di utlizzare eventi e funzioni di 
//  callback per gestire risultati asincroni;
//2)si possono concatenare una all'altra evitando di annidare
//  funzioni di callbacks ed eventi
//una Promise quando viene creata è nello stato di "pending", ovvero
//è in attesa che si verifichi l'operazione asincrona, una volta
//eseguita l'operazione passa allo stato "settled", se l'operazione
//ha portato all'ottenimento di un valore questo settled è stato
//accettato e quindi si chiamerà "fullfilled", in caso contrario sarà
//"rejected". Ovviamente per evitare errori questi stati possono
//essere manipolati. Generalmente le Promises si usano per fetchare
//dati da API esterne quindi, in questoi caso, non si creerà 
//manualmente una Promise (consume promise), ma in alcuni casi bisogna
//saperle costruire (build promise).

//////////////////////////////////////////////////////////////////
//Consuming Promises
/*
//in questa sezione faremo lo stesso esercizio di una chiamata
//AJAX ma utilizzando le Promises
const getCountryData = function(country) {
	//fetch() ritorna una Promise, supponiamo di aver ottenuto il 
	//valore cercato e quindi siamo nello stato fullfilled, esso
	//può essere manipolato con il metodo then()
	fetch(`https://restcountries.com/v2/name/${country}`).then(function(response) {
		console.log(response);
		//per leggere i dati della risposta dobbiamo utilizzare
		//il metodo json(), il quale restitisce un' altra Promise
		//quindi ritorniamo questa Promise e chiamaimao di nuovo
		//il metodo then()
		return response.json();
	}).then(function(data) {
		console.log(data);
		//adesso utilizzziamo la funzione renderCountry() creata prima
		//passando il primo elemento del parametro data che è un array
		renderCountry(data[0]);
	});
};

getCountryData("portugal");
*/
//////////////////////////////////////////////////////////////////
//Chaining Promises
/*
const getCountryData = function(country) {
	//country 1
	fetch(`https://restcountries.com/v2/name/${country}`)
		.then(response => response.json())
		.then(data => {
			renderCountry(data[0])
			const neighbour = data[0].borders?.[0];
			if(!neighbour) return;
			//country 2
			return fetch(`https://restcountries.com/v2/alpha/${neighbour}`)
		})
		.then(response => response.json())
		.then(data => renderCountry(data, "neighbour"));
};

getCountryData("portugal");
*/
//////////////////////////////////////////////////////////////////
//Handling Rejected Promises
/*
//in questa sezione imparerempo a gestire una Promise rigettata 
//(un errore) e l'unico modo affinchè una Promise sia rigettata è 
//quando si perde la connessione, per simulare la perdita di 
//connessione imposteremo, nella scheda Rete di Ispeziona, la 
//connessione su Offline.
//ci sono due modi per gestire l'errore
//1) aggiungere un'altra funzione al metodo then(), poichè esso
//   può contenere come parametri due funzioni di callback, la prima
//   in caso di successo della Promise, la seconda in caso di fallimento;
//2) il secondo, sicuramente più pulito, consiste nell'aggiungere alla
//   fine della catena il metodo catch(), passando sempre la funzione
//   di errore come parametro

const getCountryData = function(country) {
	//country 1
	fetch(`https://restcountries.com/v2/name/${country}`)
		.then(response => response.json())//, err => alert(err))
		.then(data => {
			renderCountry(data[0])
			const neighbour = data[0].borders?.[0];
			if(!neighbour) return;
			//country 2
			return fetch(`https://restcountries.com/v2/alpha/${neighbour}`)
		})
		.then(response => response.json())//, err => alert(err))
		.then(data => renderCountry(data, "neighbour"))
		.catch(err => {
			console.error(`${err} ❌❌❌`);
			renderError(`Something went wrong ❌❌ ${err.message}. Try again!`)
		})//adesso aggiungiamo il metodo finally(), il quale si esegue
		//a prescindere se la Promise abbia avuto successo o fallimento
		.finally(() => {
			countriesContainer.style.opacity = 1;
		})
};

btn.addEventListener("click", function() {
	getCountryData("portugal");
});
*/
//////////////////////////////////////////////////////////////////
//Throwing Errors Manually
/*
//adesso cerchiamo di gestire un altro errore, ad esempio vogliamo
//ricevere dall'API dati di uno stato che non esiste, e poichè la 
//Promise va in errore solo se la connessione salta, non riconosce
//questo tipo di errore (codice 404), quindi gestiremo manualamnete
//questo errore. Creando un oggetto Error() all'intreno della Promise
//automaticamente essa fallisce e si propaga in tutta la catena e viene
//catturato nel metodo catch(), il quale attribuirà come messaggio
//dell'errore, il messaggio passato come parametro all'oggetto Error
const getJSON = function(url, errorMsg = "Something went wrong") {
	return fetch(url)
		.then(response => {
			if (!response.ok) throw new Error(`${errorMsg} (${response.status})`)
			return response.json()
		})
};

const getCountryData = function(country) {
	//country 1
	getJSON(`https://restcountries.com/v2/name/${country}`, "Country not found")
		.then(data => {
			renderCountry(data[0])
			const neighbour = data[0].borders?.[0];
			if(!neighbour) throw new Error("No neighbour found!");
			//const neighbour = "sbdbsNLKN";
			//country 2
			return getJSON(`https://restcountries.com/v2/alpha/${neighbour}`, "Country not found");
		})
		.then(data => renderCountry(data, "neighbour"))
		.catch(err => {
			console.error(`${err} ❌❌❌`);
			renderError(`Something went wrong ❌❌ ${err.message}. Try again!`)
		})
		.finally(() => {
			countriesContainer.style.opacity = 1;
		})
};

btn.addEventListener("click", function() {
	getCountryData("portugal");
});

getCountryData("australia");
//adesso ipotizziamo che l'errore non sia il primo stato ma il 
//secondo (neighbour)
*/
//////////////////////////////////////////////////////////////////
//Asynchronous Behind the Scenes: The Event Loop

//////////////////////////////////////////////////////////////////
//The Event Loop in Practice
/*
console.log("Test start");
setTimeout(() => console.log("0 sec timer"), 0);
Promise.resolve("Resolved promise 1").then(res => console.log(res));

Promise.resolve("Resolved promise 2").then(res => {
	for(let i = 0; i < 100000; i++) {
		
	}
	console.log(res)});
console.log("Test end")
*/
//////////////////////////////////////////////////////////////////
//Building a Simple Promise
/*
//costruiamo una Promise simulando il gioco di una lotteria
//se si vince allora la Promise è stata accettata altrimenti 
//è stata rigettata. Per creare una Promise si usa la keyword new
//come per gli oggetti e come parametro possiede una funzione, 
//chiamata esecutore, la quale possiede come parametri la funzione
//di risoluzione e quella di rigetto

const lotteryPromise = new Promise(function(resolve, reject) {
	console.log("Lottery draw is happening");
	setTimeout(function() {
		if (Math.random() >= 0.5) {
			resolve("You WIN");
		} else {
			reject(new Error("You lost your money"));
		}
	}, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

//Promisifying setTimeout
const wait = function(seconds) {
	return new Promise(function(resolve) {
		setTimeout(resolve, seconds * 1000);
	});
};

wait(2).then(() => {
	console.log("I waited for 2 seconds")
	return wait(1);
}).then(() => console.log("I waited for 1 second"));

//si possono creare direttamente anche una Promise accettata e una
//rifiutata

Promise.resolve("abc").then(x => console.log(x));
Promise.reject(new Error("Problem!")).catch(x => console.error(x));
*/
//////////////////////////////////////////////////////////////////
//Promisifying Geolocation API
/*
const getPosition = function() {
	return new Promise(function(resolve, reject) {
		navigator.geolocation.getCurrentPosition(resolve, reject);
	});
};

//getPosition().then(pos => console.log(pos));

const whereAmI = function() {
	getPosition()
		.then(pos => {
			const { latitude: lat, longitude: lng } = pos.coords;

			return fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`)
		})
		.then(response => {
			if (!response.ok) throw new Error(`Problem with geocoding ${response.status}`);
			return response.json()
		})
		.then(data => {
			console.log(`You are in ${data.city}, ${data.countryName}`)
			return fetch(`https://restcountries.com/v2/name/${data.countryName}`)
		})
		.then(response => {
			if (!response.ok) throw new Error(`Country not found (${response.status})`)
			return response.json()
		})
		.then(data => renderCountry(data[0]))
		.catch(err => console.error(`${err.message}`))
};

btn.addEventListener("click", whereAmI);
*/
//////////////////////////////////////////////////////////////////
//Consuming Promises with Async/Await
/*
//dalla versione ES2017 esiste un modo ancora più semplice per 
//consumare le Promises
const getPosition = function() {
	return new Promise(function(resolve, reject) {
		navigator.geolocation.getCurrentPosition(resolve, reject);
	});
};

const whereamI = async function() {
	//Geolocation
	const pos = await getPosition();
	const { latitude: lat, longitude: lng } = pos.coords;
	
	//Reverse geocoding
	const resGeo = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`)
	const dataGeo = await resGeo.json(); 
	console.log(dataGeo);
	
	//Country data
	//fetch(`https://restcountries.com/v2/name/${country}`).then(res => console.log(res));
	
	//questa forma è uguale a quella sopra ma più pulita, senza 
	//l'utilizzo del concatenamento del metodo then(), quindi 
	//creando ogni singola Promise tramite la ketword await
	const res = await fetch(`https://restcountries.com/v2/name/${dataGeo.countryName}`);
	const data = await res.json();
	console.log(data);
	renderCountry(data[0]);
};
whereamI();
console.log("FIRST");
*/
//////////////////////////////////////////////////////////////////
// Error Handling With try...catch
/*
//con le funzioni asincrone non si può utilizzare il metodo catch()
//poichè non ci sono concatenazioni

//esmepio di try catch

//try{
//	let y = 1;
//	const x = 2;
//	x = 3;
//} catch(err) {
//	alert(err.message);
//}

const getPosition = function() {
	return new Promise(function(resolve, reject) {
		navigator.geolocation.getCurrentPosition(resolve, reject);
	});
};

const whereamI = async function() {
	try {
		//Geolocation
		const pos = await getPosition();
		const { latitude: lat, longitude: lng } = pos.coords;

		//Reverse geocoding
		const resGeo = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`)
		if(!resGeo.ok) throw new Error("Problem getting location data");
		const dataGeo = await resGeo.json();
		console.log(dataGeo);

		//Country data
		const res = await fetch(`https://restcountries.com/v2/name/${dataGeo.countryName}`);
		if(!res.ok) throw new Error("Problem getting country");
		const data = await res.json();
		console.log(data);
		renderCountry(data[0]);
	} catch (err) {
		console.error(`${err}`);
		renderError(`${err.message}`)
	}
};
whereamI();
console.log("FIRST");
*/
//////////////////////////////////////////////////////////////////
//Returning Values from Async Functions
/*
//in questa sezione cercheremo di caapire come funziona realmente
//una funziona asincrona

const getPosition = function() {
	return new Promise(function(resolve, reject) {
		navigator.geolocation.getCurrentPosition(resolve, reject);
	});
};

const whereamI = async function() {
	try {
		//Geolocation
		const pos = await getPosition();
		const { latitude: lat, longitude: lng } = pos.coords;

		//Reverse geocoding
		const resGeo = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`)
		if (!resGeo.ok) throw new Error("Problem getting location data");
		const dataGeo = await resGeo.json();

		//Country data
		const res = await fetch(`https://restcountries.com/v2/name/${dataGeo.countryName}`);
		if (!res.ok) throw new Error("Problem getting country");
		const data = await res.json();
		renderCountry(data[0]);

		//supponiamo di voler ritornare una stringa come questa, 
		//sappiamo di già che una funzione asincrona ritorna sempre 
		//una Promise, quindi se volessimo ottenere questa stringa
		//basta chiamare sulla funzione il metodo then(), e passare
		//come parametro il valore di successo della Promise, qui 
		//rappresentata da questa stringa
		return `You are in ${dataGeo.city}, ${dataGeo.countryName}`
	} catch (err) {
		console.error(`${err}`);
		renderError(`${err.message}`)
		//reject promise returned from async function
		throw err;
	}
};

console.log("1: Will get location");
//const city = whereamI();
//console.log(city);
//whereamI()
//	.then(city => console.log(`2: ${city}`))//supponiamo di avere un errore
	//  all'interno del blocco try, in quel caso li l'errore verrà catchato
	//dal blocco catch e quindi non ritornerà la stringa, per ovviare a ciò
	//si usa rilanciare lo stesso errore all'interno del blocco catch
	//affinchè si propaghi.
//	.catch(err => console.error(`2: ${err.message}`))//adesso per 
	//stampare la terza stringa qui sotto, dopo la Promise, basta 
	//inserirla dentro il blocco finally
//	.finally(() => console.log("3: Finished getting location"));
//avendo prima utilizzato la async/await forma adesso ritornare alle
//funzioni di callback dei metodi then(), catch() e finally() è
//brutto quindi faremo lo stesso esempio di quassù ma sopstando
//il tutto dentro una funzione asincrona async/await. Poichè non
//si vuole creare una nuova funzione e si possono utilizzare le IIFE
//functions le quali sono funzioni che vengono invocate direttamnete

(async function() {
	try{
	const city = await whereamI();
	console.log(`2: ${city}`);
	} catch(err) {
		console.error(`2: ${err.message}`)
	}
	console.log("3: Finished getting location");
})();
*/
//////////////////////////////////////////////////////////////////
//Running Promises in Parallel
/*
//supponiamo adesso di voler ricevere dati su tre paesi contemporaneamente
//e in cui è irrilevante l'ordine di arrivo dei dai dati. Creaimo 
//una funzione asincrona in cui si passano tre paesi e si bloccano
//le rispettive capitali in uj array
const get3Countries = async function(c1, c2, c3) {
	try {
		//in questo modo caricheremo i dati di ogni nazione sequeenzialmte
		//ovvero, i dati del canada verranno fetchati una volta
		//terminato il portogallo e cosi via, il che parlando di
		//asincronia non ha molto senso, quindi cercheremo di caricare
		//i dati in parallelo
		//const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
		//const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
		//const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);

		//console.log([data1.capital, data2.capital, data3.capital,])

		//per fare ciò useremo le combinators promises
		const data = await Promise.all([getJSON(`https://restcountries.com/v2/name/${c1}`),
		getJSON(`https://restcountries.com/v2/name/${c2}`),
		getJSON(`https://restcountries.com/v2/name/${c3}`)]);//questo metodo prende come parametro un array
		//di promises e restituisce una nuova promise 
		//che eseguirà tutte le promises dell'array 
		//contemporaneamente
		console.log(data.map(d => d[0].capital));
	} catch (err) {
		console.error(err)
	}
};

get3Countries("portugal", "canada", "tanzania");
*/
//////////////////////////////////////////////////////////////////
//Other Promise Combinators: race, allSettled and any

//Promise.race(), riceve sempre un array di promises, e ritorna una
//nuova promise che eseguirà solo la promise più "veloce", in questo
//caso nel ricevere dati
(async function() {
	const res = await Promise.race([getJSON(`https://restcountries.com/v2/name/italy`),
	getJSON(`https://restcountries.com/v2/name/egypt`),
	getJSON(`https://restcountries.com/v2/name/mexico`)]);
	console.log(res[0]);
})();

//uno use case molto utile nella vita reale è quello di rifiutare
//utenti che abbiano magari una connessione lenta, quindi accettare
//solo le connessioni che completano i task rispettando un tempo preciso

const timeout = function(sec) {
	return new Promise(function(_, reject) {
		setTimeout(function() {
			reject(new Error("Request took too long!"))
		}, sec * 1000)
	})
};

Promise.race([getJSON(`https://restcountries.com/v2/name/tanzania`), timeout(0.1)])
	.then(res => console.log(res[0])).catch(err => console.error(err));

//Promise.allSettled(), è molto simile a all(), con l'unica differenza
//che in all(), se dovesse anche solo una delle promise rigettarsi, 
//andrebbe in cortocircuito non restiruendo nulla, mentre 
//allSettled() restiuisce in ogni caso la nuova promise
Promise.allSettled([
	Promise.resolve("Success"),
	Promise.reject("ERROR"),
	Promise.resolve("Another success"),
]).then(res => console.log(res));

Promise.all([
	Promise.resolve("Success"),
	Promise.reject("ERROR"),
	Promise.resolve("Another success"),
]).then(res => console.log(res)).catch(err => console.error(err));

//Promise.any() accetta sempre un array di promises e ritornerà 
//solamente la prima promise accettata scartando automaticamnte 
//ogni altra rigettata, è molto simile a race() con l'unica differenza 
//che any() ignora le promises rifiutate
Promise.any([
	Promise.resolve("Success"),
	Promise.reject("ERROR"),
	Promise.resolve("Another success"),
]).then(res => console.log(res)).catch(err => console.error(err));