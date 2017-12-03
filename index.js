var express = require('express');
var app = express();
var url = require('url');
/////////////////////////
//var pg = require('pg');
var Pool = require('pg-pool');
var connectionString = "postgres://fqzxeaknsecoar:97ffe87ce0e96bb37c40b0997140f8b5eaeda55c35c7ff104383cfbd5d8f3703@ec2-54-221-246-84.compute-1.amazonaws.com:5432/dflhqrdgqqnkd2";
const params = url.parse(process.env.DATABASE_URL);
const auth = params.auth.split(':');
const config = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  ssl: true
};
const pool = new Pool(config);
/////////////////////////



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
	//var client = new pg.Client(connectionString);
	console.log("code made it here");
	pool.connect().then(client => {
  		client.query('select $1::text as name', ['pg-pool']).then(res => {
    		client.release()
    		console.log('hello from', res.rows[0].name)
  		})
  		.catch(e => {
    		client.release()
    		console.error('query error', e.message, e.stack)
  		})
	})
	
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
