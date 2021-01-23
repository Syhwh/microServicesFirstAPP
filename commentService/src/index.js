const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(express.json());
app.use(cors());


const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
	const postId = req.params.id
	res.status(200).send(commentsByPostId[postId] || [])
})
app.post('/posts/:id/comments', async (req, res) => {

	const id = randomBytes(4).toString('hex')
	const { content } = req.body
	const postId = req.params.id
	const comments = commentsByPostId[postId] || []

	comments.push({ id, content })

	commentsByPostId[postId] = comments

try {

	await axios.post('http://localhost:4005/events', {
		type: 'CommentCreated',
		data: {
			id,
			content,
			postId
		}
	})
	res.status(201).send(comments)
} catch (error) {
	console.log('Create comment error ->', error)
}
})

app.post('/events', (req, res)=>{
	console.log('Event received', req.body.type)
	res.send({})
})


app.listen(4001, () => console.log('comments service running in port 4001'))