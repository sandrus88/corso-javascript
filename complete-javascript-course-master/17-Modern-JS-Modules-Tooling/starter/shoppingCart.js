//exporting module
console.log("exporting module");

//Blockin code
//console.log("Start fetching users");
//await fetch("https://jsonplaceholder.typicode.com/posts");
//console.log("Finish fetching users");

//adesso creiamo delle variabili in questo modulo.
const shippingCost = 10;
export const cart = [];

//per poter utilizzare queste variabili all'interno di un altro modulo
//ad esempio il file principale script17.js, bisogna esportarli.
//Per eespoiratre delle variabli si udìsa la keyword export seguita
//dalole variabilki che si vogliono esprtare. Esitstomo due tipi
//di esportazioni i named export e i default export, quelle più 
//semploici sono le named 

export const addToCart = function(product, quantity) {
	cart.push({ product, quantity });
	console.log(`${quantity} ${product} added to cart`);
};

//per esportare più variabili contemporaneamente
const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as tq };

//per fare una deafult export si usa sempre la keyword export deafult
//seguita non dal nome della variabile ma dal contenuto stesso.
//Se ad esempio vogliamo esportare addToCart
export addExpense function(product, quantity) {
	cart.push({ product, quantity });
	console.log(`${quantity} ${product} added to cart`);
};
