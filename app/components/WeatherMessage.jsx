var React = require('react');

var WeatherMessage = ({location, temp, description, sunrise, sunset}) => {
	return (
		<div className="callout success large">
			<h4 className="text-center">It is <b>{temp}&deg;C</b> in {location}. 
			<br/>Weather - {description}.<br/> 
			Sunrise - {sunrise} <br/>
			Sunset - {sunset} </h4>
	
		</div>
			);
	    
};

module.exports = WeatherMessage;

