var express = require('express');
var app = express();
var url = require('url');
var Pool = require('pg-pool');
var connectionString = "postgres://fqzxeaknsecoar:97ffe87ce0e96bb37c40b0997140f8b5eaeda55c35c7ff104383cfbd5d8f3703@ec2-54-221-246-84.compute-1.amazonaws.com:5432/dflhqrdgqqnkd2";
const params = url.parse(connectionString);
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



app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
	var parameters;
	pool.connect().then(client => {
  		client.query('SELECT * FROM mytemp').then(res => {
			response.render('pages/Project', {page:res.rows});
			client.release();
  		})
  		.catch(e => {
    		client.release()
    		console.error('query error', e.message, e.stack)
  		})
	})
  	
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
