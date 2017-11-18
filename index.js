var express = require('express');
var app = express();
var url = require('url');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/getRate', function(request, response) {
	calculateRate(request, response);
	response.render('pages/getRate', parameters);
});

function calculateRate(request, response){
	var requestUrl = url.parse(request.url, true);
	console.log("Form Values from requestUrl: " + JSON.stringify(requestUrl.query));

	var operation = requestUrl.query.mathOperation;
	var weight = Number(requestUrl.query.weight);
	var mail = requestUrl.query.mailType;
	
	switch(mail){
		case "Letters (Stamped)":
			if (weight <= 1){
				result = 0.49;
			} else if (weight <= 2){
				result = 0.70;
			} else if (weight <= 3){
				result = 0.91;
			} else if (weight <= 3.5){
				result = 1.12;
			} else{
				result = "Cannot be shipped. Too heavy a weight.";
			}
			break;
		case "Letters (Metered)":
			if (weight <= 1){
				result = 0.46;
			} else if (weight <= 2){
				result = 0.67;
			} else if (weight <= 3){
				result = 0.88;
			} else if (weight <= 3.5){
				result = 1.09;
			} else{
				result = "Cannot be shipped. Too heavy a weight.";
			}
			break;
		case "Large Envelopes (Flats)":
			if (weight <= 1){
				result = 0.98;
			} else if (weight <= 2){
				result = 1.19;
			} else if (weight <= 3){
				result = 1.40;
			} else if (weight <= 4){
				result = 1.61;
			} else if (weight <= 5){
				result = 1.82;
			} else if (weight <= 6){
				result = 2.03;
			} else if (weight <= 7){
				result = 2.24;
			} else if (weight <= 8){
				result = 2.45;
			} else if (weight <= 9){
				result = 2.66;
			} else if (weight <= 10){
				result = 2.87;
			} else if (weight <= 11){
				result = 3.08;
			} else if (weight <= 12){
				result = 3.29;
			} else if (weight <= 13){
				result = 3.50;
			} else{
				result = "Cannot be shipped. Too heavy a weight.";
			}
			break;
		case "Parcels":
			if (weight <= 1){
				result = 3.00;
			} else if (weight <= 2){
				result = 3.00;
			} else if (weight <= 3){
				result = 3.00;
			} else if (weight <= 4){
				result = 3.00;
			} else if (weight <= 5){
				result = 3.16;
			} else if (weight <= 6){
				result = 3.32;
			} else if (weight <= 7){
				result = 3.48;
			} else if (weight <= 8){
				result = 3.64;
			} else if (weight <= 9){
				result = 3.80;
			} else if (weight <= 10){
				result = 3.96;
			} else if (weight <= 11){
				result = 4.19;
			} else if (weight <= 12){
				result = 4.36;
			} else if (weight <= 13){
				result = 4.53;
			} else{
				result = "Cannot be shipped. Too heavy a weight.";
			}
			break;
		default:
			result = "Invalid selection";
	}
	
	return parameters = {mail: mail, weight : weight, result : result};
}

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
