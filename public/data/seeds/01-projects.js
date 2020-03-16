
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {id: 1, name: 'Project organizer',description:" Organize your projects",project_path:"/hyde/home/documents/react/2"},
        {id: 2, name: 'test app1',description:" web app",project_path:"/hyde/home/documents/react/1"},
        {id: 3, name: 'test app2',description:" desktop app",project_path:"/hyde/home/documents/react"},

      ]);
    });
};
