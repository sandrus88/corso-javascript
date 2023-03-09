'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
	owner: 'Jonas Schmedtmann',
	movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
	interestRate: 1.2, // %
	pin: 1111,

	movementsDates: [
		'2019-11-18T21:31:17.178Z',
		'2019-12-23T07:42:02.383Z',
		'2020-01-28T09:15:04.904Z',
		'2020-04-01T10:17:24.185Z',
		'2020-05-08T14:11:59.604Z',
		'2023-03-05T17:01:17.194Z',
		'2023-03-07T23:36:17.929Z',
		'2023-03-08T10:51:36.790Z',
	],
	currency: 'EUR',
	locale: 'pt-PT', // de-DE
};

const account2 = {
	owner: 'Jessica Davis',
	movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
	interestRate: 1.5,
	pin: 2222,

	movementsDates: [
		'2019-11-01T13:15:33.035Z',
		'2019-11-30T09:48:16.867Z',
		'2019-12-25T06:04:23.907Z',
		'2020-01-25T14:18:46.235Z',
		'2020-02-05T16:33:06.386Z',
		'2020-04-10T14:43:26.374Z',
		'2020-06-25T18:49:59.371Z',
		'2020-07-26T12:01:20.894Z',
	],
	currency: 'USD',
	locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

//creaimo una funzione che trasformi le date in moment (ad esempio
//se un movimento è stato fatto ieri uscirà la scritta ieri 
//e non la data di ieri)
const formatMovementDate = function(date, locale) {
	const calcDaysPassed = (date2, date1) => Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));

	const daysPassed = calcDaysPassed(new Date(), date);
	console.log(daysPassed);

	if (daysPassed === 0) return "Today";
	if (daysPassed === 1) return "Yesterday";
	if (daysPassed <= 7) return `${daysPassed} days ago`;
	else {
		//const day = `${date.getDate()}`.padStart(2, 0);
		//const month = `${date.getMonth() + 1}`.padStart(2, 0);
		//const year = date.getFullYear();
		//return `${day}/${month}/${year}`;
		return new Intl.DateTimeFormat(locale).format(date);
	}
};

const formatCur = function(value, locale, currency) {
	return new Intl.NumberFormat(locale, {
		style: "currency",
		currency: currency
	}).format(value);
}

const displayMovements = function(acc, sort = false) {
	containerMovements.innerHTML = '';

	const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

	movs.forEach(function(mov, i) {
		const type = mov > 0 ? 'deposit' : 'withdrawal';

		const date = new Date(acc.movementsDates[i]);
		const displayDate = formatMovementDate(date, acc.locale);

		const formattedMov = formatCur(mov, acc.locale, acc.currency);
		const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1
			} ${type}</div>
		<div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

		containerMovements.insertAdjacentHTML('afterbegin', html);
	});
};

const calcDisplayBalance = function(acc) {
	acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
	labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function(acc) {
	const incomes = acc.movements
		.filter(mov => mov > 0)
		.reduce((acc, mov) => acc + mov, 0);
	labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);;

	const out = acc.movements
		.filter(mov => mov < 0)
		.reduce((acc, mov) => acc + mov, 0);
	labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);;

	const interest = acc.movements
		.filter(mov => mov > 0)
		.map(deposit => (deposit * acc.interestRate) / 100)
		.filter((int, i, arr) => {
			// console.log(arr);
			return int >= 1;
		})
		.reduce((acc, int) => acc + int, 0);
	labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);;
};

const createUsernames = function(accs) {
	accs.forEach(function(acc) {
		acc.username = acc.owner
			.toLowerCase()
			.split(' ')
			.map(name => name[0])
			.join('');
	});
};
createUsernames(accounts);

const updateUI = function(acc) {
	//applichiamo il metodo toFixed() a tutte le funzioni che 
	//mostrano i numeri per farli apparire con soli due numeri
	//oltre la virgola
	// Display movements
	displayMovements(acc);

	// Display balance
	calcDisplayBalance(acc);

	// Display summary
	calcDisplaySummary(acc);
};

