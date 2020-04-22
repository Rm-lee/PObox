const electron = require("electron");
const path = require("path");
const ipc = electron.ipcMain;
const {
  addApp,
  getAllApps,
  deleteApp,
  updateApp,
  getAllAppsWithPid
} = require(path.join(__dirname, "./Models/appsModel"));
module.exports = {
  appsAPI
};

function appsAPI() {
  //add new app
  ipc.on("addApp", async function(event, arg) {
    await addApp(arg).then(res => {
      getAllAppsWithPid().then(result => {
        event.sender.send("applist", result);
      });
    });
  });
  //get all apps
  ipc.on("getApps", async function(event, arg) {
    await getAllApps().then(result => {
      event.sender.send("applist", result);
    });
  });
  //get all apps with project id
  ipc.on("getAppsWithPid", async function(event, arg) {
    await getAllAppsWithPid().then(result => {
      event.sender.send("applist", result);
    });
  });
  //delete app
  ipc.on("deleteApp", async function(event, arg) {
    await deleteApp(arg).then(result => {
      getAllAppsWithPid().then(result => {
        event.sender.send("appDeleted", result);
      });
    });
  });
  //update app
  ipc.on("updateApp", async function(event, id, app) {
    await updateApp(id, app).then(result => {
      getAllAppsWithPid().then(result => {
        event.sender.send("appUpdated", result);
      });
    });
  });
}
