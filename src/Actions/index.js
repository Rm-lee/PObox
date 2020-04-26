export const GETALLPROJS = "GETALLPROJS";
export const ADDPROJ = "ADDPROJ";
export const CURRENTPROJ = "CURRENTPROJ";
export const GETINSTALLEDAPPS = "GETINSTALLEDAPPS";
export const GETALLCOMMANDS = "GETALLCOMMANDS";
export const ADDCOMMANDTOPROJ = "ADDCOMMANDTOPROJ";
export const GETALLSNIPPETS = "GETALLSNIPPETS";
export const DELETPROJECT = "DELETEPROJECT";
export const GETALLTODOS = "GETALLTODOS";
export const GETALLAPPS = "GETALLAPPS";
export const RESOURCELINKEDPROJS = "RESOURCELINKEDPROJS";

const ipc = window.require("electron").ipcRenderer;

export function setCurrentProject(proj) {
  return dispatch => {
    dispatch({ type: CURRENTPROJ, payload: proj });
  };
}

export function getAllProjs() {
  //logic

  return dispatch => {
    ipc.send("asynchronous-message", "get projs", null);
    ipc.on("asynchronous-reply", function(event, arg) {
      dispatch({ type: GETALLPROJS, payload: arg });
    });
  };
}

export function addProj(proj) {
  //logic

  ipc.send("add-project", proj);

  return dispatch => {
    ipc.send("asynchronous-message", "get projs", null);
    ipc.on("asynchronous-reply", function(event, arg) {
      dispatch({ type: GETALLPROJS, payload: arg });
    });
  };
}
export function deleteProj(projID) {
  ipc.send("deleteProj", projID);

  return dispatch => {
    ipc.on("asynchronous-reply", function(event, arg) {
      dispatch({ type: GETALLPROJS, payload: arg });
    });
  };
}

export function getInstalledApps(app) {
  return dispatch => {
    ipc.send("installedApps", app);
    ipc.on("list-of-installed-apps", function(event, arg) {
      dispatch({ type: GETINSTALLEDAPPS, payload: arg });
    });
    // ipc.removeListener("list-of-installed-apps",sameFuncAsipc.on)
  };
}

export function addCommandToProj(command) {
  ipc.send("newCommand", command);
  return dispatch => {
    ipc.on("commandAdded", function(event, arg) {
      dispatch({ type: GETALLCOMMANDS, payload: arg });
    });
  };
}
export function getAllCommands() {
  return dispatch => {
    ipc.send("getAllCommands", null);
    ipc.on("command-list", function(event, arg) {
      dispatch({ type: GETALLCOMMANDS, payload: arg });
    });
  };
}
export function getAllSnippets() {
  return dispatch => {
    ipc.send("getAllSnippets", null);
    ipc.on("snippet-list", function(event, arg) {
      dispatch({ type: GETALLSNIPPETS, payload: arg });
    });
  };
}

export function addSnippet(snip) {
  ipc.send("addSnippet", snip);

  return dispatch => {
    ipc.send("getAllSnippets");
    ipc.on("snippet-list", function(event, arg) {
      dispatch({ type: GETALLSNIPPETS, payload: arg });
    });
  };
}
export function deleteSnippet(snipID) {
  ipc.send("deleteSnippet", snipID);

  return dispatch => {
    ipc.on("snippetDeleted", function(event, arg) {
      dispatch({ type: GETALLSNIPPETS, payload: arg });
    });
  };
}
export function getAllTodos() {
  return dispatch => {
    ipc.send("getTodos", null);
    ipc.on("todo-list", function(event, arg) {
      dispatch({ type: GETALLTODOS, payload: arg });
    });
  };
}
export function addTodo(todo) {
  ipc.send("addTodo", todo);

  return dispatch => {
    ipc.send("getTodos", null);
    ipc.on("todo-list", function(event, arg) {
      dispatch({ type: GETALLTODOS, payload: arg });
    });
  };
}
export function deleteTodo(id) {
  ipc.send("deleteTodo", id);

  return dispatch => {
    ipc.on("todoDeleted", function(event, arg) {
      dispatch({ type: GETALLTODOS, payload: arg });
    });
  };
}
export function addApp(app) {
  ipc.send("addApp", app);
  return dispatch => {
    ipc.send("getAppsWithPid", null);
    ipc.on("app-list", function(event, arg) {
      dispatch({ type: GETALLAPPS, payload: arg });
    });
  };
}
export function getAllApps() {
  return dispatch => {
    ipc.send("getApps", null);
    ipc.on("applist", function(event, arg) {
      dispatch({ type: GETALLAPPS, payload: arg });
    });
  };
}
export function getAllAppsWithPid() {
  return dispatch => {
    ipc.send("getAppsWithPid", null);
    ipc.on("applist", function(event, arg) {
      dispatch({ type: GETALLAPPS, payload: arg });
    });
  };
}
export function deleteApp(id) {
  ipc.send("deleteApp", id);

  return dispatch => {
    ipc.on("appDeleted", function(event, arg) {
      dispatch({ type: GETALLAPPS, payload: arg });
    });
  };
}
export function updateApp(id, app) {
  ipc.send("updateApp", id, app);
  return dispatch => {
    ipc.on("appUpdated", function(event, arg) {
      dispatch({ type: GETALLAPPS, payload: arg });
    });
  };
}
export function launchAppSolo(app) {
  return dispatch => {
    ipc.send("launch-app-solo", app);
  };
}
export function launchAppInDir(app, path) {
  return dispatch => {
    ipc.send("launch-app-in-dir", app, path);
  };
}

export function openUrl(url) {
  return dispatch => {
    ipc.send("openLink", url);
  };
}
export function getLinkedProjects(id, type) {
  if (type === "file") {
    ipc.send("filesLinkedProjects", id);
    return dispatch => {
      ipc.on("filesLinkedProjs", function(event, arg) {
        dispatch({ type: RESOURCELINKEDPROJS, payload: arg });
      });
    };
  }
}
