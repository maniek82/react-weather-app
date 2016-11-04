var React = require('react');

var WeatherForm = require('WeatherForm');
var WeatherMessage = require('WeatherMessage');
var ErrorModal = require('ErrorModal');
var openWeatherMap = require('openWeatherMap');

var Weather = React.createClass ({
	getInitialState: function () {
		return {
			isLoading: false,

		}
	},
	handleSearch: function (location) {
		var that = this;

		this.setState({
			isLoading: true,
			errorMessage: undefined,
			location: undefined,
			temp: undefined
		});

		openWeatherMap.getTemp(location).then( function(data) {
			that.setState ({
			location: location.toUpperCase(),
			temp: data.main.temp,
			description: data.weather[0].description,
			sunrise: new Date(data.sys.sunrise*1000).toString().slice(16,25),
			sunset: new Date(data.sys.sunset*1000).toString().slice(16,25),
			isLoading: false
		});
		}, function (e) {
			that.setState({
				isLoading: false,
				errorMessage: e.message
			});
			
		});
		
	},
	componentDidMount: function () {
		console.log(this.props);
		var location = this.props.location.query.location;
		if (location && location.length >0) {
			this.handleSearch(location);
			window.location.hash = '#/';
		}
	},
	componentWillReceiveProps: function (newProps) {
		var location = newProps.location.query.location;
		if (location && location.length >0) {
			this.handleSearch(location);
			window.location.hash = '#/';
		}
	},
	render: function () {
		var {errorMessage, isLoading, temp, location, description, sunrise, sunset} = this.state;

		function renderMessage () {
			if(isLoading) {
				return <h3 className="text-center">Fetching weather...</h3>
			}else if(temp && location) {
				return <WeatherMessage sunset = {sunset} sunrise={sunrise} temp ={temp} location={location} description={description}/>;
			}
		}

		function renderError() {
			if(typeof errorMessage === "string") {
				return (
					<ErrorModal message={errorMessage}/>
					)
			}
		}

		return (
			<div>
				<h1 className="text-center page-title">Get Weather </h1>
				<WeatherForm onSearch = {this.handleSearch}/>
				{renderMessage()}
				{renderError()}
			</div>
			);
	}
});

module.exports = Weather;

