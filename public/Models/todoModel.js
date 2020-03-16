
const db = require('../data/db')

module.exports = {

    addTodo,
    getAllTodos,
    deleteTodo

}
//add a bookmark to project
 function addTodo(todo) {
    return db("todos")
        .insert(todo) 
      

}

//get all bookmarks
function getAllTodos() {
    return db("todos")
        .select()

}
function deleteTodo(id) {
    return db('todos')
        .where({ id })
        .del()
  }
  