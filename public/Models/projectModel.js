const db = require("../data/db");

module.exports = {
  add,
  getAllProjs,
  deleteProject
};

function add(proj) {
  return db("projects").insert(proj);

  // .returning('*')
}

async function deleteProject(id) {
  await db("projects")
    .where({ id })
    .del();
  // .then(res => {
  // db('file_proj')
  // .where(id,'project_id')
  // .del()
  // .then(res => {
  //   db('app_proj')
  //   .where(id,'project_id')
  //   .del()
  //   .then(res => {
  //     db('books_proj')
  //     .where(id,'project_id')
  //     .del()
  //     .then(res => {
  //       db('command_cat')
  //       .where(id,'project_id')
  //       .del()
  //       .then(res => {
  //         db('todos')
  //         .where(id,'project_id')
  //         .del()
  //       })
  //     })
  //   })
  // })
  // })
}

function getAllProjs() {
  return db("projects").select();
}
// function getOrgInfo(id){
//     return db("organizer")
//     .where({id})
//     .first("id","username","name","email","bio",)
// }
