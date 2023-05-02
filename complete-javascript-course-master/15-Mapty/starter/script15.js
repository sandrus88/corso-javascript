'use strict';

// prettier-ignore

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

//Using the Geolocation API
/*
//getCurrentPosition() tiene come primo parametro una funzione che 
//ritorna qualcosa in caso sia andato a buon fine e un altra che 
//ritorna qualcosa in caso di errore
if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(function(position) {
		const { latitude } = position.coords;
		const { longitude } = position.coords;
		console.log(`https://www.google.it/maps/@${latitude},${longitude},13z`);
		const coords = [latitude, longitude];
		map = L.map('map').setView(coords, 13);//il parametro 
		//map rappresenta un div del file html con id = map
		L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);
			
			map.on("click", function(mapE) {
				mapEvent = mapE;
				form.classList.remove("hidden");
				inputDistance.focus();//questo metodo fa si che ogni
									  //volta che si clicca sulla mappa
									  //e si apre il form, il cursore sia
									  //posizionato sul campo Distance
			});
	}, function() {
		alert("Could not get your position");
	});
};

form.addEventListener("submit", function(e) {//cosi facendo il marker
											 //si visualizzaerà nella mappa
											 //non appena premiamo invio
	e.preventDefault();
	//clear input fields
	inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = "";	
	//display marker
	const {lat, lng} = mapEvent.latlng;
				L.marker([lat, lng]).addTo(map)
			.bindPopup(L.popup({
				maxWidth: 250,
				minWidth: 100,
				autoClose: false,
				closeOnClick: false,
				className: "running-popup",//per customizzare il popup affidandogli
										   //affidandogli una classe css 
			}))
			.setPopupContent("Workout")//per settare una stringa al popup
			.openPopup();
});

//adesso cambiuando da running a cycling, il campo cadence
//si trasforma in elev gain e viceversa 
inputType.addEventListener("change", function() {
	inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
	inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
});
*/
////////////////////////////////////////////////////////////////////
//Displaying a Map Using Leaflet Library (vedi const map)

//per visualizzare una mappa con le coordinate della nostra posizione 
//copiare questo
/*<link rel="stylesheet"
	href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
	integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
	crossorigin="" />
<script defer src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
	integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM="
	crossorigin=""></script>
*/
//prima dello script del nostro file js del file html e copiare questo
/*
const map = L.map('map').setView(coords, 13);//il parametro 
		//map rappresenta un div del file html con id = map
		L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);

		L.marker(coords).addTo(map)
			.bindPopup('A pretty CSS popup.<br> Easily customizable.')
			.openPopup();
*/
//dentro la prima funzione del metodo getCurrentPosition()	

///////////////////////////////////////////////////////////////////
//Displaying a Map Marker

//vogliamo che ad ogni click sulla mappa si crei un marker. Per poterlo fare non
//si può utilizzare il nostro addEventListener ma si utilizza un 
//metodo della libreria Leaflet, che andremo a chiamare direttamente
//sull'oggetto map creato, ilmetodo è on("click", function{}); per 
//personalizzare il popup basta passare L.popup() al metodo bindPopup()
//e impostare i diversi valori dell'oggetto della libreria Leaflet

///////////////////////////////////////////////////////////////////
//Rendering Workout Input Form

//in questa sezione implementeremo il form dell'allenamneto 
//ogni volta che si fa un click sulla mappa

//////////////////////////////////////////////////////////////////
//Project Architecture

//in questa sezione daremo una struttura al progetto per evitare
//codice sparpagliato. in js esistono tanti tipi di architettura
//ma per questo piccolo progeto ci avvaleremo delle classi, quindi
//per memorizzare i dati del form creeremo una classe madre Workout
//che conterrà i valori distance, duration, coords; e due classi
//figlie Running conterrà anche cadence e pace, mentre Cycling
//conterrà elevationGain e speed. per gestire tutti gli eventListener
//creeremo una classe App contenente tutti questi metodi

//////////////////////////////////////////////////////////////////
//Refactoring for Project Architecture

class Workout {
	date = new Date();
	id = (Date.now() + "").slice(-10);//generalmente per creare
	clicks = 0; 
	//un id si usano librerie 
	//esterne ma qui non usiamo
	//altre librerie e creaimo 
	//l'id trasformando il timestamp 
	//in una stringa e prendendo
	//gli ultimi 10 caratteri 

	constructor(coords, distance, duration) {
		this.coords = coords; // [lat, lng]
		this.distance = distance;// in km
		this.duration = duration;// in min
	}

