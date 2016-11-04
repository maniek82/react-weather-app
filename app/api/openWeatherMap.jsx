var axios = require('axios');

const OPEN_WEATHER_MAP_URL = 'http://api.openweathermap.org/data/2.5/weather?appid=3232e3b7608ff006ca936191ed60ce2e&units=metric&lang=pl';

module.exports = {
	getTemp: function(location) {
		var encodedLocation = encodeURIComponent(location);
		var requestUrl = `${OPEN_WEATHER_MAP_URL}&q=${encodedLocation}`;

		return axios.get(requestUrl).then(function (res) {
			console.log(res);
			if(res.data.cod !=200) {
				throw new Error("City not found");
			}else {
				return res.data;
			}
		}, function (res) {
			throw new Error("Not found" );
		})
	}

}