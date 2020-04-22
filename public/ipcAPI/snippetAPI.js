const electron = require("electron");
const path = require("path");
const ipc = electron.ipcMain;
const { addSnippet, getAllSnippets, deleteSnippet } = require(path.join(
  __dirname,
  "../Models/snippetModel"
));
//add new snippet
module.exports = {
  snippetsAPI
};

function snippetsAPI() {
  ipc.on("addSnippet", async function(event, arg) {
    await addSnippet(arg).then(res => {
      getAllSnippets().then(result => {
        event.sender.send("snippet-list", result);
      });
    });
  });

  //get all snippets
  ipc.on("getAllSnippets", async function(event, arg) {
    await getAllSnippets().then(result => {
      event.sender.send("snippet-list", result);
    });
  });

  //delete snippet
  ipc.on("deleteSnippet", async function(event, arg) {
    await deleteSnippet(arg).then(result => {
      getAllSnippets().then(result => {
        event.sender.send("snippetDeleted", result);
      });
    });
  });
}
