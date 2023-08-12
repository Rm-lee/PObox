const db = require("../data/db");

module.exports = {
  addBookMark,
  getAllBookMarks,
  linkBooktoProj,
  getBookmarksForProj,
  getAllBookMarksWithPID,
  deleteBookMark,
  updateBookMark,
  addNonLinkedBookMark,
  getLinkedProjs
};
//add a bookmark to project
async function addBookMark(mark) {
  const { name, description, url, category } = mark;
  const { project_id } = mark;
  const [bookmark_id] = await db("bookmarks").insert({
    name,
    description,
    url,
    category
  });
  return linkBooktoProj(bookmark_id, project_id);
}
//adding bookmark unlinked to a project
function addNonLinkedBookMark(mark) {
  return db("bookmarks").insert(mark);
}
//link a project_id to a bookmark_id
function linkBooktoProj(bookmark_id, project_id) {
  return db("books_proj").insert({ bookmark_id, project_id });
}
//get all bookmarks
function getAllBookMarks() {
  return db("bookmarks").select();
}
//get all bookmarks for a project
function getBookmarksForProj(id) {
  return db("books_proj").where("project_id", id);
}

function getAllBookMarksWithPID() {
  return db("bookmarks as b")
    .innerJoin("books_proj as bp", "b.id", "bp.bookmark_id")
    .select();
}
function deleteBookMark(id) {
  return db("bookmarks")
    .where({ id })
    .del();
}
function updateBookMark(id, mark) {
  const { name, url, launch, category, description } = mark;
  return db("bookmarks")
    .where("id", id)
    .update({ name, url, category, description, launch });
}
function getLinkedProjs(id) {
  return db("books_proj")
    .where("bookmark_id", id)
    .select("project_id");
}
