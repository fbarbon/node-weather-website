console.log('Client side Javascript');

fetch('http://puzzle.mead.io/puzzle').then((response) => {
	response.json().then((data) => {
		console.log(data);
	});
});

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// messageOne.textContent = 'From Javascript';

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const location = search.value;

	//console.log(location)

	messageOne.textContent = 'Loading...';
	messageTwo.textContent = '';

	// LICAO 67 - Heroku
	//fetch('http://localhost:3000/weather?address=' + location).then(
	fetch('http://localhost:3000/weather?address=' + location).then(
		(response) => {
			response.json().then((data) => {
				if (data.error) {
					console.log(data.error);
					messageOne.textContent = data.error;
				} else {
					// console.log(data.location);
					// console.log(data.forecast);
					messageOne.textContent = data.location;
					messageTwo.textContent = data.forecast;
				}
			});
		}
	);
});
