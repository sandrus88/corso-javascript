'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");

///////////////////////////////////////
// Modal window

const openModal = function(e) {
	e.preventDefault();
	modal.classList.remove('hidden');
	overlay.classList.remove('hidden');
};

const closeModal = function() {
	modal.classList.add('hidden');
	overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

//for (let i = 0; i < btnsOpenModal.length; i++)
// btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function(e) {
	if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
		closeModal();
	}
});

///////////////////////////////////////
//Button scrolling
btnScrollTo.addEventListener("click", function(e) {
	const s1coords = section1.getBoundingClientRect();
	console.log(s1coords);

	console.log(e.target.getBoundingClientRect());

	console.log("Current scroll (X/Y)", window.pageXOffset, window.pageYOffset);

	console.log("height/width viewport", document.documentElement.clientHeight, document.documentElement.clientWidth);

	//scrolling
	section1.scrollIntoView({ behavior: "smooth" });
});

///////////////////////////////////////
//page navigation

//utilizziamo il forEach() per creare lo scroll alla sezione deiderata
//per ogni elemento, questo approccio andrebbe bene se, come in 
//questo caso, ci sono solo tre elementi, ma immagianimao di avere 
//tanti elementi a cui applicare lo scroll verrebbe pesante da gestire

//document.querySelectorAll(".nav__link").forEach(function(el) {
//	el.addEventListener("click", function(e) {
//		e.preventDefault();
//	 	const id = this.getAttribute("href");
//	 	console.log(id);
//	 	document.querySelector(id).scrollIntoView({behavior: "smooth"});
//	})
//});

//ecco perchè si usa la delegazione degli eventi tramite il bubbling
//si seleziona un padre comune agli elementi desiderati cosicchè
//si propaghi dal figlio al padre

//1.aggiungiamo un event listener ad un padre comune
//2.determiniamo quale elemento ha originato l'evento

document.querySelector(".nav__links").addEventListener("click", function(e) {
	e.preventDefault();

	if (e.target.classList.contains("nav__link")) {
		const id = e.target.getAttribute("href");
		document.querySelector(id).scrollIntoView({ behavior: "smooth" });
	}
});

///////////////////////////////////////
//tabbed components
//utilizziamo la delegazione di eventi per assegnare ad ogni singolo
//bottone l'evento da svolgere, quindi utilizziamo il padre comune,
//in questo caso tabsContainer

tabsContainer.addEventListener("click", function(e) {
	//const clicked = e.target;//ogni bottone possiede all'interno
	//un elemento span, che sarebbe il numero, quindi se clicco
	//sul numero mi ritorna span mentre se clicco sul resto del
	//bottone mi ritorna il bottone stesso. Per ovviare a questo
	//prolema anche qui utilizzaremo il metodo closest() con 
	//parametro la classe del bottone cosicchè se clicco su span 
	//ritornerà il padre e quindi il bottone stesso
	const clicked = e.target.closest(".operations__tab");
	//clicked.classList.add("operations__tab--active");//qui ci rendiamo
	//conto che se faccio click al di fuori del bottone ma sullo 
	//stesso div tornerà null poichè non è stato trovato nessun
	//padre di operations__tab e quindi darà errore poichè 
	//null.classList e quindi non si può leggere la proprietà
	//classList di null, per ovviare ciò si fa un controllo prima

	//guard clause
	if (!clicked) return;//questo è un modo più moderno per fare un
	//controllo poichè se clicked non esiste ritorna immediatamente
	//senza eseguire il resto del codice, nella versione classica
	//avremmo fatto
	//if(clicked) clicked.classList.add("operations__tab--active");

	//remove active classes
	tabs.forEach(t => t.classList.remove("operations__tab--active"));
	tabsContent.forEach(c => c.classList.remove("operations__content--active"));

	//active tab
	clicked.classList.add("operations__tab--active");

	//active content area
	document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add("operations__content--active");
});

