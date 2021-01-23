const express = require('express');
const axios = require('axios')

const app = express();

app.use(express.json());

app.post('/events', (req, res) => {
	const event = req.body;

	// post service
	axios.post('http://localhost:4000/events', event)
	// comments service
	axios.post('http://localhost:4001/events', event)
	// query service
	axios.post('http://localhost:4002/events', event)

	res.send({ status: 'ok' })
})


app.listen(4005, () => console.log('Event services running in port 4005'))