const path = require("path");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("projects")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("projects").insert([
        {
          id: 1,
          name: "Project organizer",
          description: " Organize your projects",
          project_path: path.join(__dirname, "../../../")
        }
      ]);
    });
};
