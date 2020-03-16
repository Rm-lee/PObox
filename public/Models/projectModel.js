
const db = require('../data/db')

module.exports = {
   
  add,
  getAllProjs,
  deleteProject
 
}

  function add(proj){
    return db("projects")    
    .insert(proj)

    // .returning('*')
    
 
}

function deleteProject(id) {
  return db('projects')
      .where({ id })
      .del()
}

function getAllProjs(){
 return db("projects")
    .select() 
  
}
// function getOrgInfo(id){
//     return db("organizer")
//     .where({id})
//     .first("id","username","name","email","bio",)
// }