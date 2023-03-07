'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
	owner: 'Jonas Schmedtmann',
	movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
	interestRate: 1.2, // %
	pin: 1111,
};

const account2 = {
	owner: 'Jessica Davis',
	movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
	interestRate: 1.5,
	pin: 2222,
};

const account3 = {
	owner: 'Steven Thomas Williams',
	movements: [200, -200, 340, -300, -20, 50, 400, -460],
	interestRate: 0.7,
	pin: 3333,
};

const account4 = {
	owner: 'Sarah Smith',
	movements: [430, 1000, 700, 50, 90],
	interestRate: 1,
	pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

//creating DOM elements
//dopo aver visto il metodo sort creaimo all'interno di questa funzione
//la funzionalità del bottone sort di ordinare il saldo o in
//maniera crescente o decrescente
const displayMovements = function(movements, sort = false) {
	containerMovements.innerHTML = "";

	const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
	movs.forEach(function(mov, i) {
		const type = mov > 0 ? "deposit" : "withdrawal";
		const html = `
		<div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>
		`;
		containerMovements.insertAdjacentHTML("afterbegin", html);
		//		containerMovements.insertAdjacentHTML("beforeend", html);
		//con questo metodo aggiungiamo la stringa html creata
		//al contenitore dei movimenti, la differenza tra
		//"afterbegin" e "beforeend" è che, il primo
		//aggiunge ogni nuovo elemento prima di quello creato
		//prima, mentre il secondo aggiunge il nuovo dopo quello
		//creato prima.
		//Per togliere gli elementi iniziali basta utilizzare 
		//prima che inizi la funzione containerMovements.innerHTML = "";
	})
};

//adesso calcoliamo e stampiamo il saldo utilizzando reduce
const calcDisplayBalance = function(account) {
	account.balance = account.movements.reduce((acc, mov) => acc + mov, 0);
	labelBalance.textContent = `${account.balance}€`;
};

//adesso calcoliamo il totale dei depositi, dei prelievi, e 
//gli interessi che applica la banca
const calcDisplaySummary = function(account) {
	const incomes = account.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
	labelSumIn.textContent = `${incomes}€`;

	const outcomes = account.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
	labelSumOut.textContent = `${Math.abs(outcomes)}€`;

	const interest = account.movements.filter(mov => mov > 0).map(deposit => (deposit * account.interestRate) / 100).reduce((acc, int) => acc + int, 0);
	labelSumInterest.textContent = `${interest}€`;
};

//adesso utilizziamo forEach e map per creare un username
//per ogni account dell'app 
const createUsernames = function(accs) {
	accs.forEach(function(acc) {
		acc.username = acc.owner.toLowerCase().split(" ").map(name => name[0]).join("");
	});
};

createUsernames(accounts);

const updateUI = function(account) {
	//mostra i movimenti
	displayMovements(account.movements);
	//mostra il saldo
	calcDisplayBalance(account);
	//mostra il riepilogo
	calcDisplaySummary(account);
};
//adesso implementiamo la login
let currentAccount;

btnLogin.addEventListener("click", function(e) {
	//per impedire l'invio del modulo
	e.preventDefault();

	currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
	console.log(currentAccount);

	if (currentAccount?.pin === Number(inputLoginPin.value)) {
		//mostra UI e il messaggio di benvenuto
		labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(" ")[0]}`;
		containerApp.style.opacity = 100;
		//pulire i campi di inserimento (user and PIN)
		inputLoginUsername.value = "";
		inputLoginPin.value = "";
		//		inputLoginPin.blur(); questo metodo permette di annullare il focus sul campo PIN
		//aggiorna la UI
		updateUI(currentAccount);
	}
});

//adesso implementiamo il trasferimento di denaro
btnTransfer.addEventListener("click", function(e) {
	e.preventDefault();
	const amount = Number(inputTransferAmount.value);
	const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
	//ripulire i campi transfer to and amount
	inputTransferTo.value = "";
	inputTransferAmount.value = "";
	//posso inviare soldi solo se l'utente possiede più denaro
	//della somma inviata, deve essere un numero positivo e ovviamente
	//non posso inviare soldi al conto dello stessso utente
	if (amount > 0 && receiverAcc && currentAccount.balance >= amount && receiverAcc?.username !== currentAccount.username) {
		//aggiungo i soldi inviati al ricevitore e tolgo la stessa
		//somma a chi invia il denaro
		currentAccount.movements.push(-amount);
		receiverAcc.movements.push(amount);

		//aggiorna la UI
		updateUI(currentAccount);
	}
});

//implementiamo la sezione in cui la banca ci concede un prestito
//con l'unica regola che essa lo concede solo se tra i depositi 
//c'è una somma che sia almeno pari al 10% della somma richiesta
//come prestito e utilizzeremo il metodo some

btnLoan.addEventListener("click", function(e) {
	e.preventDefault();

	const amount = Number(inputLoanAmount.value);

	if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
		//aggiungiamo il movimento (prestito) al balance
		currentAccount.movements.push(amount);

		//aggiorna la UI
		updateUI(currentAccount);
	}
	//pulire il campi di inserimento (Amount)
	inputLoanAmount.value = "";
});


//implementiamo la sezione close account in cui semplicemente
//eliminiamo un account togliendolo dall'array e utilizzeremo 
//il metodo findIndex
btnClose.addEventListener("click", function(e) {
	e.preventDefault();

	if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) {
		const index = accounts.findIndex(account => account.username === currentAccount.username);
		//cancelliamo l'utente
		accounts.splice(index, 1);
		//adesso per il logout basta rendere la UI invsibile
		containerApp.style.opacity = 0;
	}
	//pulire i campi di inserimento (Confirm user and Confirm PIN)
	inputCloseUsername.value = "";
	inputClosePin.value = "";
	labelWelcome.textContent = `Log in to get started`;
});

//adesso implementiamo il bottone sort 
let sorted = false;

btnSort.addEventListener("click", function(e) {
	e.preventDefault();
	displayMovements(currentAccount.movements, !sorted);
	sorted = !sorted;
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
/*
const currencies = new Map([
	['USD', 'United States dollar'],
	['EUR', 'Euro'],
	['GBP', 'Pound sterling'],
]);
*/
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
//simple array methods
/*
let arr = ["a", "b", "c", "d", "e"];

//SLICE
//con il metodo slice possiamo estrarre una parte di array senza
//modificare l'array originale
console.log(arr.slice(2));//restituisce un nuovo array che parte 
//dalla posizione 2 fino alla fine dell'array 
console.log(arr.slice(2, 4));//restituisce un nuovo array che parte 
//dalla posizione 2 fino alla 4, il parametro end è esclusivo
//quindi il nuovo array sarà ["c", "d"]
console.log(arr.slice(-2));//restituisce un nuovo array che prende
//gli ultimi due elementi
console.log(arr.slice(1, -2));//restituisce un nuovo array che parte 
//dalla posizione 1 estraendo tutto il resto dell'array fuorchè
//gli ultimi due elementi

//SPLICE
//il metodo splice funziona esattamente come lo slice con l'unica
//differenza che questo cambia l'array originale senza restituirne
//uno nuovo
console.log(arr.splice(-1));//modifica l'array eliminando l'ultimo 
//elemento infatti se andiamo a stampare l'array originale è 
//["a", "b", "c", "d"]
console.log(arr);
console.log(arr.splice(1, 2));//il primo parametro è la posizione
//da cui vogliamo estrarre mentre il secondo rappresenta la quantità
//di elementi che vogliamo estrarre
console.log(arr);

//REVERSE
//il metodo reverse ritorna l'array originale in maniera inversa
//quindi non ritorna un nuovo array
arr = ["a", "b", "c", "d", "e"];
const arr2 = ["j", "i", "h", "g", "f"];
console.log(arr2.reverse());
console.log(arr2);

//CONCAT
//questo metodo viene usato per concatenare due array
const letters = arr.concat(arr2);
console.log(letters);
//concat è uguale ad utilizzare lo spread operator
console.log([...arr, ...arr2]);

//JOIN
//restituisce una stringa con ogni singolo elemento dell'array
//diviso dal parametro passato in join
console.log(letters.join(" - "));

//AT
//nel nuovo js esiste un nuovo metodo at() che restituisce l'elemento
//presente alla posizione passata nel metodo
const arr = [23, 11, 64];
console.log(arr[0]);//per prendere l'elemento in prima posizine
//generalmente facciamo cosi
console.log(arr.at(0));//col nuovo js sipuò fare anche cosi
//supponiamo di non conoscere la lunghezza dell'array e per estrarre
//l'ultimo elemeto faremmo cosi
console.log(arr[arr.length - 1]);//oppure
console.log(arr.slice(-1)[0]);
//con il metodo at si può fare più velocemtne
console.log(arr.at(-1));
//il meotod at funziona anche sulle stringhe
console.log("jonas".at(-1));
*/
//////////////////////////////////////////////////////////////////
//looping arrays forEach
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
//stampiamo una stringa in cui definiamo i prelievi e i depositi fatti

for (const movement of movements) {
	if (movement > 0) {
		console.log(`You deposited ${movement}`);
	} else {
		console.log(`You withdrew ${Math.abs(movement)}`);
	}
}

//adesso utilizzimao il forEach il quale ha bisogno di una funzione 
//che restiuisca qualcosa
console.log("------- FOREACH --------");
movements.forEach(function(movement) {
	if (movement > 0) {
		console.log(`You deposited ${movement}`);
	} else {
		console.log(`You withdrew ${Math.abs(movement)}`);
	}
})

//per accedere all'indice di pgni elemento con il ciclo for of 
for (const [i, movement] of movements.entries()) {
	if (movement > 0) {
		console.log(`Movement: ${i + 1}: You deposited ${movement}`);
	} else {
		console.log(`Movement: ${i + 1}: You withdrew ${Math.abs(movement)}`);
	}
}

//con il forEach invece
console.log("------- FOREACH --------");
movements.forEach(function(movement, index, arr) {//ricordiamo 
	//che il forEach passa nell'elemento corrente, nell'indice e nell'
	//intero array in cui viene effettuato il ciclo
	if (movement > 0) {
		console.log(`Movement: ${index + 1}: You deposited ${movement}`);
	} else {
		console.log(`Movement: ${index + 1}: You withdrew ${Math.abs(movement)}`);
	}
})

//la differenza tra il ciclo for e il foreach è che in quest'ultimo
//non puoi uscire dal ciclo (ovvero non si può utilzzare continue
// o break).

//il metodo foreach si può utilizzare anche sulle mappe e sui sets
//Map
const currencies = new Map([
	['USD', 'United States dollar'],
	['EUR', 'Euro'],
	['GBP', 'Pound sterling'],
]);

currencies.forEach(function(value, key, map) {
	console.log(`${key}: ${value}`);
})

//Set
const currenciesUnique = new Set(["USD", "GBP", "USD", "EUR", "EUR"]);
console.log(currenciesUnique);
currenciesUnique.forEach(function(value, key, map) {
	console.log(`${key}: ${value}`);
})
*/
//////////////////////////////////////////////////////////////////
//data transformations: map, filter, reduce
/*
//MAP
//con questo metodo si può ciclare un array, funziona un pò
//come il forEach con l'unica differenza  che map restiruisce un nuovo
//array ottenuto dal risultato della funzione passata come
//parametro
//esempio supponiamo di voler cambiare la valuta di alcuni valori
//da € a $
console.log("------MAP------");
const eurToUsd = 1.1;

const movementsUSD = movements.map(function(mov) {
	return mov * eurToUsd;
});
console.log(movements);
console.log(movementsUSD);

//adesso utilizzo arrow function
const movementsUSDArrow = movements.map(mov => mov * eurToUsd);

console.log(movementsUSDArrow);

//il metodo map come il forEach può scorrere oltre l'elemenmto 
//anche l'indice e l'intero array
const movementsDescriptions = movements.map((movement, index, arr) => {//ricordiamo 
	if (movement > 0) {
		return `Movement: ${index + 1}: You deposited ${movement}`;
	} else {
		return `Movement: ${index + 1}: You withdrew ${Math.abs(movement)}`;
	}
});

console.log(movementsDescriptions);

//FILTER
//questo metodo cicla l'array originale e ne restituisce uno nuovo
//contenetnte elementi che soddisfino una detreminata condizione
console.log("------FILTER------");
//creiamo un array in cui insetriamo solo i depositi
const deposits = movements.filter(function(mov) {
	return mov > 0;
});
//e uno in cui inseriamo solo i prelievi
const withdrawals = movements.filter(function(mov) {
	return mov < 0;
});

console.log(movements);
console.log(deposits);
console.log(withdrawals);

//REDUCE
//questo metodo riduce tutti gli elementi di un array a un singolo
//valore
console.log("------REDUCE------");
//sommiamo tutti i valori dell'array movements
console.log(movements);
const balance = movements.reduce(function(acc, mov, i, arr) {//il primo parametro
//della funzione si chiama acculumatore, e rappresenta un contenitore
//che cresce per quanti elementi possiede l'array
	console.log(`Iteration ${i}: ${acc}`);
	return acc + mov;
}, 0);//reduce contiene anche un secondo parametro che rappresenta
	  //il valore iniziale da dare all'accumulatore
	  
console.log(balance);

//adesso voglio ottenere il valore massimo dell'array movements
const maxValue = movements.reduce(function(acc, mov) {
	if(acc > mov) return acc;
	else return mov;
}, movements[0]);

console.log(maxValue);
*/
/////////////////////////////////////////////////////////////////
//the magic og chaining methods
/*
//utilizziamo questi ultimi tre metodi concatenandoli
const eurToUsd = 1.1;
const totalDepositsUSD = movements.filter(mov => mov > 0).map(mov => mov * eurToUsd).reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);
*/
/////////////////////////////////////////////////////////////////
//the find method
/*
//questo metodo recupera un elemento dell'array in base a una 
//condizione, funziona similmente a filter con l'unica differenza
//che find non restiuisce un nuovo array ma solamente il primo 
//elemento che soddisfi la condizione
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

//adesso utilizziamo il metodo find per trovare un oggetto di 
//accounts che soddisfi una determinata proprietà
console.log(accounts);

const account = accounts.find(acc => acc.owner === "Jessica Davis");
console.log(account);

//con il metodo for of
for(const account of accounts) if(account.owner === "Jessica Davis") console.log(account);
*/
/////////////////////////////////////////////////////////////////
//findIndex method
/*
//questo metodo funziona come il find solo che ritorna l'indice
//dell'elemento e non l'elemento stesso
*/
/////////////////////////////////////////////////////////////////
//some and every methods
/*
//SOME
//il metodo includes, studiato prima, verifica se è presente 
//un determinato valore dentro l'array e ritorna true or false
console.log(movements);
console.log(movements.includes(-130));

//il metodo some invece può verificare se un elemento è presente
//o meno seguendo una condizione
//ad esempio vogliamo sapere se dentro l'arry movements sono 
//presenti depositi (quindi solo valori positivi)

const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);

//EVERY
//questo metodo è simile a some con l'unica differenza che questo
//ritorna true solo se tutti gli elementi presenti nell'array
//soddisfnao la condizione
console.log(movements.every(mov => mov > 0));
*/
//////////////////////////////////////////////////////////////////
//flat and flatMap methods
/*
//FLAT
//supponiamo di avere un array di array e di voler unificare tutti
//i valori in un unico grande array
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
//utilizzando il metodo flat si possono eliminare gli array 
//nidificati e unificare tutto in un unico array
console.log(arr.flat());

//supponiamo ora di avere un array ancora più nidificato
const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
//flat può avere come parametro un valore che indica il livello 
//di nidifcazion ovvero in arr abbiamo un livello 1 (array di array)
//in arrDeep abbiamo un livello 2 (array di array di array), quindi
//in questo caso passando 2 si otterrà di nuovo un unico array con 
//tutti i valori
console.log(arrDeep.flat(2));

//un use case interessante per questo metodo è che la banca vuole
//ottenere il totale dei movimenti di tutti gli utenti
//prima di tutto creiamo un nuovo array contenetnte tutti gli array 
//dei movements di ogni singolo utente
const accountMovements = accounts.map(account => account.movements);
console.log(accountMovements);
//adesso abbiamo un array con altri array nidifcati quindi 
//utilizziamo flat
const allMovements = accountMovements.flat();
console.log(allMovements);
//ora che abbiamo un singolo array con tutti i movimenti di tutti
//gli utenti utilizziamo reduce per ottenere la somma di tutti
const overalBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

//FLATMAP
//questo metodo combina in un solo metodo sia il metodo map
//che il metodo flat, riscriviamo lo use case precedente
//concatenando tutti i metodi
const overalBalance2 = accounts.map(account => account.movements).flat().reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance2);
//come possiamo notare utilizziamo sia il map che il flat nella 
//stessa riga quindi con flatMap diventerebbe così
const overalBalance3 = accounts.flatMap(account => account.movements).reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance3);
//a differenza di flat, flatMap non possiede livelli di 
//nidificazione quindi in caso di array di array non si può
//utilizzare flatMap.
*/
/////////////////////////////////////////////////////////////////
//sorting arrays
/*
//Strings
//il metodo sort ordina gli elementi ma trasforma l'array originale
const owners = ["Jonas", "Zach", "Adam", "Martha"];
console.log(owners.sort());
//infatti se andiamo ora a stampoare owners ci renderemo conto che
//adesso è mutato
console.log(owners);

//Numbers
console.log(movements);
console.log(movements.sort());
//con i numeri il metodo sort non funziona come dovrebbe quindi
//è applicabile solo con le stringhe. In pratica in presenza di
//numeri sort trasforma i numeri in stringhe e dopo li ordina,
//quindi in presenza di numeri si passa una funzione di
//ordinamento a sort

//la funzione di ordinamento segue la regola che se a > b 
//ritorna un valore > 0 a sarà messo prima di b, 
//altrimenti se a < b e ritorna un valore < 0 
//allora b sarà prima di a

//ordinamento crescente
movements.sort((a, b) => {//la funzione passata possiede du parametri
//a rappresenta il valore corrente mentre b quello successivo	
	if(a > b) return 1;
	if(b > a) return -1;
});
console.log(movements);

//ordinamento decrescente
movements.sort((a, b) => {	
	if(a > b) return -1;
	if(b > a) return 1;
});
console.log(movements);

//questo si può semplificare semplicemnte ritornando a - b
//nel primo caso e b - a nel secondo caso 

//ordinamento crescente
movements.sort((a, b) => a - b);
console.log(movements);

//ordinamento decrescente
movements.sort((a, b) => b - a);
console.log(movements);
*/
//////////////////////////////////////////////////////////////////
//more ways of creating and filling arrays
/*
//finora abbiamo creato gli arrays manualnmente
console.log([1, 2, 3, 4, 5, 6, 7]);
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

//ma si possono creare gli arrays anche in maniera programmatica
//in diversi modi

//quello più semplice è usare la funzione Array passando un solo
//argomento, in questo modo si crea un array vuoto della lunghezza
//del numero passato
const x = new Array(7);
console.log(x);

//utilizzando il metodo fill possiamo riempire l'array

//x.fill(1);
//console.log(x);//[1, 1, 1, 1, 1, 1, 1]

//il metodo fill ha come secondo parametro la posizione da cui
//riempire l'array ed eventualmente un terzo parametro che 
//rappresenta la posizione fino a doce riempire l'array

//x.fill(1, 3);
//console.log(x);//[empty * 3, 1, 1, 1, 1]

x.fill(1, 3, 5);
console.log(x);//[empty * 3, 1, 1, empty * 2]
//ovviamente fill si può utilizzare anche su array non vuoti
const arr = [1, 2, 3, 4, 5, 6, 7];
arr.fill(23, 2, 6);
console.log(arr);//[1, 2, 23, 23, 23, 23, 7]

//creare un array utilizzando Array.from()
const y = Array.from({ length: 7 }, () => 1);
console.log(y);//[1, 1, 1, 1, 1, 1, 1]
//const z = Array.from({length: 7}, (cur, i) => i + 1);//in questo 
//caso non stiamo usando il parametro cur quindi in questi casi
//si usa come convenzione il _ per far capire che non si sta 
//utilizzando quel parametro
const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);//[1, 2, 3, 4, 5, 6, 7]

//Array.from() è stato creato per convertire un iterable (string,
//maps or sets) in array
//un interessante use case è ad esempio ottenere da un API dei 
//valori tramite querySelectorAll, il quale trasforma i dati in 
//una lista di nodi, la quale si può convertire in un array
//ad esempio supponiamo di voler prendere tutti i movimenti del
//saldo di Bankist direttamente dalla UI

labelBalance.addEventListener("click", function() {
	const movementsUI = Array.from(document.querySelectorAll(".movements__value"), el => Number(el.textContent.replace("€", "")));
	console.log(movementsUI);
});
*/
/////////////////////////////////////////////////////////////////
//array methods practice

//1. vogliamo calcolare il totale dei depositi nell'app Bankist di 
//tutti gli utenti
const bankDepositSum = accounts.map(account => account.movements)
	.flat().filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);

console.log(bankDepositSum);

//2. vogliamo contare quanti depositi ci sono stati in banca
//con importi di almeno 1000 €

//const numDeposits1000 = accounts.flatMap(account => account.movements)
//.filter(mov => mov >= 1000).length;

//un altro modo potrebbe essere utilizzando il metodo reduce

const numDeposits1000 = accounts.flatMap(account => account.movements)
	//.reduce((acc, mov) => mov >= 1000 ? acc + 1 : acc, 0);
	//.reduce((acc, mov) => mov >= 1000 ? acc++ : acc, 0);//utilizzando
	//l'operatore ++ darà 0 poichè in questo caso ad ogni iterazione
	//l'operatore ++ restituisce prima il valore corrente e dopo lo 
	//incrementa, quindi utilizzeremo ++ prima del valore cosicchè
	//prima venga incremenetao il vsalore e dopo restituito
	.reduce((acc, mov) => mov >= 1000 ? ++acc : acc, 0);
console.log(numDeposits1000);

//3.utilizziamo il metodo reduce per restituire un oggetto, perchè
//ricordiamo che reduce riduce un array in un valore che può 
//essere anche un oggetto, o un altro array etc, in questo caso
//restituirà un oggetto con tutti i prelievi e versamenti

const { deposits, withdrawals } = accounts.flatMap(account => account.movements)
	.reduce((accs, cur) => {
		//cur > 0 ? accs.deposits += cur : accs.withdrawals += cur;
		accs[cur > 0 ? "deposits" : "withdrawals"] += cur;
		return accs;
	}, { deposits: 0, withdrawals: 0 });

console.log(deposits, withdrawals);

//trsformazione di un esempio del metodo filter utilizzando solo
//il metodo reduce
//const deposits = movements.filter(function(mov) {
//	return mov > 0;
//});

const depositsReduce = movements.reduce((accs, cur) => {
	cur > 0 ? accs.push(cur) : "il valore corrente è negativo";
	return accs;
}, []);

console.log(depositsReduce);

//4.adesso creiamo una funziona che trasformi qualsiasi stringa 
//in un altra con alcune lettere maiuscole ad esmepio
//this is a nice title -> This Is a Nice Title

const convertTitleCase = function(title) {
	const exceptions = ["a", "an", "and", "the", "but", "or", "on", "in", "with"];

	const titleCase = title.toLowerCase().split(" ")
		.map(word => exceptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1))
		.join(" ");
	return titleCase;
};

console.log(convertTitleCase("this is a nice title"));
console.log(convertTitleCase("this is a LONG title but not too long"));
console.log(convertTitleCase("and here is another title with an EXAMPLE"));

