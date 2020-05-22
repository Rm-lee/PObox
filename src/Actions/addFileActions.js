export const GETALLFILES = "GETALLFILES";
const ipc = window.require("electron").ipcRenderer;

export function addFileToProj(file) {
  console.log(file);
  ipc.send("addFile", file);

  return dispatch => {
    ipc.on("allFiles", function(event, arg) {
      dispatch({ type: GETALLFILES, payload: arg });
    });
  };
}
export function getAllFiles() {
  ipc.send("getAllFiles");
  return dispatch => {
    ipc.on("allFiles", function(event, arg) {
      dispatch({ type: GETALLFILES, payload: arg });
    });
  };
}
export function updateFile(id, file) {
  console.log(id, file);
  ipc.send("updateFile", id, file);
  return dispatch => {};
}
export function deleteFile(fileId) {
  ipc.send("deleteFile", fileId);
  return dispatch => {};
}

export function linkFileToProj(file_id, proj_id) {
  ipc.send("linkFileToProjs", file_id, proj_id);
  return dispatch => {};
}