//creaimo una funzione che avvia un timer e in caso 
//di inattività , non appena termina il timer, l'app esegue 
//direttamante il log out
const startLogOutTimer = function() {
	const tick = function() {
		const min = String(Math.trunc(time / 60)).padStart(2, 0);
		const sec = String(time % 60).padStart(2, 0);
		//in ogni chiamata, stampiamo il tempo rimanente aggiornando l'UI
		labelTimer.textContent = `${min}:${sec}`;

		//quando il tempo arriva a 0 secondi, fermiamo il timer e log out
		if (time === 0) {
			clearInterval(timer);
			labelWelcome.textContent = "Log in to get started";
			containerApp.style.opacity = 0;
		}

		//diminuiamo il timer di 1 scondo
		time--;
	}
	//impostiamo il tempo a 5 minuti
	let time = 120;
	//chiamiamo il timer ogni secondo
	tick();//la chiamata qui serve a far ripartire subito il timer
	//una volta rieffettuato il login
	const timer = setInterval(tick, 1000);
	return timer;
};
///////////////////////////////////////
// Event handlers
let currentAccount, timer;

//Experimenting API internationalization
//const now = new Date();
//const options = {
//	hour: "numeric",
//	minute: "numeric",
//	day: "numeric",
//	month: "long",//per il mese esiste anche long che mostra il nome
//del mese oppure 2-digit dove lo rappresenta 
//con due cifre		
//	year: "numeric",//nell'anno esiste anche il 2-digit come il mese
//	weekday: "long"
//}
//DateTimeFormat() ha bisogno di una stringa da passare in cui 
//si specifica la lingua e il paese, mentre su format() si passa
//direttamente la data da formattare

//labelDate.textContent = new Intl.DateTimeFormat("en-US", options).format(now);//questa rappresenta
//la maniera più semplice ora vogliamo creare un oggetto options
//dove all'interno inseriremo oltre glielementi di una data
//anche l'ora ei minuti
//nella vita reale non ha senso impostare una lingua e paese manualmente
//ma lo si può prendere direttamente dal browser
//const locale = navigator.language;
//console.log(locale);

//labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);

