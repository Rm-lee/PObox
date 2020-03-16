const ipc = window.require("electron").ipcRenderer;
export const ADDBOOKMARKTOPROJ = "ADDBOOKMARKTOPROJ";
export const GETALLBOOKMARKS = "GETALLBOOKMARKS";
export const GETALLBOOKMARKSNOPID = "GETALLBOOKMARKSNOPID"
export const LOADING = "LOADING"


export function getAllBookMarks() {
  return dispatch => {
    ipc.send("getBookmarks");
    ipc.on("bookmark-list", function(event, arg) {
      dispatch({ type: GETALLBOOKMARKS, payload: arg });
    });
    ipc.removeListener("bookmark-list",getAllBookMarks)
  };
}
export function getAllBookMarksNoPid(){
  ipc.send("allBookMarksNoPid")
  return dispatch => {
    ipc.on("bookmarksWithoutPids", function(event, arg) {
    dispatch({ type: GETALLBOOKMARKSNOPID, payload: arg });
  });
  ipc.removeListener("bookmarksWithoutPids",getAllBookMarksNoPid)
  }
}
export function addBookMarkToProj(bookmark) {
  ipc.send("newBookmark", bookmark);  
  return dispatch => {
    dispatch({type:LOADING})
    
  }
}
export function addBookMark(bookmark) {
  ipc.send("newUnlinkedBookmark", bookmark);
  return dispatch => {
    dispatch({type:LOADING})
  }
}
export function deleteBookMark(markID) {
  ipc.send("deleteBookmark", markID);  
  return dispatch => {
    dispatch({type:LOADING}) 
  };
}

export function updateBookMark(id, mark) {
  ipc.send("updateBookMark", id, mark);
  return dispatch => {
      dispatch({ type: LOADING});    
  };
}
