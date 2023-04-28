'use strict';

//Constructor Functions and the new Operator
/*
//possiamo usa le constructor functions per creare oggetti 
//utilizzando le funzioni. Le constructor functions non sono altro
//che normali funzion icon l'unica differenza che per chiamarle 
//bisogna utilizzare la keyword new, per convenzione il nome
//di queste funzioni inizia sempre con la lettera maiuscola, inoltre
//per dichiararale non si utilizzano mai le arrow function poichè 
//queste non possiedono la keyword new
const Person = function(firstname, birthYear) {
	//instance properties
	this.firstname = firstname;
	this.birthYear = birthYear;
};

const jonas = new Person("Jonas", 1991);
console.log(jonas);

const matilda = new Person("Matilda", 2017);
const jack = new Person("Jack", 1975);
console.log(matilda, jack);

console.log(jonas instanceof Person);

//static method
Person.hey = function() {
	console.log("Hey there");
	console.log(this);
}

Person.hey();

///////////////////////////////////////////////////////////////////
//Prototypes

//per creare metodi per un oggetto si usa la proprietà prototype
//presente in qualsisi oggetto creato
console.log(Person.prototype);

Person.prototype.calcAge = function() {
	console.log(2037 - this.birthYear);
};

jonas.calcAge();
matilda.calcAge();
jack.calcAge();

console.log(jonas.__proto__);
console.log(jonas.__proto__ === Person.prototype);

console.log(Person.prototype.isPrototypeOf(jonas));
console.log(Person.prototype.isPrototypeOf(matilda));
console.log(Person.prototype.isPrototypeOf(Person));

//possiamo anche impostare delle proprietaà su prototype
Person.prototype.species = "Homo Sapiens";
console.log(jonas.species, matilda.species);
//esiste un metodo per capire se alcune proprietà appartengono
//ad un oggetto (quindi queste proprietà sono state create all'
//interno dell'oggetto stesso), oppure se non appartengono all'
//oggetto, uindi come sopra se create direttamnte su prototype
console.log(jonas.hasOwnProperty("firstname"));
console.log(jonas.hasOwnProperty("species"));

///////////////////////////////////////////////////////////////////
//Prototypal Inheritance on Built-In Objects

//jonas prototype
console.log(jonas.__proto__);
//Object prototype (top of prototype chain)
console.log(jonas.__proto__.__proto__);
console.log(jonas.__proto__.__proto__.__proto__);

const arr = [3, 6, 4, 5, 6, 9, 3];
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);

const h1 = document.querySelector("h1");
console.dir(x => x + 1);
*/
///////////////////////////////////////////////////////////////////
//ES6 Classes
/*
//class expression
//const PersonCl = class {

//};
//class declaration simile a java
class PersonCl {
	constructor(fullName, birthYear) {
		this.fullName = fullName;
		this.birthYear = birthYear;
	}
	
	//Instance methods
	//methods will be added to .prototype property
	calcAge() {
		console.log(2037 - this.birthYear);
	}

	greet() {
		console.log(`Hey ${this.firstName}`);
	}

	get age() {
		return 2037 - this.birthYear;
	}

	set fullName(name) {
		console.log(name);
		if (name.includes(" ")) this._fullName = name;
		else alert(`${name} is not a full name!`)
	}

	get fullName() {
		return this._fullName;
	}
	
	//Static method
	static hey() {
		console.log("Hey there");
		console.log(this);
	}
};

const jessica = new PersonCl("Jessica Davis", 1996);
console.log(jessica);
jessica.calcAge();
console.log(jessica.age);
jessica.greet();

//1 Classes are NOT hoisted
//2 Classes are first-class citizens
//3 Classes are executed in strict mode

const walter = new PersonCl("Walter White", 1965);

PersonCl.hey()
//////////////////////////////////////////////////////////////////
//Setters and Getters

//prima vediamo come funzionano get and set pe un oggetto normale 
const account = {
	owner: "jonas",
	movements: [200, 530, 120, 300],

	get latest() {
		return this.movements.slice(-1).pop();
	},

	set latest(mov) {
		this.movements.push(mov);
	},
};

console.log(account.latest);

account.latest = 50;
console.log(account.movements);

//adesso vediamo come funzionano sulle classi (vedi su)

//////////////////////////////////////////////////////////////////
//Static Methods

//i metodi statici non sono altro che dei metodi appartengono
//solo al costruttore e quindi non al prototype, quindi non si 
//eredita tra oggetti. Due use case utili sono ad esmepio il 
//metodo from() di Array e parseInt() di Number. Questi sono
//metodi statici perchè si possono utilizzare chiamnado solo 
//Array o Number, non funziona se li chiami direttamente o su
//un array o su un numero.
//Array.from(); si
//Number.parseInt(); si
//[0, 1, 2].from(); no
//12.parseInt(); no
*/
//////////////////////////////////////////////////////////////////
//Object.create
/*
const PersonProto = {
	calcAge() {
		console.log(2037 - this.birthYear);
	},
	
	init(firstName, birthYear) {
		this.firstName = firstName;
		this.birthYear = birthYear;
	}
};

const steven = Object.create(PersonProto);
console.log(steven);
steven.name = "Steven";
steven.birthYear = 2002;
steven.calcAge();

console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init("Sarah", 1979);
sarah.calcAge();
*/
//////////////////////////////////////////////////////////////////
//Inheritance Between "Classes": Constructor Functions
/*
const Person = function(firstname, birthYear) {
	this.firstname = firstname;
	this.birthYear = birthYear;
};

Person.prototype.calcAge = function() {
	console.log(2037 - this.birthYear);
};

const Student = function(firstname, birthYear, course) {
	Person.call(this, firstname, birthYear);
	this.course = course;
};

//Linking prototypes
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function() {
	console.log(`My name is ${this.firstname} and I study ${this.course}`);
}
const mike = new Student("Mike", 2020, "Computer Science");
console.log(mike);
mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student);
console.log(mike instanceof Person);
console.log(mike instanceof Object);

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);
*/
//////////////////////////////////////////////////////////////////
//Inheritance Between "Classes": ES6 Classes
/*
//usiamo l'ereditarietà tra classi utilizzando le es6 classes, io 
//che vengo da java è molto simile
class PersonCl {
	constructor(fullName, birthYear) {
		this.fullName = fullName;
		this.birthYear = birthYear;
	}
	
	//Instance methods
	//methods will be added to .prototype property
	calcAge() {
		console.log(2037 - this.birthYear);
	}

	greet() {
		console.log(`Hey ${this.firstName}`);
	}

	get age() {
		return 2037 - this.birthYear;
	}

	set fullName(name) {
		if (name.includes(" ")) this._fullName = name;
		else alert(`${name} is not a full name!`)
	}

	get fullName() {
		return this._fullName;
	}
	
	//Static method
	static hey() {
		console.log("Hey there");
		console.log(this);
	}
};

class StudentCl extends PersonCl{
	constructor(fullName, birthYear, course) {
		super(fullName, birthYear);
		  this.course = course;
	}
	
	introduce() {
		console.log(`My name is ${this.fullName} and I study ${this.course}`);
	}
	
	calcAge() {
		console.log(`I'm ${2037 - this.birthYear} years old, but as a student I feel more like ${2037 - this.birthYear + 10}`);
	}
};

//se non si aggiungono altri parametri nella classe da estendere,
//in questo caso StudentCl, non c'è bisogno di dichiarare super(),
//poichè eredita i parametri dalla classe PersonCl quindi ad 
//esempio:
//const martha = new StudentCl("Martha Jones", 2012);
const martha = new StudentCl("Martha Jones", 2012, "Computer Science");
martha.introduce();
martha.calcAge();
*/
//////////////////////////////////////////////////////////////////
// Inheritance Between "Classes": Object.create
/*
//usiamo l'ereditarietà tra classi utilizzando Object.create()
const PersonProto = {
	calcAge() {
		console.log(2037 - this.birthYear);
	},

	init(firstName, birthYear) {
		this.firstName = firstName;
		this.birthYear = birthYear;
	}
};

const steven = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function(firstName, birthYear, course) {
	PersonProto.init.call(this, firstName, birthYear);
	this.course = course;
};

StudentProto.introduce = function() {
	console.log(`My name is ${this.firstName} and I study ${this.course}`);
};
const jay = Object.create(StudentProto);
jay.init("Jay", 2010, "Computer Science");
jay.introduce();
jay.calcAge();
*/
//////////////////////////////////////////////////////////////////
// Another Class Example
/*
class Account {
	// 1) public fields (instances)
	locale = navigator.language;
	
	// 2) private fields (instances)
	#movements = [];
	#pin;
	
	constructor(owner, currency, pin) {
		this.owner = owner;
		this.currency = currency;
		//protected property
		this.#pin = pin;
		//this._movements = [];
		//this.locale = navigator.language;
		console.log(`Thanks for opening an account, ${owner}`);
	};
	
	// 3) public methods 
	getMovements() {
		return this.#movements;
	};

	deposit(val) {
		this.#movements.push(val);
		return this;
	};

	withdraw(val) {
		this.deposit(-val);
		return this;
	};

	requestLoan(val) {
		//if (this.#approveLoan(val)) { 
		if (this._approveLoan(val)) { 
		this.deposit(val);
		console.log("Loan approved!");
		return this;
		}
	}
	
	// 4) private methods
	//#approveLoan(val) { i metodi privati non sono ancora supportati
	_approveLoan(val) {
		return true;
	}
};

const acc1 = new Account("Jonas", "EUR", 1111);

//acc1.movements.push(250);
//acc1.movements.push(-140);

acc1.deposit(250);
acc1.withdraw(140);

console.log(acc1);
acc1._approveLoan(1000);
acc1.requestLoan(1000);

//////////////////////////////////////////////////////////////////
//Encapsulation: Protected Properties and Methods
console.log(acc1.getMovements());

//////////////////////////////////////////////////////////////////
//Encapsulation: Private Class Fields and Methods

// 1) public fields, per rendere pubblici dei campi basta 
//    dichiararli prima del costruttore senza l'utilizzo di const
//    o let;
// 2) private fields, per renderli privati basta utilizzare il 
//    simbolo # prima della dichiarazione 
// 3) public methods
// 4) private methods

//console.log(acc1.#movements);

//////////////////////////////////////////////////////////////////
//Chaining Methods

//pre creare una concatenazione di metodi basta far ritornare l'
//account stesso ad ogni metodo 
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
console.log(acc1.getMovements());
*/


