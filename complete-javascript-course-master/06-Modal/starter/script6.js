'use strict';
// in questo progetto metteremo gli elementi da modificare in variabili
// per poterli utilizzare più volte

//event listener con il click del mouse
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnsShowModal = document.querySelectorAll(".show-modal");
const showModal = function() {
	modal.classList.remove("hidden");
	overlay.classList.remove("hidden");
};
const closeModal = function() {
	modal.classList.add("hidden");
	overlay.classList.add("hidden");
};

for (let i = 0; i < btnsShowModal.length; i++)
	btnsShowModal[i].addEventListener("click", showModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

//event listener con i tasti della tastiera
// esistono tre tipi di eventi della tastiera 
//1) keyup si verifica quando il tasto viene rilasciato
//2) keypress si verifica al completamento della pressione sul tasto
//3) keydown si verifica quando inizia la pressione su un tasto (generalmente si usa questo)

//document.addEventListener("keydown", function() {// in questo caso funziona con qualsiasi tasto che si preme
//	console.log("A key was pressed");// ma noi vogliamo che si utilizzi solo il tasto esc 
//});
//quindi aggiungendo un parametro alla funzione js non farà altro che creare un oggetto che fa riferimento al tassto premuto

//document.addEventListener("keydown", function(e) {
//	console.log(e); 
//});

//dall'oggetto estraiamo la proprietà key dell'oggetto

document.addEventListener("keydown", function(e) {
//	console.log(e.key);

	if (e.key === "Escape" && !modal.classList.contains("hidden")) {
		//	console.log("Esc was pressed");
		closeModal();
	}
});