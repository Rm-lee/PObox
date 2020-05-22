const db = require("../data/db");

module.exports = {
  addCommandToProj,
  getAllCommandsWithPID,
  linkCommandToProj,
  getCommandsForProj,
  getAllCommands,
  deleteCommand,
  getLinkedProjs
};
//add a command to project
async function addCommandToProj(commandtoadd) {
  const { name, command, category, description } = commandtoadd;
  const { project_id } = commandtoadd;
  const [command_id] = await db("commands").insert({
    name,
    command,
    description,
    category
  });
  return linkCommandToProj(command_id, project_id);
}
//link a project_id to a command_id
function linkCommandToProj(command_id, project_id) {
  return db("command_cat").insert({ command_id, project_id });
}
//get all commands
function getAllCommands() {
  return db("commands").select();
}
//get all bookmarks for a project
function getCommandsForProj(id) {
  return db("command_cat").where("project_id", id);
}
function deleteCommand(id) {
  return db("commands")
    .where({ id })
    .del();
}

function getAllCommandsWithPID() {
  return db("commands as c")
    .innerJoin("command_cat as cc", "c.id", "cc.command_id")
    .select();
}
function getLinkedProjs(id) {
  console.log("test");
  return db("command_cat")
    .where("command_id", id)
    .select("project_id");
}
