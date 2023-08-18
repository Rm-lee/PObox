const fs = require("fs");
const git = require("git-last-commit")
const electron = require("electron");
const path = require("path");
const os = require("os");
const sysos = os.platform();
const { exec, spawn } = require("child_process");
const ipc = electron.ipcMain;

function gitinfo() {

    ipc.on("get_git_info", async function (event, id, app) {
        git.getLastCommit(function (err, commit) {
            // read commit object properties
            event.sender.send("git_info", commit);
        });
    });

}
module.exports = { gitinfo }