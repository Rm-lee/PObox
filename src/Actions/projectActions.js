const ipc = window.require("electron").ipcRenderer;
export const CHOOSE_PROJECT_DIR = "CHOOSE_PROJECT_DIR";

export function chooseProjectDir() {
  ipc.send("select-dirs");
  return dispatch => {
    ipc.on("proj-selected", function(event, arg) {
      console.log(arg);

      dispatch({ type: CHOOSE_PROJECT_DIR, payload: arg });
    });
    ipc.removeListener("proj-selected", chooseProjectDir);
  };
}
