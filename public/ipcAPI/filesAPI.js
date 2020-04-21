const electron = require("electron");
const path = require("path");
const ipc = electron.ipcMain;
const { addFile, getAllFiles, updateFile, deleteFileModel } = require(path.join(
  __dirname,
  "../Models/filesModel"
));
module.exports = {
  addFileToProj,
  getAllFilesForProj,
  updateFileFunc,
  deleteFileAPI
};

//add new file
function addFileToProj() {
  ipc.on("addFile", async function(event, arg) {
    await addFile(arg).then(res => {
      getAllFiles().then(result => {
        event.sender.send("allFiles", result);
      });
    });
  });
}
//allfiles
function getAllFilesForProj() {
  ipc.on("getAllFiles", async function(event, arg) {
    await getAllFiles().then(result => {
      event.sender.send("allFiles", result);
    });
  });
}
function updateFileFunc() {
  ipc.on("updateFile", async function(event, id, file) {
    await updateFile(id, file).then(result => {
      getAllFiles().then(result => {
        event.sender.send("allFiles", result);
      });
    });
  });
}

function deleteFileAPI() {
  ipc.on("deleteFile", async function(event, arg) {
    await deleteFileModel(arg).then(result => {
      getAllFiles().then(result => {
        event.sender.send("allFiles", result);
      });
    });
  });
}
