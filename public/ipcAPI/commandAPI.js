const electron = require("electron");
const path = require("path");
const ipc = electron.ipcMain;
const { getAllCommandsWithPID, addCommandToProj } = require(path.join(
  __dirname,
  "./Models/commandModel"
));
module.exports = {
  commandsAPI
};

function commandsAPI() {
  //newCommand
  ipc.on("newCommand", async function(event, arg) {
    await addCommandToProj(arg).then(res => {
      getAllCommandsWithPID().then(result => {
        event.sender.send("commandAdded", result);
      });
    });
  });
  //getAllCommands
  ipc.on("getAllCommands", async function(event, arg) {
    await getAllCommandsWithPID().then(result => {
      event.sender.send("command-list", result);
    });
  });
}
