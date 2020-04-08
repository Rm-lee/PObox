const db = require("../data/db");

module.exports = {
  addFile,
  getAllFiles
  // getAllAppsWithPid,
  // deleteApp,
  // updateApp,
};
//add a bookmark to project
async function addFile(file) {
  const { name, file_path } = file;
  const { project_id } = app;
  const [file_id] = await db("files").insert({ name, file_path });
  return linkFileToProj(app_id, project_id);
}

//link a project_id to a app_id
function linkFileToProj(file_id, project_id) {
  return db("file_proj").insert({ file_id, project_id });
}

//get all bookmarks
function getAllFiles() {
  return db("files").select();
}
// }
// function getAllAppsWithPid() {
//     return db("apps as p")
//     .innerJoin('app_proj as ap','p.id','ap.id')
//         .select()

// }
// function deleteApp(id) {
//     return db('apps')
//         .where({ id })
//         .del()
//   }
//   function updateApp(id,app){
//       console.log(app)
//       const {name, app_path, launch} = app
//       console.log(id)
//     return db('apps')
//     .where('id',id)
//     .update({name,app_path,launch})
// }
