const express = require('express');
const { randomBytes } = require('crypto')
const app = express();

app.use(express.json())

const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
	const postId = req.params.id
	res.status(200).send(commentsByPostId[postId] || [])
})
app.post('/posts/:id/comments', (req, res) => {

	const id = randomBytes(4).toString('hex')
	const { content } = req.body
	const postId = req.params.id
	const comments = commentsByPostId[postId] || []

	comments.push({ id, content })

	commentsByPostId[postId] = comments

	res.status(201).send(comments)
})

app.listen(4001, () => console.log('comments server running in port 4001'))