///////////////////////////////////////
//menu fade animation
const handleHover = function(e) {
	if (e.target.classList.contains("nav__link")) {
		const link = e.target;
		const siblings = link.closest(".nav").querySelectorAll(".nav__link");
		const logo = link.closest(".nav").querySelector("img");

		siblings.forEach(el => {
			if (el !== link) el.style.opacity = this;
		});
		logo.style.opacity = this;
	}
}

//nav.addEventListener("mouseover", function(e) {
//	handleHover(e, 0.5);
//});

//nav.addEventListener("mouseout", function(e) {
//	handleHover(e, 1);
//});

//passing "argument" into handler
nav.addEventListener("mouseover", handleHover.bind(0.5));

nav.addEventListener("mouseout", handleHover.bind(1));

///////////////////////////////////////
//sticky navigation
//const initialCoords = section1.getBoundingClientRect();
//console.log(initialCoords);
//window.addEventListener("scroll", function() {
//	console.log(window.scrollY);
//	if (window.scrollY > initialCoords.top) nav.classList.add("sticky"); else nav.classList.remove("sticky");
//});

//sticky navigation: intersection observer API
//esiste un modo migliore per implementare la sticky navigation
//utilizzando l'intersezione dell'API
//const obsCallback = function(entries, observer) {
//	entries.forEach(entry => {
//		console.log(entry);
//	})
//};

//const obsOptions = {
//	root: null,
//	threshold: [0, 0.2], 
//};

//const observer = new IntersectionObserver(obsCallback, obsOptions);
//observer.observe(section1);

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function(entries) {
	const [entry] = entries;

	if (!entry.isIntersecting) nav.classList.add("sticky");
	else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
	root: null,
	threshold: 0,
	rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

///////////////////////////////////////
//reveal sections
const allSections = document.querySelectorAll(".section");
const revealSection = function(entries, observer) {
	const [entry] = entries;

	if (!entry.isIntersecting) return;
	entry.target.classList.remove("section--hidden");
	observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
	root: null,
	threshold: 0.15,
});
allSections.forEach(function(section) {
	sectionObserver.observe(section);
	//section.classList.add("section--hidden");
});

///////////////////////////////////////
//lazy loading images
//selezioniamo solo le immagini che contengono l'attributo data-src
//poichè queste sono quelle che hanno la risoluzione bassa
const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = function(entries, observer) {
	const [entry] = entries;

	if (!entry.isIntersecting) return;

	//replace src with data-src
	entry.target.src = entry.target.dataset.src;
	//delete lazy-img class
	entry.target.addEventListener("load", function() {
		entry.target.classList.remove("lazy-img");
	})

	observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
	root: null,
	threshold: 0,
	rootMargin: "200px",
});

imgTargets.forEach(img => imgObserver.observe(img));

///////////////////////////////////////
//slider
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");
let curSlide = 0;
const maxSlide = slides.length;

//functions
const createDots = function() {
	slides.forEach(function(_, i) {
		dotContainer.insertAdjacentHTML("beforeend", `<button class = "dots__dot" data-slide = "${i}"></button>`)
	});
};

const activateDot = function(slide) {
	document.querySelectorAll(".dots__dot").forEach(dot => dot.classList.remove("dots__dot--active"));

	document.querySelector(`.dots__dot[data-slide ="${slide}"]`).classList.add("dots__dot--active");
};