btnLogin.addEventListener('click', function(e) {
	// Prevent form from submitting
	e.preventDefault();

	currentAccount = accounts.find(
		acc => acc.username === inputLoginUsername.value
	);
	console.log(currentAccount);

	if (currentAccount?.pin === +inputLoginPin.value) {
		// Display UI and message
		labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]
			}`;
		containerApp.style.opacity = 100;

		//Create current date and time

		const now = new Date();
		const options = {
			hour: "numeric",
			minute: "numeric",
			day: "numeric",
			month: "numeric",
			year: "numeric",
			//weekday: "long"
		}

		labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now);

		/*
		const day = `${now.getDate()}`.padStart(2, 0);
		const month = `${now.getMonth() + 1}`.padStart(2, 0);
		const year = now.getFullYear();
		const hour = `${now.getHours()}`.padStart(2, 0);;
		const minutes = `${now.getMinutes()}`.padStart(2, 0);;
		labelDate.textContent = `${day}/${month}/${year}, ${hour}:${minutes}`;
*/
		// Clear input fields
		inputLoginUsername.value = inputLoginPin.value = '';
		inputLoginPin.blur();

		//Timer
		//per evitare la contemporaneità di due timer ogni volta
		//che eseguo un nuovo login di un altro user, cancello il 
		//timer e attuale
		if (timer) clearInterval(timer);
		//e ne faccio ripartire subito un altro
		timer = startLogOutTimer();

		// Update UI
		updateUI(currentAccount);
	}
});

btnTransfer.addEventListener('click', function(e) {
	e.preventDefault();
	const amount = +inputTransferAmount.value;
	const receiverAcc = accounts.find(
		acc => acc.username === inputTransferTo.value
	);
	inputTransferAmount.value = inputTransferTo.value = '';

	if (
		amount > 0 &&
		receiverAcc &&
		currentAccount.balance >= amount &&
		receiverAcc?.username !== currentAccount.username
	) {
		// Doing the transfer
		currentAccount.movements.push(-amount);
		receiverAcc.movements.push(amount);

		//Add transfer date
		currentAccount.movementsDates.push(new Date().toISOString());
		receiverAcc.movementsDates.push(new Date().toISOString());

		// Update UI
		updateUI(currentAccount);

		//Reset timer
		clearInterval(timer);
		timer = startLogOutTimer();
	}
});

btnLoan.addEventListener('click', function(e) {
	e.preventDefault();
	//applichiamo floor() al valore del prestito da concedere	
	const amount = Math.floor(inputLoanAmount.value);

	if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
		setTimeout(function() {
			// Add movement
			currentAccount.movements.push(amount);

			//Add loan date
			currentAccount.movementsDates.push(new Date().toISOString());

			// Update UI
			updateUI(currentAccount);

			//Reset timer
			clearInterval(timer);
			timer = startLogOutTimer();
		}, 2500);
	}
	inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function(e) {
	e.preventDefault();

	if (
		inputCloseUsername.value === currentAccount.username &&
		+inputClosePin.value === currentAccount.pin
	) {
		const index = accounts.findIndex(
			acc => acc.username === currentAccount.username
		);
		console.log(index);
		// .indexOf(23)

		// Delete account
		accounts.splice(index, 1);

		// Hide UI
		containerApp.style.opacity = 0;
	}

	inputCloseUsername.value = inputClosePin.value = '';
	labelWelcome.textContent = "Log in to get started";
});

let sorted = false;
btnSort.addEventListener('click', function(e) {
	e.preventDefault();
	displayMovements(currentAccount, !sorted);
	sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
//converting and checking numbers
/*
//in js i numeri sono sempre presentati come numeri con la virgola
//quindi non importa se li scriviamo interi o con la virgola
console.log(23 === 23.0);

//sappiamo già convertire una stringa in un nuemro
console.log(Number("23"));
//ma esiste un  modo più semplice
console.log(+"23");//in cui js vedendo come primo operatore il +
//trasforma direttamente il resto in un numero

//parsing
console.log(Number.parseInt("30px", 10));//il secondo parametro
//rapresenta il regex ovvero in questo caso vogliamo usare il
//ssistema decimale (nel caso in cui si volesse utilizzare il
//sistema binario basta mettere 2), è sempre buona norma specificare
//il regex per evitare dei bug.
//con il parsing js estrae dalla stringa solamente il numero
//escludendo le altre parole, ma a patto che il numero sia
//prima delle lettere ad esempio se
console.log(Number.parseInt("e25", 10));//questo non darà 25 ma un
//altro valore

console.log(Number.parseFloat("2.5rem", 10));

//per verificare se un elemento è un numero o meno si può
//utilizzare il metodo isNaN()
console.log(Number.isNaN(20));//false
console.log(Number.isNaN("20"));//false
console.log(Number.isNaN(+"20X"));//true
console.log(Number.isNaN(23 / 0));//false

//ma il metodo migliore per verificarlo è isFinite()
console.log(Number.isFinite(20));//true
console.log(Number.isFinite("20"));//false
console.log(Number.isFinite(+"20X"));//false
console.log(Number.isFinite(23 / 0));//false
*/
/////////////////////////////////////////////////////////////////
//math and rounding
/*
//radice quadrata
console.log(Math.sqrt(25));
//se ci interessa calcolare la radice cubica o successive il modo
//migliore è l'elevamento a potenza
console.log(25 ** (1 / 2));
console.log(8 ** (1 / 3));

//per ottenere il valore max e min tra valori
console.log(Math.max(5, 18, 23, 11, 2));
//il metodo max esegue la coercizione di stringhe, cioè trasforma
//le stringhe in numeri infatti se passiamo "23"
console.log(Math.max(5, 18, "23", 11, 2));//darà 23

console.log(Math.min(5, 18, 23, 11, 2));
console.log(Math.min(5, 18, 23, 11, "2"));//darà 2

//sull'oggetto Math esistono anche delle costanti
console.log(Math.PI * Number.parseFloat("10px") ** 2);

//un metodo importante di Math è random(), creaimo una funzione che ci  dia
//dei numeri random compresi tra un numero min e un max
const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + 1) + min;
console.log(randomInt(10, 20));

//arrotondamento degli interi
//tutti questi metodi effettuano la coercizione da stringa a numero
//il metodo trunc toglie tutti i decimali
console.log(Math.trunc(23.3));

//il metodo round arrotonda al numero più vicino
console.log(Math.round(23.2));//23
console.log(Math.round(23.8));//24

//il metodo ceil arrotonda per eccesso
console.log(Math.ceil(23.2));//24
console.log(Math.ceil(23.8));//24

//il metodo floor arrotonda per difetto
console.log(Math.floor(23.2));//23
console.log(Math.floor(23.8));//23

//floor e trunc sembra che facciano la stessa cosa, ed in effetti
//è cosi se si tratta di numeri positivi

console.log(Math.trunc(-23.2));//-23
console.log(Math.floor(-23.2));//-24

//arrotondamento dei decimali

//il metodo toFixed() ritorna una stringa e svolge l'arrotondamento
//che dipende dal numero passato come parametro
console.log((2.7).toFixed(0));// "3"
console.log((2.7).toFixed(3));// "2.700"
console.log((2.345).toFixed(2));// "2.35"
//per trasformarli in numeri si può aggiunger il + davanti
console.log(+(2.345).toFixed(2));
*/
/////////////////////////////////////////////////////////////////
//the remainder operator 
/*
//l'operatore resto ritorna il resto di una divisione
console.log(5 % 2);// 1
console.log(8 % 3);// 2

//lo use case più importante dell'operatore resto è il controllo
//se un numero è pari o dispari
//un numero è pari quando dà resto 0 mentre è dispari quando
//dà resto
console.log(6 % 2);//da resto 0 (pari)
console.log(7 % 2);//da resto 1 (dispari)

const isEven = n => n % 2 === 0;
console.log(isEven(8));
console.log(isEven(23));
console.log(isEven(514));

//adesso selezioniamo le righe di tutti i mocvimenti e decidiamo
//di colorare ogni seconda riga dei movimenti
labelBalance.addEventListener("click", function() {
	[...document.querySelectorAll(".movements__row")].forEach(function(row, i) {
		//0, 2, 4, 6 etc
		if (i % 2 === 0) row.style.backgroundColor = "orangered";
		//0, 3, 6, 9 etc
		if (i % 3 === 0) row.style.backgroundColor = "blue";
	});
});
*/
/////////////////////////////////////////////////////////////////
//numeric separators
/*
//ipotizziamo di voler scrivere un numero grande tipo il diametro
//della terra
const diameter = 287460000000;//scritto cosi verrebbe diffcile leggerlo

//con i separatori numerici verrebbe cosi

const diameterSeparators = 287_460_000_000;
console.log(diameterSeparators);

//js ovviamente ignora il separatore significa che questo si può
//mettere in qualsiasi posto del numero, serve per decifrare bene
//il numero stesso
*/
/////////////////////////////////////////////////////////////////
//working with BigInt
/*
//BigInt è un primitivo che rappresenta un  numero grande
//in js sappiamo che i numeri sono rappresentati in 64 bit significa
//che ogni numero è rappresentato da massimo 64 combinazioni di 0 e 1
//di questi 64 bit solo 53 vengono utilizzati per rappresentare i
//numeri, i restanti vengono conservati per decimali e segni.
//Il numero massimo rappresentabile finora è questo

console.log(2 ** 53 - 1);
//esiste anche la costante di riferimento che è questa
console.log(Number.MAX_SAFE_INTEGER);
//qualsiasi altro numero più grande di questo verrebbe
//rappresentato con dei difetti
console.log(2 ** 53 + 0);
//a partire dalla versione 2020 è stato aggiunto BigInt per questo
//motivo
//un BigInt si ottiene aggiungendo n alla fine del numero
console.log(48745875087572953952457934059430930n);
//oppure utilizzando la funzione BigInt()
console.log(BigInt(48745875087572953952457934059430930));
//operaizoni con BigInt
console.log(10000n + 10000n);
console.log(10000n * 10000n);
//non si possono mischiare numeri regolari e BigInt
const huge = 3782171740721020742402074917294n;
const num = 23;
console.log(huge * num);
*/
//////////////////////////////////////////////////////////////////
//creating dates
/*
//per creare una data esistono 4 modi per farlo
//1.utilizzare new Date() senza alcun parametro ritorna il giorno
//l'ora attuali
const now = new Date();
console.log(now);
//2.passando una stringa a new Date()
console.log(new Date("December 24, 2015"));
//3. passando year, monthIndex, day, hours, minutes, seconds
console.log(new Date(2037, 10, 19, 15, 23, 5));// il mese in js
//parte da 0 ecco perchè il 10 qui ritorna novembre
//4. passando i millisecondi a partire dal 1 gennaio 1970
console.log(new Date(0));
//mettiamo caso che vogliamo avere la data di 3 giorni dopo
//quindi trasformiamo 3 giorni in millisecondi
console.log(new Date(3 * 24 * 60 * 60 * 1000));

//le date sono anch'esse oggetti quindi possiedono metodi etc
const future = new Date(2037, 10, 19, 15, 23, 5);
console.log(future);
console.log(future.getFullYear());//ritorna l'anno
console.log(future.getMonth());//ritorna il mese (parte da 0)
console.log(future.getDate());//ritorna il giorno su base mensile
//in questo caso 10
console.log(future.getDay());//ritorna il giorno su base settimanale
//in questo caso 4 poichè è un giovedi
console.log(future.getHours());//ritorna l'ora
console.log(future.getMinutes());//ritorna i minuti
console.log(future.getSeconds());//ritorna i secondi
console.log(future.toISOString());//ritorna la data in questo formato
//2037-11-19T14:23:05.000Z
console.log(future.getTime());//ritorna i millisecondi dal 1 gennaio
//1970 (timestamp)
//sul timestamp ci sono dei metodi apposta
console.log(Date.now());//ritorna l'attuale timestamp

//per ogni metodo get esiste un metodo set per impostare ogni
//singola parte di una data
future.setFullYear(2040);
console.log(future);
*/
/////////////////////////////////////////////////////////////////
//operations with dates
/*
//si possono fare operazioni con le date, il risultato ottenuto
//è in millisecondi e poi si può trasformare in una data
const future = new Date(2037, 10, 19, 15, 23, 5);
console.log(Number(future));

//creaimo una funzione che prende due date e ritorna i giorni
//che ci sono tra queste due date
const calcDaysPassed = (date1, date2) => Math.abs((date2 - date1) / (1000 * 60 * 60 * 24));

const days1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24));
console.log(days1);
*/
/////////////////////////////////////////////////////////////////
//internationalizing dates (IntI)
/*
//con l'internazionalizzazione possiamo formattare le date in base
//al luogo in cui ci troviamo
*/
/////////////////////////////////////////////////////////////////
//internationalizing numbers (IntI)
/*
//con l'internazionalizzazione possiamo formattare anche i numeri
//in base al luogo in cui ci troviamo
const num = 3884764.23;

const options = {
	style: "currency",//style può essere unit, percent o currency
	unit: "mile-per-hour",
	currency: "EUR",//currency deve essere sempre specificata perchè
	//non è compres nella stringa di lingua-paese
	//useGrouping: false,//questa serve ad attivare o diattivare i
	//separatori se messo a false mostrerò il
	//numero senza virgola o punti prima dei decimali
};

console.log("US: ", new Intl.NumberFormat("en-US", options).format(num));
console.log("Germany: ", new Intl.NumberFormat("de-DE", options).format(num));
console.log("Syria: ", new Intl.NumberFormat("ar-SY", options).format(num));
console.log(navigator.language, new Intl.NumberFormat(navigator.language, options).format(num));
*/
/////////////////////////////////////////////////////////////////
//timers: setTimeout and setInterval
/*
//setTimeout viene eseguito solo una volta dopo un tempo impostato
//mentre setInterval funziona praticamnete per sempre finchè non
//lo fermiamo

//setTimeout

//setTimeout(() => console.log("Here is your pizza"), 3000);//in questo
//caso faremo apparire la stringa dopo 3000 millisecondi (3 secondi)
//pwr poter paassare degli argomenti alla funzione di callback, basta
//inseririrli dopo i millisecondi, infatti setTimeout() accetta come
//terzo parametro un array di elelemnti che appunto saranno i parametri della
//funzione di callback
const ingredients = ["olives", "spinach"];
const pizzaTimer = setTimeout((ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`), 3000, ...ingredients);
console.log("Waiting...");

//possianmo stoppare il timeout cosi
//if(ingredients.includes("spinach")) clearTimeout(pizzaTimer);

//setInterval

setInterval(function() {
	const now = new Date();
	console.log(new Intl.DateTimeFormat(navigator.language, {
		hour: "numeric",
		minute: "numeric",
		second: "numeric"
	}).format(now));
}, 1000);
*/
//////////////////////////////////////////////////////////////////
//implementing a countdown timer

//le applicazioni bancarie nella vita reale disconnetterano l'utente
//dopo un periodo di inattività (ad esmepio dopo 5 minuti)