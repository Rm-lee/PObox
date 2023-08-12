const electron = require("electron");
const path = require("path");
const os = require("os");
const sysos = os.platform();
const { exec, spawn } = require("child_process");
const ipc = electron.ipcMain;
const { App_Search_Func } = require(path.join(
  __dirname,
  "../jsUtils/AppSearch"
));
const {
  addApp,
  getAllApps,
  deleteApp,
  updateApp,
  getAllAppsWithPid
} = require(path.join(__dirname, "../Models/appsModel"));
module.exports = {
  appsAPI
};

function appsAPI() {
  //add new app
  ipc.on("addApp", async function (event, arg) {
    await addApp(arg).then(res => {
      getAllAppsWithPid().then(result => {
        event.sender.send("applist", result);
      });
    });
  });
  //get all apps
  ipc.on("getApps", async function (event, arg) {
    await getAllApps().then(result => {
      event.sender.send("applist", result);
    });
  });
  //get all apps with project id
  ipc.on("getAppsWithPid", async function (event, arg) {
    await getAllAppsWithPid().then(result => {
      event.sender.send("applist", result);
    });
  });
  //delete app
  ipc.on("deleteApp", async function (event, arg) {
    await deleteApp(arg).then(result => {
      getAllAppsWithPid().then(result => {
        event.sender.send("appDeleted", result);
      });
    });
  });
  //update app
  ipc.on("updateApp", async function (event, id, app) {
    await updateApp(id, app).then(result => {
      getAllAppsWithPid().then(result => {
        event.sender.send("appUpdated", result);
      });
    });
  });
}

var homePathSearch = new App_Search_Func();
//search for apps
ipc.on("installedApps", (event, arg) => {
  if (sysos === "linux") {
    //get list of installed apps linux

    exec(
      `oldifs="\${IFS}"
IFS=':'; for i in \${PATH}; do
    find "\${i}" -executable | grep ${arg}
done
IFS="\${oldifs}"`,
      (err, stdout, stderr) => {
        if (err) {
          //some err occurred
        } else {
          // the *entire* stdout and stderr (buffered)
          let linuxApps = [];

          let applications = stdout.split("\n");
          applications.forEach(app => {
            let pathTo = app;
            let name = app.slice(app.lastIndexOf("/") + 1);
            let appObj = { name: `${name}`, path: `${pathTo}` };
            if (appObj.name) {
              linuxApps.push(appObj);
            }
          });
          event.sender.send("list-of-installed-apps", linuxApps);
        }
      }
    );
  }
  if (sysos === "win32") {
    let cmd = `where /r "%homepath%\\AppData\\Roaming" *.lnk | findstr /i "${arg}"  & where /r "%programdata%\\Microsoft\\Windows" *.lnk  | findstr  /i "${arg}" & where *.exe | findstr /i ${arg}`;
    homePathSearch.execCommand(cmd).then(res => {
      let windowsApps = [];

      // the *entire* stdout and stderr (buffered)
      let list = res.split("\r");

      let applications;

      applications = list.filter(exe => exe.indexOf("\\Windows\\System32") < 0);
      applications.forEach(app => {
        let nameStart = app.lastIndexOf("\\");
        let ext;
        if (app.indexOf(".exe") > -1) {
          ext = ".exe";
        } else {
          ext = ".lnk";
        }
        let nameEnd = app.indexOf(ext);
        let nameOfApp = app.slice(nameStart + 1, nameEnd);
        let pathTo = app;
        const appObj = {
          name: `${nameOfApp}`,
          path: `${pathTo.replace("\n", "")}`
        };
        if (appObj.name) {
          windowsApps.push(appObj);
        }
      });
      event.sender.send("list-of-installed-apps", windowsApps);
    });
  }
  if (sysos === "darwin") {
    //get list of installed apps linux

    exec(
      `oldifs="\${IFS}"
IFS=':'; for i in \${PATH}; do
    find "\${i}" -executable | grep ${arg}
done
IFS="\${oldifs}"`,
      (err, stdout, stderr) => {
        if (err) {
          //some err occurred
        } else {
          // the *entire* stdout and stderr (buffered)
          let macApps = [];

          let applications = stdout.split("\n");
          applications.forEach(app => {
            let pathTo = app;
            let name = app.slice(app.lastIndexOf("/") + 1);
            let appObj = { name: `${name}`, path: `${pathTo}` };
            if (appObj.name) {
              macApps.push(appObj);
            }
          });
          event.sender.send("list-of-installed-apps", macApps);
        }
      }
    );
  }
});

//app launcher in proj dir

ipc.on("launch-app-in-dir", async (event, app, path) => {
  if (sysos === "win32") {
    let dot = "";
    if (app.name.toLowerCase() === "code") {
      dot = ".";
    }
    exec(`cd "${path}" && "${app.app_path}" ${dot}`, (err, stdout, stderr) => {
      if (err) {
        console.log(err);
      } else {
      }
    });
  }
  if (sysos === "linux") {
    exec(`cd ${path} && ${app.app_path} .`, (err, stdout, stderr) => {
      if (err) {
        console.log(err);
      } else {
        // the *entire* stdout and stderr (buffered)
      }
    });
  }
});

//app launcher solo

ipc.on("launch-app-solo", async (event, app) => {
  if (sysos === "win32") {
    let dot = "";
    if (app.name.toLowerCase() === "code") {
      dot = ".";
    }
    exec(`cd %homepath% && "${app.app_path}" ${dot}`, (err, stdout, stderr) => {
      if (err) {
        console.log(err);
      } else {
      }
    });
  }
  if (sysos === "linux") {
    exec(`cd ~/ && ${app.app_path} .`, (err, stdout, stderr) => {
      if (err) {
        console.log(err);
      } else {
        // the *entire* stdout and stderr (buffered)
      }
    });
  }
});
