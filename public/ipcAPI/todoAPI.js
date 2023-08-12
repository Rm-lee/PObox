const electron = require("electron");
const path = require("path");
const ipc = electron.ipcMain;
const { addTodo, getAllTodos, deleteTodo } = require(path.join(
  __dirname,
  "../Models/todoModel"
));
module.exports = {
  todosAPI
};

function todosAPI() {
  ipc.on("addTodo", async function(event, arg) {
    await addTodo(arg).then(res => {
      getAllTodos().then(result => {
        event.sender.send("todo-list", result);
      });
    });
  });

  //get all todos
  ipc.on("getTodos", async function(event, arg) {
    await getAllTodos().then(result => {
      event.sender.send("todo-list", result);
    });
  });
  //delete todo
  ipc.on("deleteTodo", async function(event, arg) {
    await deleteTodo(arg).then(result => {
      getAllTodos().then(result => {
        event.sender.send("todoDeleted", result);
      });
    });
  });
}
