// LICOES 43 a 50

const express = require('express');

const path = require('path');
// // console.log(__dirname);
// // console.log(__filename);
// console.log(path.join(__dirname, '../public'));

const app = express();

// Usar o comando "nodemon src/app.js -e js,hbs" para que o servidor seja reiniciado quando Javascript E Handlebars mudarem
const hbs = require('hbs');

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

// Setup Handlebars engine and views location
app.set('view engine', 'hbs'); // pacote handlebars
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// app.use(express.static(path.join(__dirname, '../public')));

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// LICAO 47 - Substituindo comportamento normal pelo HBS (handlebars)
// app.get('', (req, res) => {
// 	// res.send('Hello ExpressJS!');
// 	res.send('<h1>Hello ExpressJS in HTML</h1>'); // HTML
// });

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Fabiano Barbon'
	});
});

// app.get('/help', (req, res) => {
// res.send('Help page!');
// res.send([
// 	{
// 		name: 'Fabiano',
// 		age: 37
// 	},
// 	{
// 		name: 'Stela',
// 		age: 33
// 	}
// ]);
// });

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		helpText: 'This is some helpful text!',
		name: 'Fabiano Barbon'
	});
});

// app.get('/about', (req, res) => {
// res.send('About page!');
// res.send('<h1>About HTML</h1>'); // HTML
// });

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About',
		name: 'Fabiano Barbon'
	});
});

// app.get('/weather', (req, res) => {
// 	// res.send('Weather page!');
// 	res.send({
// 		forecast: 'It is snowing',
// 		location: 'Florianopolis'
// 	});
// });

// CAPITULO 54

app.get('/weather', (req, res) => {
	// res.send('Weather page!');

	if (!req.query.address) {
		return res.send({
			error: 'You must provide an address!'
		});
	}

	// res.send({
	// 	forecast: 'It is snowing',
	// 	location: 'Florianopolis'
	// });

	geocode(
		req.query.address,
		(error, { latitude, longitude, location } = {}) => {
			if (error) {
				return res.send({ error });
			}

			forecast(latitude, longitude, (error, forecastData) => {
				if (error) {
					return res.send({ error });
				}

				res.send({
					forecast: forecastData,
					location,
					address: req.query.address
				});
			});
		}
	);

	// res.send({
	//     address: [req.query.address]
	// });
});

app.get('/products', (req, res) => {
	// console.log(req.query); // Query String -> Ex.: http://localhost:3000/products?search=games
	// console.log(req.query.search);

	if (!req.query.search) {
		return res.send({
			error: 'You must provide a search term!'
		});
	}
	res.send({
		products: []
	});
});

app.get('/help/*', (req, res) => {
	//res.send('Help article not found');
	res.render('404', {
		title: '404',
		errorMessage: 'Help article not found',
		name: 'Fabiano Barbon'
	});
});

// O 404 neste caso deve vir como último tratamento pois o Express trata em ordem os matches
app.get('*', (req, res) => {
	//res.send('My 404 page');
	res.render('404', {
		title: '404',
		errorMessage: 'Page not found',
		name: 'Fabiano Barbon'
	});
});

app.listen(3000, () => {
	console.log('Server is up on port 3000.');
});
