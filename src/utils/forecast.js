// LICAO 37

const request = require('request');

// const forecast = (latitude, longitude, callback) => {
//     const url =
//         "https://api.darksky.net/forecast/a5800a609208f3802769dff646698020/" +
//         latitude +
//         "," +
//         longitude +
//         "?units=si&lang=pt";

//     request({ url: url, json: true }, (error, response) => {
//         if (error) {
//             callback("Unable to connect to forecast services!", undefined);
//         } else if (response.body.error) {
//             callback(
//                 "Unable to get the forecast. Try another latitude/longitude combination",
//                 undefined
//             );
//         } else {
//             callback(undefined, {
//                 forecast:
//                     response.body.daily.data[0].summary +
//                     " It is currently " +
//                     response.body.currently.temperature +
//                     " degrees out. There is a " +
//                     response.body.currently.precipProbability +
//                     "% chance of rain."
//             });
//         }
//     });
// };

// LICAO 40

const forecast = (latitude, longitude, callback) => {
	const url =
		'https://api.darksky.net/forecast/a5800a609208f3802769dff646698020/' +
		latitude +
		',' +
		longitude +
		'?units=si';

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to forecast services!', undefined);
		} else if (body.error) {
			callback(
				'Unable to get the forecast. Try another latitude/longitude combination',
				undefined
			);
		} else {
			callback(
				undefined,
				body.daily.data[0].summary +
					' It is currently ' +
					body.currently.temperature +
					' degrees out. The high today is ' +
					body.daily.data[0].temperatureHigh +
					' with a low of ' +
					body.daily.data[0].temperatureLow +
					'. There is a ' +
					body.currently.precipProbability +
					'% chance of rain.'
			);
		}
	});
};

module.exports = forecast;
