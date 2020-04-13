const electron = require("electron");
const path = require("path");
const ipc = electron.ipcMain;
const { addFile, getAllFiles } = require(path.join(
  __dirname,
  "../Models/filesModel"
));
module.exports = {
  addFileToProj,
  getAllFilesForProj
};

//add new file
function addFileToProj() {
  ipc.on("addFile", async function(event, arg) {
    console.log(arg);
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
    getAllFiles().then(result => {
      event.sender.send("allFiles", result);
    });
  });
}