const goToSlide = function(slide) {
	slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i - slide)}%)`);
};

//next slide
const nextSlide = function() {
	if (curSlide === maxSlide - 1) {
		curSlide = 0;
	} else {
		curSlide++;
	}
	goToSlide(curSlide);
	activateDot(curSlide);
};

//prevoius slide
const prevSlide = function() {
	if (curSlide === 0) {
		curSlide = maxSlide - 1;
	} else {
		curSlide--;
	}
	goToSlide(curSlide);
	activateDot(curSlide);
};

const init = function() {
	goToSlide(0);
	createDots();
	activateDot(0);
};

init();

//event handlers
btnRight.addEventListener("click", nextSlide);

btnLeft.addEventListener("click", prevSlide);

//implementiamo la funzionalità di scorimento sulle slide utilizzando
//anche i tasti freccia destra e sinistra della tastiera
document.addEventListener("keydown", function(e) {
	console.log(e);
	if (e.key === "ArrowLeft") prevSlide();
	if (e.key === "ArrowRight") nextSlide();
});

//adesso implementiamo i puntini, nel file HTML ogni bottone dot 
//possiede la proprietà data-slide contenete il numero della slide
//di appartenenza
dotContainer.addEventListener("click", function(e) {//useremo la 
	//delegazione di eventi per assegnare ad ogni singolo punto il listener
	//quindi il padre comune dotContainer delegherà ai figli
	if (e.target.classList.contains("dots__dot")) {
		const slide = e.target.dataset.slide;
		goToSlide(slide);
		activateDot(slide);
	}
})

//Selecting, Creating, and Deleting Elements
/*
//selecting elements
console.log(document.documentElement);//per selezionare la pagina intera
console.log(document.head);//per selezionare l'elemento head
console.log(document.body);//per selezionare l'elemento body

//per selezionare detrminati elementi del documento si utilizza
//di più document.querySelector() come negli esempi precedenti

const header = document.querySelector(".header");//seleziona solo il primo elemento della
								  //lista di nodi col nome passato
								  //come parametro
//se invece vogliamo selezionare più elementi con lo stesso nome
const allSelections = document.querySelectorAll(".section");
console.log(allSelections);

//si può selezionare un elemento anche dall'id (se presente)
document.getElementById("section--1");

//si può selezionare un nelemento anche dal tag
const allButtons = document.getElementsByTagName("button");
//getElementsByTagName() ritorna un HTMLCollection ovvero una lista
//che si aggiorna automaticamente se eseguo delle modifiche (ad esempio
//se elimino un bottone etc), cosa che non succede con getElementById()
//poichè ritorna una lista di nodi
console.log(allButtons);

//si può selezionare un nelemento anche dal nome della classe
console.log(document.getElementsByClassName("btn"));//anche questo
//ritorna un HTMLCollection

//creating and inserting elements

const message = document.createElement("div");//si passa come parametro il nome del tag
message.classList.add("cookie-message");//per aggiungere il nome della classe
//message.textContent = "We use cookied for improved functionality and analytics."//per
//aggiungere del testo
message.innerHTML = "We use cookied for improved functionality and analytics. <button class = 'btn btn--close-cookie'>Got it!</button>";//per
//aggiungere del testo e in questi caso un bottone

//adesso creato l'elemento non resta che inserirlo nel DOM in questo
//caso vogliamo inserirlo nel header

//header.prepend(message);//questo metodo aggiunge l'elemento come primo figlio di header
header.append(message);//questo metodo aggiunge l'elemento come ultimo figlio di header
//come vedi non sono stati creati due elementi nel DOM poichè ogni elemento è unico
//se volessimo creare un altro eleemnto message ed inderirne uno come
//primo figlio e l'altro come ultimo figlio di header possiamo utilizzare
//il metodo cloneNode
//header.append(message.cloneNode(true));

//header.before(message);//questo metodo inserisce message prima di header
//header.after(message);//questo metodo inserisce message dopo di header

//delete elements
//adesso premendo il bottone creato elimino l'elemento
document.querySelector(".btn--close-cookie").addEventListener("click", function() {
	message.remove();//il metodo remove è recente prima per eliminare un elemento
					 //si risaliva al padre per poi rimuovere il figlio
	//message.parentElement.removeChild(message);
});
*/
///////////////////////////////////////////////////////////////////
//Styles, Attributes and Classes
/*
//styles
message.style.backgroundColor = "#37383d";//per impostare uno stile
//all'elemento e in questo caso il colore dello sfondo
message.style.width = "120%";//per impostare la larghezza
//style si utilizza per accedere alle proprietà create inline quindi
//se volessimo accedere al background creato prima va bene ma
//s einvece volessimo accedere, ad esempio, alla proprietà color
//presente nel file CSS si deve utilkizzare un altro metodo
console.log(message.style.color);
console.log(message.style.backgroundColor);

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);""

//supponiamo di voler cambiare l'altezza di message
console.log(message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 40 + "px");

//adesso andiamo a modificare le proprietà del file CSS
document.documentElement.style.setProperty("--color-primary", "orangered");

//attributes
//gli attributi in HTML sono tutte le proprietà di ogni singolo
//elemento (src, class, id etc), oviamente in js è possibile
//manipolarli
const logo = document.querySelector(".nav__logo");
console.log(logo.alt);//qui siamo sull'attributo alt
console.log(logo.src);//qui siamo sull'attributo src
console.log(logo.className);//qui siamo sull'attributo class

//se ad esempio aggiungiamo una proprietà non standard (per esempio)
//designer e tentiamo di leggerla
console.log(logo.designer);//questo darà unefined poichè designer
						   //non è un attributo standard
//per leggere degli attributi non standard
console.log(logo.getAttribute("designer"));

//si possono anche settare gli attributi
logo.alt = "Beautiful minimalist logo";
//e creare attributi
logo.setAttribute("company", "Bankist");

//data attributes
//esistono questi tipi speciali di attributi che per accedervi si
//agisce in questo modo ad esempio se aggiungiamo data-version-number
//pe accedervi
console.log(logo.dataset.versionNumber);

//classes
logo.classList.add("c");
logo.classList.remove("c");
logo.classList.toggle("c");
logo.classList.contains("c");
*/
/////////////////////////////////////////////////////////////////
//Implementing Smooth Scrolling
/*
//adesso implementeremo la funzione che permette di scrollare
//fino alla prima sezione, premendo su un bottone e lo faremo in
//due versioni una più vechia e una più moderna
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", function(e) {
	const s1coords = section1.getBoundingClientRect();//questo metodo
	//ritorna la posizione del della sezione features in
	//riferimento alla porzione di schermo visibile
	//(la distanza dal lato sinistro, dal bordo superiore etc)
	console.log(s1coords);

	console.log(e.target.getBoundingClientRect());

	console.log("Current scroll (X/Y)", window.pageXOffset, window.pageYOffset);

	console.log("height/width viewport", document.documentElement.clientHeight, document.documentElement.clientWidth);

	//scrolling old school
	//window.scrollTo(s1coords.left, s1coords.top);

	//questo scroll però non funzionerà bene perchè la proprietà
	//top mkisura la distanza dal bordo superiore ma sempre in
	//riferimneto alla porzione di schermo visibile, quindi per ovviare
	//al problema basta aggiungere alla proprietà il valore della
	//corrdinata y della finestra window.pageYOffset, e alla proprietà
	//left agiungere la coordsinata x window.pageXOffset
	//window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset);

	//per rendere visivamnete lo scroll più bello si usa creare un
	//oggetto con le posizioni fin dove scrollare e aggiungere
	//all'oggetto una proprtietà behavior con valore "smooth"
	//window.scrollTo({
	//	left: s1coords.left + window.pageXOffset,
	//	top: s1coords.top + window.pageYOffset,
	//	behavior: "smooth",
	//});

	//scrolling new school
	section1.scrollIntoView({behavior: "smooth"});
});
*/
//////////////////////////////////////////////////////////////////
//Types of Events and Event Handlers
/*
//in questa lezione vedremo altri tipi di event listeners
const h1 = document.querySelector("h1");
//h1.addEventListener("mouseenter", function(e) {
//questo evento mostra l'alert creato non appena passi con il
//mouse sopra l'h1 in questo caso
//alert("addEventListener: Great! You are reading the heading :D");
//});

//adesso vediamo un altro modo per creare eventi, questa forma è un
//pò vechia diciamo che ora si usa di più addEventListener()
//h1.onmouseenter = function(e) {
//	alert("onmouseenter: Great! You are reading the heading :D");
//};

//addEventListener() è migliore per due motivi
//1) puoi aggiungere allo stesso evento più funzioni, basta solamente
//   modificare la funzione, mentre nell'altro modo la seconda
//   funzione sovrasvriverebbe la prima etc
//2) puoi eventualmente rimuovere il ilistenere se non hai più di
//   bisogno, bisogna esportare la funzione per poi rimuoverla

const alertH1 = function(e) {
	alert("addEventListener: Great! You are reading the heading :D");
};

h1.addEventListener("mouseenter", alertH1);

setTimeout(() => h1.removeEventListener("mouseenter", alertH1), 3000);

//esiste un altro modo per gestire gli eventi direttamente nel
//codice HTML ma questo non dovrebbe mai essere utilizzato basta
//utilizzare onclick e passare una stringa con in questo caso
//l'alert <h1 onclick = "alert('HTML alert')">
*/
//////////////////////////////////////////////////////////////////
//Event Propagation: Bubbling and Capturing
/*
//il bubbling rappresenta la propragazione del evento dai figli
//fino ai padri ecco perchè si chiama bubbling (come fossero
//delle bolle che partono dal basso e poi vanno in alto). Questo
//significa che in presenza di uno stesso evento, se questo viene
//effettuato su un figlio esso si propagherà sui padri. In questo
//caso vogliamo che ad ogni click su un bottone si cambi colore
//(a random) dello sfondo di alcuni elementi
//rgb(255,255,255)
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () => `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector(".nav__link").addEventListener("click", function(e) {
	this.style.backgroundColor = randomColor();//in une event
	//listener this è collegato all'elemento su cui si chiama il
	//gestore di eventi, in questo caso document.querySelector(".nav__link")
	console.log("LINK", e.target, e.currentTarget);//il target
	//rappresenta l'elemento in cui si verifica l'evento (click)
	//mentre il currentTarget rappresenta l'elemento in corrente quindi
	//sostanzialmente currentTarget = this
	console.log(e.currentTarget === this);
	//è possibile fermare la propagazione dell'evento anche se è
	//sconsigliato
	//e.stopPropagation();
});

