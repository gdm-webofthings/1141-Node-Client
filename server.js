const express = require('express')
const app = express()

// let link = 'http://localhost:3000/'

// window.location.href = link;

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
	console.log('slash')
	res.render('nothing', {text: 'World'})
	// res.send('hi')
})

app.get('/text/:text', (req, res) => {
	let betterText = req.params.text.replaceAll('-', ' ')
	res.send(betterText)
})

app.get('/text', (req, res) => {
	res.render('nothing', {text: 'No Text'})
})

app.get('/media/:id', (req, res) => {
	res.render('index', {id: req.params.id})
})

app.listen(3000)