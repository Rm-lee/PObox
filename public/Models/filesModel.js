const db = require("../data/db");

module.exports = {
  addFile,
  getAllFiles,
  updateFile,
  deleteFileModel
  // updateApp,
};
//add a fileResource to project
async function addFile(file) {
  const { name, file_path, category } = file;
  const { project_id } = file;
  const [file_id] = await db("files").insert({ name, file_path, category });
  return linkFileToProj(file_id, project_id);
}

//link a project_id to a file_id
function linkFileToProj(file_id, project_id) {
  return db("file_proj").insert({ file_id, project_id });
}

// //get all bookmarks
// function getAllFilesNoPID() {
//   return db("files").select();
// }

function getAllFiles() {
  return db("files as f")
    .innerJoin("file_proj as fp", "f.id", "fp.file_id")
    .select();
}

function updateFile(id, file) {
  const { name, file_path, launch } = file;
  return db("files")
    .where("id", id)
    .update({ name, file_path, launch });
}

function deleteFileModel(id) {
  return db("files")
    .where({ id })
    .del();
}
//   function updateApp(id,app){
//       console.log(app)
//       const {name, app_path, launch} = app
//       console.log(id)
//     return db('apps')
//     .where('id',id)
//     .update({name,app_path,launch})
// }