document.querySelector(".nav__links").addEventListener("click", function(e) {
	this.style.backgroundColor = randomColor();
	console.log("CONTAINER", e.target, e.currentTarget);
});

//per catturare un evento si usa aggiungere un terzo parametro true
//al metodo addEventListener(), in questo caso l'ultimo elemento
//padre sarà catturato e svolto prima degli altri
document.querySelector(".nav").addEventListener("click", function(e) {
	this.style.backgroundColor = randomColor();
	console.log("NAV", e.target, e.currentTarget);
}, true);
*/
//////////////////////////////////////////////////////////////////
//Event Delegation: Implementing Page Navigation (guarda su)
/*
//implementeremo lo scroll per ogni singola sezione prima senza
//la delegazione degli eventi e poi con
*/
//////////////////////////////////////////////////////////////////
//DOM Traversing
/*
//in js si può attraversare il DOM per ricercare, ad esempio, i figli
//o i padri di un elemento etc
const h1 = document.querySelector("h1");

//attraversare il DOM verso il basso per cercare i figli
console.log(h1.querySelectorAll(".highlight"));//cerca tutti i
//figli con classe highlight
console.log(h1.childNodes);//restituisce una lista di nodi con
//tutti gli elementi figli di h1
console.log(h1.children);//restituisce una collezione di soli
//elementi figli contenenti tag HTML
h1.firstElementChild.style.color = "white";//cambia il colore al
//primo elemento figlio di h1
h1.lastElementChild.style.color = "orangered";//cambia il colore
//all'ultimo elemento figlio di h1

//attraversare il DOM verso l'alto per cercare i padri
console.log(h1.parentNode);//restituisce una lista di nodi con
//tutti gli elementi padri di h1
console.log(h1.parentElement);//restituisce l'elemento padre di h1
h1.closest(".header").style.background = "var(--gradient-secondary)";
//delle volte ci serve trovare l'elemento padre che non sia
//il padre diretto dell'elemento selezionato. Supponiamo di
//avere tanti header nella pagina HTML, col metodo closest()
//chiamato su h1 vogliamo ottenere l'header che sia il padre di h1

//attraversare il DOM lateralmente  per cercare i fratelli
console.log(h1.previousElementSibling);//restituisce l'elemento
//fratello prima di h1
console.log(h1.nextElementSibling);//restituisce l'elemento
//fratello dopo h1

console.log(h1.previousSibling);//restituisce una lista di nodi
//del fratello prima di h1
console.log(h1.nextSibling);//restituisce una lista di nodi
//del fratello dopo h1

console.log(h1.parentElement.children);//restituisce una collezione
//di soli elementi fratelli di h1 contenenti tag HTML, cokmpreso h1
//supponiamo di voler ridimensionare tutti i fratelli di h1
//men che h1
[...h1.parentElement.children].forEach(function(el) {
	if(el !== h1) el.style.transform = "scale(0.5)";
});
*/
//////////////////////////////////////////////////////////////////
//Building a Tabbed Component (vedi su)

