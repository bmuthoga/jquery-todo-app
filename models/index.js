const mongoose = require('mongoose')

// remember to disable debug mode in production environment
mongoose.set('debug', true)
mongoose.connect('mongodb://localhost/todo-api', { useNewUrlParser: true })

// so that we can use the Promise syntax with mongoose methods
// way better than callbacks
mongoose.Promise = Promise

module.exports.Todo = require('./todo')
