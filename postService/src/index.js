const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(express.json());
app.use(cors());

const posts = {}

app.get('/posts', (req, res) => {
	res.status(200).send(posts)
})

app.post('/posts', async (req, res) => {
	const id = randomBytes(4).toString('hex')
	const { title } = req.body
	posts[id] = {
		id, title
	}
	try {
		await axios.post('http://localhost:4005/events', {
			type: 'PostCreated',
			data: {
				id, title
			}
		})
		res.status(201).send(posts[id])
	} catch (error) {
		console.log('Create post error->', error)
	}
})

app.post('/events', (req, res) => {
	console.log('Event received', req.body.type)
	res.send({})
})



app.listen(4000, () => console.log('Post service running in port 4000'))