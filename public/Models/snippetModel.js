
const db = require('../data/db')

module.exports = {

    addSnippet,
    getAllSnippets,
    deleteSnippet

}
//add a bookmark to project
async function addSnippet(snip) {
    const { name, snippet, language,category } = snip   
    return db("snippets")
        .insert({name,snippet,language,category}) 
      

}

//get all bookmarks
function getAllSnippets() {
    return db("snippets")
        .select()

}
function deleteSnippet(id) {
    return db('snippets')
        .where({ id })
        .del()
  }
  