//implementiamo la funzione di visualizzazione di un contenuto
//cliccando su dei bottoni come se fossero schede di una sezione

//////////////////////////////////////////////////////////////////
//Passing Arguments to Event Handlers (vedi su)

//adesso creaimo un effetto in cui se passiamo il mouse su un link
//tutti gli altri diventano trasaparenti escluso il link in cui 
//è posizionato il mouse

//////////////////////////////////////////////////////////////////
//Implementing a Sticky Navigation: The Scroll Event (vedi su)

//implementiamo un effetto che viene usato tanto nelle pagine web
//ovvero quando la barra di navigazione viene "incollata" alla parte
//superiore della pagina quando si scrolla verso giù, e questo 
//avviene solo quando si giunge ad un determinato punto della pagina

//////////////////////////////////////////////////////////////////
//Revealing Elements on Scroll (vedi su)

//in questa lezione implementeremo una funzione che mostra il 
//contenuto della sezione scrollando verso di essa dando un effetto
//come se scivolasse

//////////////////////////////////////////////////////////////////
//Lazy Loading Images (vedi su)

//qui implementeremo l'effetto dove quando ci si avvicina ad una
//immagine si carica e si rende visibile, la logica che c'è dietro
//e che si parte con la stessa immagine a bassa risoluzione e non
//appena ci si avvicina all'immagine nella pagina web, essa 
//viene sostituita con un altra immagine ma con più alta risoluzione

