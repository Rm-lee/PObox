const electron = require("electron");
const path = require("path");
const ipc = electron.ipcMain;
const {
  addBookMark,
  addNonLinkedBookMark,
  getAllBookMarks,
  getAllBookMarksWithPID,
  updateBookMark,
  deleteBookMark,
  getLinkedProjs
} = require(path.join(__dirname, "../Models/bookMarksModel"));
module.exports = {
  bookmarksAPI
};

//newbookmark not linked to a proj
function bookmarksAPI() {
  ipc.on("newUnlinkedBookmark", async function(event, arg) {
    await addNonLinkedBookMark(arg).then(res => {
      getAllBookMarks().then(result => {
        event.sender.send("bookmarksWithoutPids", result);
      });
    });
  });

  //allbookmarks no pid
  ipc.on("allBookMarksNoPid", async function(event, arg) {
    getAllBookMarks().then(result => {
      event.sender.send("bookmarksWithoutPids", result);
    });
  });

  //newbookmark
  ipc.on("newBookmark", async function(event, arg) {
    await addBookMark(arg).then(res => {
      getAllBookMarksWithPID().then(result => {
        event.sender.send("bookmark-list", result);
      });
      getAllBookMarks().then(result => {
        event.sender.send("bookmarksWithoutPids", result);
      });
    });
  });

  //get all bookmarks
  ipc.on("getBookmarks", async function(event, arg) {
    await getAllBookMarksWithPID().then(resu => {
      event.sender.send("bookmark-list", resu);
    });
  });

  //deletebookmark
  ipc.on("deleteBookmark", async function(event, arg) {
    await deleteBookMark(arg).then(result => {
      getAllBookMarksWithPID().then(result => {
        event.sender.send("bookmark-list", result);
      });
      getAllBookMarks().then(result => {
        event.sender.send("bookmarksWithoutPids", result);
      });
    });
  });

  //update  bookmark
  ipc.on("updateBookMark", async function(event, id, mark) {
    await updateBookMark(id, mark).then(result => {
      getAllBookMarksWithPID().then(result => {
        event.sender.send("bookmark-list", result);
      });
      getAllBookMarks().then(result => {
        event.sender.send("bookmarksWithoutPids", result);
      });
    });
  });
}
ipc.on("bookmarkLinkedProjects", async function(event, arg) {
  await getLinkedProjs(arg)
    .then(result => {
      event.sender.send("bookmarkLinkedProjs", result);
    })
    .catch(err => {
      console.log("\n\nlinked", err);
    });
});
