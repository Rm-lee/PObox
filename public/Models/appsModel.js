const db = require("../data/db");

module.exports = {
  addApp,
  getAllApps,
  getAllAppsWithPid,
  deleteApp,
  updateApp
};
//add a bookmark to project
async function addApp(app) {
  const { name, app_path, launch } = app;
  const { project_id } = app;
  const [app_id] = await db("apps").insert({ name, app_path, launch });
  return linkAppToProj(app_id, project_id);
}

//link a project_id to a app_id
function linkAppToProj(app_id, project_id) {
  return db("app_proj").insert({ app_id, project_id });
}

//get all bookmarks
function getAllApps() {
  return db("apps").select();
}
function getAllAppsWithPid() {
  return db("apps as p")
    .innerJoin("app_proj as ap", "p.id", "ap.id")
    .select();
}
function deleteApp(id) {
  return db("apps")
    .where({ id })
    .del();
}
function updateApp(id, app) {
  const { name, app_path, launch } = app;
  return db("apps")
    .where("id", id)
    .update({ name, app_path, launch });
}
