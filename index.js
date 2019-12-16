require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const PORT = process.env.PORT || 3000

const todoRoutes = require('./routes/todos')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/views'))

app.get('/', (req, res) => {
  res.sendFile('index.html')
})

app.use('/api/todos', todoRoutes)

app.listen(PORT, () => {
  console.log(`APP IS RUNNING ON ${PORT}`)
})
