/* eslint-disable no-undef */

// Wait for the document to be ready
$(document).ready(() => {
  $.getJSON('/api/todos')
    .then(addTodos)
    .catch(err => console.log(err))

  $('#todoInput').keypress(event => {
    if (event.which === 13) {
      createTodo()
    }
  })

  $('.list').on('click', 'li', function() {
    updateTodo($(this))
  })

  $('.list').on('click', 'span', function(event) {
    event.stopPropagation()
    removeTodo($(this).parent())
  })
})

function addTodos(todos) {
  // add todos to page here
  todos.forEach(todo => {
    addTodo(todo)
  })
}

function addTodo(todo) {
  let newTodo = $('<li class="task">' + todo.name + ' <span>x</span></li>')

  newTodo.data('id', todo._id)
  newTodo.data('completed', todo.completed)

  if (todo.completed) {
    newTodo.addClass('done')
  }

  $('.list').append(newTodo)
}

function createTodo() {
  // send request to create new todo
  let userInput = $('#todoInput').val()
  
  $.post('/api/todos', { name: userInput })
    .then(newTodo => {
      $('#todoInput').val('')
      addTodo(newTodo)
    })
    .catch(err => {
      console.log(err)
    })
}

function removeTodo(todo) {
  let clickedId = todo.data('id')
  let deleteUrl = `/api/todos/${clickedId}`
 
  $.ajax({
    type: 'DELETE',
    url: deleteUrl
  })
    .then(() => {
      todo.remove()
    })
    .catch(err => console.log(err))
}

function updateTodo(todo) {
  let updateUrl = `/api/todos/${todo.data('id')}`
  let isDone = !todo.data('completed')
  let updateData = { completed: isDone }

  $.ajax({
    type: 'PUT',
    url: updateUrl,
    data: updateData
  })
    .then(updatedTodo => { // eslint-disable-line no-unused-vars
      todo.toggleClass('done')
      todo.data('completed', isDone)
    })
}
