const electron = require("electron");
const { Tray, Menu, app } = electron;
const positioner = require("electron-traywindow-positioner");
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
const ipc = electron.ipcMain;
const fs = require("fs");
const os = require("os");
const dialog = electron.dialog;
const { shell } = require("electron");
const { App_Search_Func } = require(path.join(
  __dirname,
  "./jsUtils/AppSearch"
));
const { exec, spawn } = require("child_process");
const { todosAPI } = require(path.join(__dirname, "./ipcAPI/todoAPI"));
const { projectsAPI } = require(path.join(__dirname, "./ipcAPI/projectAPI"));
const { appsAPI } = require(path.join(__dirname, "./ipcAPI/appAPI"));
const { commandsAPI } = require(path.join(__dirname, "./ipcAPI/commandAPI"));
const { bookmarksAPI } = require(path.join(__dirname, "./ipcAPI/bookMarkAPI"));
const { filesAPI } = require(path.join(__dirname, "./ipcAPI/filesAPI"));
const { snippetsAPI } = require(path.join(__dirname, "./ipcAPI/snippetAPI"));
const sysos = os.platform();
var dbus = require("dbus-native");

//create db and run migrations
const db = require("./data/db");
if (!fs.existsSync(path.resolve(app.getPath("userData"), "projects.db3"))) {
  db.migrate.latest().then(function() {
    return db.seed.run();
  });
}

// if login happens close app
function loggedin(val) {
  if (val === 0) {
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
      // dbus signals
      presence.on("StatusChanged", function() {
        loggedin(arguments[0]);
      });
    }
  );

//openBrowser Link
ipc.on("openLink", (event, arg) => {
  shell.openItem(arg);
});

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
});

var homePathSearch = new App_Search_Func();

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

//select dir of project with dialog
ipc.on("select-dirs", async (event, arg) => {
  const result = await dialog.showOpenDialog(window, {
    properties: ["openDirectory"]
  });
  event.sender.send("proj-selected", result.filePaths[0]);
});
//commands ipcAPIs
commandsAPI();

//bookmark ipc APIs
bookmarksAPI();

//files ipc APIs
filesAPI();

//snippet ipc APIs
snippetsAPI();

//apps ipc APIs
appsAPI();

//projects APIs
projectsAPI();
//todos APIs
todosAPI();

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
