const electron = require("electron");
const path = require("path");
const ipc = electron.ipcMain;
const { getAllProjs, add, deleteProject } = require(path.join(
  __dirname,
  "./Models/projectModel"
));
module.exports = {
  projectsAPI
};
function projectsAPI() {
  //getprojs
  ipc.on("asynchronous-message", async function(event, arg1, arg2) {
    if (arg1 === "get projs") {
      await getAllProjs().then(resu => {
        event.sender.send("asynchronous-reply", resu);
      });
    }
    if (arg1 === "project") {
      await add(arg2);
    }
  });

  //deleteProj
  ipc.on("deleteProj", async function(event, arg) {
    await deleteProject(arg).then(res => {
      getAllProjs().then(result => {
        event.sender.send("asynchronous-reply", result);
      });
    });
  });
  //add a project
  ipc.on("add-project", async (event, arg) => {
    await add(arg);
  });
}
