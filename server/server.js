const path = require('path');
const express = require('express');
const compression = require('compression')
const app = express();
const publicPath = path.join(__dirname, '..', 'dist');
const port = process.env.PORT || 3000;

app.use(compression());

app.get('/', (req, res, next) => {
	showRequestDetails(req);
	next();
});

app.use(express.static(publicPath));

app.get('*', (req, res) => {
	showRequestDetails(req);
	res.sendFile(path.join(publicPath, 'index.html'));
});


app.listen(port, () => {
	console.log('Server is up!');
});


function showRequestDetails(req) {
	const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
	console.log(`${date} Request from ${ip}`);
}
