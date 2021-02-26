const electron = require("electron");
const path = require("path");
const ipc = electron.ipcMain;
const {
  getAllCommandsWithPID,
  addCommandToProj,
  getLinkedProjs,
  linkCommandToProj,
  updateCommand
} = require(path.join(__dirname, "../Models/commandModel"));
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
      console.log(result);
      event.sender.send("command-list", result);
    });
  });

  ipc.on("commandsLinkedProjects", async function(event, arg) {
    await getLinkedProjs(arg)
      .then(result => {
        event.sender.send("commandLinkedProjs", result);
      })
      .catch(err => {
        console.log("\n\nlinked", err);
      });
  });
  ipc.on("linkCommandToProjs", async function(event, command_id, proj_id) {
    await linkCommandToProj(command_id, proj_id)
      .then(result => {
        getLinkedProjs(arg).then(result => {
          event.sender.send("commandLinkedProjs", result);
        });
      })
      .catch(err => {
        console.log("\n\ncommand linked", err);
      });
  });
}
ipc.on("updateCommand", async function(event, id, command) {
  console.log("hello");
  await updateCommand(id, command).then(result => {
    getAllCommandsWithPID().then(result => {
      event.sender.send("command-list", result);
    });
  });
});
