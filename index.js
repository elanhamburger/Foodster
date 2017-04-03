if (process.env.NODE_ENV !== "production") {
	require('dotenv').config();
}

const express = require('express');
const Yelp = require('yelp-api-v3');

const yelp = new Yelp({
	app_id: process.env.APP_ID,
	app_secret: process.env.APP_SECRET
});
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/query', function(req, res) {
	yelp.search({
		term: req.body.categories,
		location: '90210',
		price: req.body.price,
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