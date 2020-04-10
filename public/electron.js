const electron = require("electron");
const { Tray, Menu, app } = electron;
const positioner = require("electron-traywindow-positioner");
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
const ipc = electron.ipcMain;
const { getAllCommandsWithPID, addCommandToProj } = require(path.join(
  __dirname,
  "./Models/commandModel"
));
const { getAllProjs, add, deleteProject } = require(path.join(
  __dirname,
  "./Models/projectModel"
));
const { addTodo, getAllTodos, deleteTodo } = require(path.join(
  __dirname,
  "./Models/todoModel"
));

const {
  addApp,
  getAllApps,
  deleteApp,
  updateApp,
  getAllAppsWithPid
} = require(path.join(__dirname, "./Models/appsModel"));
const fs = require("fs");
const os = require("os");
const dialog = electron.dialog;
const { shell } = require("electron");
const { exec, spawn } = require("child_process");

const {
  newBookmarkNoProj,
  getEveryBookmark,
  newProjBookmark,
  getProjBookmarks,
  deleteBookmark,
  updateBookmark
} = require(path.join(__dirname, "./ipcAPI/bookMarkAPI"));
const { addFileToProj, getAllFilesForProj } = require(path.join(
  __dirname,
  "./ipcAPI/filesAPI"
));
const { addSnippetAPI, getSnippetsAPI, deleteSnippetAPI } = require(path.join(
  __dirname,
  "./ipcAPI/snippetAPI"
));
const sysos = os.platform();

var dbus = require("dbus-native");

//create db and run migrations
const db = require("./data/db");
if (!fs.existsSync(path.resolve(app.getPath("userData"), "projects.db3"))) {
  db.migrate.latest().then(function() {
    return db.seed.run();
  });
}
//if linux if gnome kill process on suspend or gnome refresh because of glitch of losing system tray icon.
// if (sysos === 'linux'){

// need to watch for changes to

// systemctl show systemd-logind.service --property=WatchdogTimestamp

// then kill this process and restart
// this dev app has process name of electron, should change to po-box in future
// kill -9 $(pgrep electron | head -n 1)
// then relaunch applicationCache.
// }
// let poboxPid
// exec(
//   ` pgrep electron | head -n 1
//   `,
//   (err, stdout, stderr) => {
//     if (err) {
//    } else {
//       poboxPid = stdout
//     }
//   }
// );

// if login happens start another app then kill current on gnome(tray icon disapears)
function loggedin(val) {
  if (val === 0 || val === "0") {
    console.log("logged in");
    app.quit();
  }
}
var sessionBus = dbus.sessionBus();
sessionBus
  .getService("org.gnome.SessionManager")
  .getInterface(
    "/org/gnome/SessionManager/Presence",
    "org.gnome.SessionManager.Presence",
    (err, presence) => {
      // dbus signals are EventEmitter events
      presence.on("StatusChanged", function() {
        // console.log('Status', arguments);
        // if (argument[0] == "0"){
        loggedin(arguments[0]);
        //}
      });
    }
  );

// ipc communication between ipc.renderer
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

//add a project
ipc.on("add-project", async (event, arg) => {
  await add(arg);
});

//openBrowser Link

ipc.on("openLink", (event, arg) => {
  shell.openItem(arg);
});

//get list of installed apps linux

//search all of path with SH, weird glitch doesnt pull up some apps in /usr/bin like chrome, code ect
// oldifs="\${IFS}"
// IFS=':'; for i in \${PATH}; do
//     find "\${i}" -type f -executable | grep ${arg}
// done
// IFS="\${oldifs}"

ipc.on("installedApps", (event, arg) => {
  if (sysos === "linux") {
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

      console.log(res);
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
});

function app_func() {
  this.execCommand = function(cmd) {
    return new Promise((resolve, reject) => {
      exec(cmd, (error, stdout, stderr) => {
        resolve(stdout);
      });
    });
  };
}

var homePathSearch = new app_func();

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
    console.log(path);
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

//select dir of project with dialog
ipc.on("select-dirs", async (event, arg) => {
  const result = await dialog.showOpenDialog(window, {
    properties: ["openDirectory"]
  });
  event.sender.send("proj-selected", result.filePaths[0]);
});

//bookmark ipc APIs
newBookmarkNoProj();
getEveryBookmark();
newProjBookmark();
getProjBookmarks();
deleteBookmark();
updateBookmark();

//files ipc APIs
addFileToProj();
getAllFilesForProj();

//snippet ipc APIs
addSnippetAPI();
getSnippetsAPI();
deleteSnippetAPI();
//newproj
ipc.on("newProj", async function(event, arg) {
  await add(arg);
});

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

//deleteProj
ipc.on("deleteProj", async function(event, arg) {
  await deleteProject(arg).then(res => {
    getAllProjs().then(result => {
      event.sender.send("asynchronous-reply", result);
    });
  });
});

//add new todo
ipc.on("addTodo", async function(event, arg) {
  await addTodo(arg).then(res => {
    getAllTodos().then(result => {
      event.sender.send("todo-list", result);
    });
  });
});

//get all todos
ipc.on("getTodos", async function(event, arg) {
  console.log("fired get todo in electron");
  await getAllTodos().then(result => {
    event.sender.send("todo-list", result);
  });
});
//delete snippet
ipc.on("deleteTodo", async function(event, arg) {
  await deleteTodo(arg).then(result => {
    getAllTodos().then(result => {
      event.sender.send("todoDeleted", result);
    });
  });
});
//add new app
ipc.on("addApp", async function(event, arg) {
  console.log(` the arg in addapp is ${arg}`);
  await addApp(arg).then(res => {
    getAllAppsWithPid().then(result => {
      console.log(result);
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

//define window and tray globaly
let window = undefined;

let mainWindow;
let iconPath;
let appTray = null;

const toggleWindow = () => {
  if (window.isVisible()) {
    window.hide();
  } else {
    showWindow();
  }
};
//create tray browser window
function createWindow() {
  window = new BrowserWindow({
    width: 490,
    height: 550,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: true,
    transparent: true,
    backgroundColor: "#312450",
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js")
    }
  });
  window.setAlwaysOnTop(true);
  window.loadURL(
    isDev
      ? "http://localhost:3000/"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  //devtools redux
  // BrowserWindow.addDevToolsExtension(
  //   path.join(
  //     os.homedir(),
  //     ".config/google-chrome/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.17.0_0"
  //   )
  // );
}
const showWindow = () => {
  const trayBounds = appTray.getBounds();
  positioner.position(window, trayBounds);

  window.show();

  window.focus();
};
app.allowRendererProcessReuse = true;

app.on("ready", () => {
  iconPath = path.join(__dirname, "code.png");
  appTray = new Tray(iconPath);
  var contextMenu = Menu.buildFromTemplate([
    {
      label: "Show app",
      click: function() {
        toggleWindow();
      }
    },
    {
      label: "Quit",
      click: function() {
        app.isQuiting = true;
        app.quit();
      }
    }
  ]);

  appTray.on("click", function(event) {
    toggleWindow();
  });

  appTray.setContextMenu(contextMenu);

  createWindow();
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (appTray === null) {
    createWindow();
  }
});
