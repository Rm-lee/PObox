const fs = require("fs");
const git = require("git-last-commit")
const electron = require("electron");
const path = require("path");
const os = require("os");
const sysos = os.platform();
const { exec, spawn } = require("child_process");
const ipc = electron.ipcMain;

ipc.on("get_git_info", async function (event, id, app) {
    git.getLastCommit(function (err, commit) {
        // read commit object properties
        event.sender.send("git_info", commit);
    });
});

function gitinfo() {
    fs.watch("./", { recursive: true }, (eventType, filename) => {
        console.log("The file ", filename, " was modified!");
        git.getLastCommit(function (err, commit) {
            // read commit object properties
            console.log(commit);
        });        // We can look for different types of changes on a file
        // using the event type like: rename, change, etc.
        // console.log("It was a ", eventType, " event type.");
    });
}
module.exports = { gitinfo }