//////////////////////////////////////////////////////////////////
//Building a Slider Component: Part 1 and Part 2 (vedi su)

//qui implemeteremo la sezione con le slide ed i puntini, quindi
//cliccando sui bottoni delle frecce andrà avanti o indietro nel
//mostrare le slide, se clicco sui puntini andrà nella slide 
//posizionata sul puntino clicclato, la logica per spostarsi nelle
//slide è semplicemente quella di modificare la proprietà 
//transform: translateX e modificarla. La sezione visibile ha come
//valore 0%, la precedente -100%, e la successiva 100%

//////////////////////////////////////////////////////////////////
//Lifecycle DOM Events
/*
document.addEventListener("DOMContentLoaded", function(e) {
	console.log("HTML parsed and DOM tree built!", e);
});

window.addEventListener("load", function(e) {
	console.log("Page fully loaded", e);
});

//window.addEventListener("beforeunload", function(e) {
//	e.preventDefault();
//	console.log(e);
//	e.returnValue = "";
//});
*/
//////////////////////////////////////////////////////////////////
//Efficient Script Loading: defer and async

//per i vecchi browser è buona norma includere lo script 
//per caricare il file js alla fine del tag body del file HTML, 
//mai inserirlo nel tag head. Nei moderni browser si utilizza 
//invece inserire lo script nell'head ma con l'aggiunta della parola
//defer oppure async, dipende da come vogliamo caricare lo script
//stesso, sicuramente quello più utilizzato è defer