	_setDescription() {
		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`;
	}
	
	click() {
		this.clicks++;
	}
};

class Running extends Workout {
	type = "running";

	constructor(coords, distance, duration, cadence) {
		super(coords, distance, duration);
		this.cadence = cadence;
		this.calcPace();
		this._setDescription();
	}

	calcPace() {
		this.pace = this.duration / this.distance;
		return this.pace;
	}
};

class Cycling extends Workout {
	type = "cycling";

	constructor(coords, distance, duration, elevationGain) {
		super(coords, distance, duration);
		this.elevationGain = elevationGain;
		this.calcSpeed();
		this._setDescription();
	}

	calcSpeed() {
		this.speed = this.distance / (this.duration / 60);
		return this.speed;
	}
};

//const run1 = new Running([39,-12], 5.2, 24, 178);
//const cycling1 = new Cycling([39,-12], 27, 95, 523);
//console.log(run1, cycling1);

///////////////////////////
//APPLICATION ARCHITECTURE
class App {
	#map;
	#mapZoomLevel = 13;
	#mapEvent;
	#workouts = [];

	constructor() {
		//get user's position
		this._getPosition();
		
		//get data from local storage
		this._getLocalStorage();
		
		//attach event handlers 
		form.addEventListener("submit", this._newWorkout.bind(this));
		inputType.addEventListener("change", this._toggleElevationField);
		containerWorkouts.addEventListener("click", this._moveToPopup.bind(this));
	}

	_getPosition() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				this._loadMap.bind(this), function() {
					alert("Could not get your position");
				});
		};
	}

	_loadMap(position) {
		const { latitude } = position.coords;
		const { longitude } = position.coords;
		console.log(`https://www.google.it/maps/@${latitude},${longitude},13z`);
		const coords = [latitude, longitude];
		this.#map = L.map('map').setView(coords, this.#mapZoomLevel);
		L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(this.#map);

		this.#map.on("click", this._showForm.bind(this));
		
		this.#workouts.forEach(work => {
			this._renderWorkoutMarker(work);
		})
	}

	_showForm(mapE) {
		this.#mapEvent = mapE;
		form.classList.remove("hidden");
		inputDistance.focus();
	}
	
	_hideForm() {
		//empty inputs
		inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = "";
		form.style.display = "none";
		form.classList.add("hidden"); 
		setTimeout(() => form.style.display = "grid", 1000);
	}
	
	_toggleElevationField() {
		inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
		inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
	}

	_newWorkout(e) {
		const validInputs = (...inputs) => inputs.every(inp => Number.isFinite(inp));
		const allPositive = (...inputs) => inputs.every(inp => inp > 0);
		e.preventDefault();

		//get data from form
		const type = inputType.value;
		const distance = +inputDistance.value;//si converte in numero da stringa
		const duration = +inputDuration.value;
		const { lat, lng } = this.#mapEvent.latlng;
		let workout;

		//if workout running, create Running object
		if (type === "running") {
			const cadence = +inputCadence.value;
			//check if data is valid
			if (!validInputs(distance, duration, cadence) || !allPositive(distance, duration, cadence)) {
				return alert("Inputs have to be positive numbers!")
			};

			workout = new Running([lat, lng], distance, duration, cadence);
		}
		//if workout cycling, create Cycling object
		if (type === "cycling") {
			const elevation = +inputElevation.value;
			//check if data is valid
			if (!validInputs(distance, duration, elevation) || !allPositive(distance, duration)) {
				return alert("Inputs have to be positive numbers!")
			};

			workout = new Cycling([lat, lng], distance, duration, elevation);
		}
		//add new object to workout array
		this.#workouts.push(workout);

		//render workout on map as a marker
		this._renderWorkoutMarker(workout);

		//render workout on list
		this._renderWorkout(workout);

		//hide form + clear input fields
		this._hideForm();
		
		//set local storage to all workouts
		this._setLocalStorage();
	}

	_renderWorkoutMarker(workout) {
		L.marker(workout.coords).addTo(this.#map)
			.bindPopup(L.popup({
				maxWidth: 250,
				minWidth: 100,
				autoClose: false,
				closeOnClick: false,
				className: `${workout.type}-popup`,
			}))
			.setPopupContent(`${workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"} ${workout.description}`)
			.openPopup();
	}

	_renderWorkout(workout) {
		let html = `
		<li class="workout workout--${workout.type}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"}</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
          `;

		if (workout.type === "running") {
			html += `
		  <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>
        `;
		}
		
		if (workout.type === "cycling") {
			html += `
		  <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>
        `;
		}
		
		form.insertAdjacentHTML("afterend", html);
	}
	
	_moveToPopup(e) {
		const workoutEl = e.target.closest(".workout");
		
		if(!workoutEl) return;
		
		const workout = this.#workouts.find(work => work.id === workoutEl.dataset.id);
		
		this.#map.setView(workout.coords, this.#mapZoomLevel, {
			animate: true,
			pan: {
				duration: 1,
			}
		});
		
		//using public interface
		//workout.click();
	}
	
	_setLocalStorage() {
		localStorage.setItem("workouts", JSON.stringify(this.#workouts))//per creare una memoria 
										  //locale si usa localStorage.setItem
										  //dove il primo parametro è una stringa
										  //e rappresenta la chaive, il secondo
										  //parametro è anch'esso una stringa e 
										  //rappresenta il valore da associare
										  //alla chiave. Poichè dobbiamo passare
										  //come valore degli oggetti usiamo 
										  //la convenzione JSON.stringify() per 
										  //trasformare un oggetto in una stringa 	
	}
	
	_getLocalStorage() {
		const data = JSON.parse(localStorage.getItem("workouts"));
		
		if(!data) return;
		
		this.#workouts = data;
		
		this.#workouts.forEach(work => {
			this._renderWorkout(work);
		})
	}
	
	reset() {
		localStorage.removeItem("workouts");
		location.reload();
	}
};

const app = new App();

//////////////////////////////////////////////////////////////////
//Managing Workout Data: Creating Classes

//qui creeremo le classi Workout, Running e Cycling

//////////////////////////////////////////////////////////////////
//Creating a New Workout

//in questa sezione lavoreremo nell'implementazione del metodo 
//_newWorkout(e)

//////////////////////////////////////////////////////////////////
//Rendering Workouts

//in questa sezione implementeremo che ogni workout si aggiungerà
//sotto il form e il marker sarà personalizzato

//////////////////////////////////////////////////////////////////
//Move to Marker On Click

//in questa sezione implementeremo che ogni volta che si fa un click
//su un workout della lista a sinistra, la mappa si muoiverà sul 
//workout cliccato

//////////////////////////////////////////////////////////////////
//Working with localStorage

//in questa sezione lavoreremo con l'API localStorage per far si che
//ogni volta che si ricarica la pagina gli allenamneti creati non
//spariscano ma persistono

//////////////////////////////////////////////////////////////////
//Final Considerations

