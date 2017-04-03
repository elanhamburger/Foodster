if (process.env.NODE_ENV === "development") {
	require('dotenv').config();
}

const express = require('express');
const Yelp = require('yelp-api-v3');

const yelp = new Yelp({
	app_id: process.env.APP_ID,
	app_secret: process.env.APP_SECRET
});
const app = express();

app.use(express.static('public'));

app.get('/', function(req, res) {
	res.send('Hello, World!');
});

app.get('/go', function(req, res) {
	yelp.search({
		term: 'food',
		location: '90210',
		price: '1,2,3',
		limit: 10
	}).then(function (data) {
	    res.send(data);
	}).catch(function (err) {
		res.send('An error was encountered: ' + err);
	    console.log(err);
	});
});

app.listen(3000, function() {
	console.log('Listening on port 3000');
});