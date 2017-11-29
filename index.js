var express = require('express');

/////////////////////////
var pg = require('pg');
var connectionString = "postgres://fqzxeaknsecoar:97ffe87ce0e96bb37c40b0997140f8b5eaeda55c35c7ff104383cfbd5d8f3703@ec2-54-221-246-84.compute-1.amazonaws.com:5432/dflhqrdgqqnkd2";
/////////////////////////

var app = express();
var url = require('url');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/Project');
});


///////////////////////////
app.get('/db', function (request, response) {
	var client = new pg.Client(connectionString);
	console.log("code made it here");
	client.connect(function(err) {
		if (err) {
			console.log("Error connecting to DB: ")
			console.log(err);
			callback(err, null);
		}
		console.log('Check1');

		var sql = "SELECT paragraph FROM mytemp";
		//var params = [id];

		var query = client.query(sql, function(err, result) {
			// we are now done getting the data from the DB, disconnect the client
			client.end(function(err) {
				if (err) throw err;
			});
			console.log('Check2');

			if (err) {
				console.log("Error in query: ")
				console.log(err);
				callback(err, null);
			}
			
			console.log("Found result: " + JSON.stringify(result.rows));

			// call whatever function the person that called us wanted, giving it
			// the results that we have been compiling
			callback(null, result.rows);
		});
	});
  client.end();
  response.render('pages/Project');
});
////////////////////////////

function callback(error, result) {
		// This is the callback function that will be called when the DB is done.
		// The job here is just to send it back.

		// Make sure we got a row with the person, then prepare JSON to send back
		if (error || result == null || result.length != 1) {
			response.status(500).json({success: false, data: error});
		} else {
			var person = result[0];
			response.status(200).json(result[0]);
		}
	}


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
