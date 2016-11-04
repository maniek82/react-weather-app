var React = require('react');
var ReactDOM = require('react-dom');
var ReactDOMServer = require('react-dom/server');

var ErrorModal = React.createClass({
	getDefaultProps: function () {
		return {
			title: "Error"
		};
	},
	propTypes: {
		title: React.PropTypes.string,
		message: React.PropTypes.string.isRequired

	},

	//naprawienie bledu po zlym wyszukaniu miasta ktore nie isnialo i ponownej probie szukana juz dobrego miasta wyskakiwal blad w consoli
	// aby to naprawic przenioslem wszystko z render return do danej modalMarkup a w return zostal tylko div dla zgodnosci
	// pozniej require  reactdom i reactdom/server i tworze zzmienna jquery modal i dolaczam do dom zapomoca jquery
	componentDidMount: function () {
		var {title, message } = this.props;
		var modalMarkup = (
			 <div id="error-modal" className="reveal tiny text-center" data-reveal="">
			 	<h4>{title}</h4>
			 	<p>{message}</p>
			 	<p> <button className="button hollow primary" data-close="">OK</button></p>
			 </div>
			);
		var $modal = $(ReactDOMServer.renderToString(modalMarkup));
		$(ReactDOM.findDOMNode(this)).html($modal);

		var modal = new Foundation.Reveal($('#error-modal'));
		modal.open();
	},
	render: function() {
		
		return (
			<div></div>
			);
		
	}

});

module.exports = ErrorModal;