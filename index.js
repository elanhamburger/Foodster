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
	console.log(req.body);

	const query = {
		term: req.body.categories,
		price: req.body.price,
	}

	if (req.body.location.length > 0) {
		query.location = req.body.location;
	} else {
		query.latitude = req.body.latitude;
		query.longitude = req.body.longitude;
	}

	yelp.search(query)
	.then(function (data) {
	    res.send(data);
	}).catch(function (err) {
		res.sendStatus(500);
	    console.log(err);
	});
});

app.listen(3000, function() {
	console.log('Listening on port 3000');
});