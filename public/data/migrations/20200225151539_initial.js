exports.up = async function(knex) {
  await knex.schema.createTable("users", user => {
    user.increments("id");

    user
      .string("username", 255)
      .notNullable()
      .unique();

    user.string("password", 255).notNullable();
  });

  await knex.schema.createTable("projects", pro => {
    pro.increments("id");
    pro
      .string("name")
      .unique()
      .notNullable();
    pro.string("description");
    pro
      .string("project_path")
      .unique()
      .notNullable();
    // pro.integer("user_id").unsigned().notNullable().references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE')
  });
  await knex.schema.createTable("files", fil => {
    fil.increments("id");
    fil
      .string("name")
      .unique()
      .notNullable();
    fil.string("category").notNullable();
    fil
      .string("file_path")
      .unique()
      .notNullable();
  });
  await knex.schema.createTable("apps", app => {
    app.increments("id");
    app.string("name").notNullable();
    app.string("app_path").notNullable();
    app
      .boolean("launch")
      .defaultTo(false)
      .notNullable();
  });

  await knex.schema.createTable("bookmarks", book => {
    book.increments("id");
    book
      .string("name")
      .unique()
      .notNullable();
    book.string("description");
    book.string("url").notNullable();
    book.string("category").notNullable();
    book
      .boolean("launch")
      .defaultTo(false)
      .notNullable();
  });
  await knex.schema.createTable("commands", com => {
    com.increments("id");
    com.string("command").notNullable();
    com.string("name").notNullable();
    com.string("category").notNullable();
    com.string("description").notNullable();
  });

  await knex.schema.createTable("file_proj", filp => {
    filp.increments("id");
    filp
      .integer("file_id")
      .notNullable()
      .references("id")
      .inTable("files")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    filp
      .integer("project_id")
      .notNullable()
      .references("id")
      .inTable("projects")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });

  await knex.schema.createTable("app_proj", appp => {
    appp.increments("id");
    appp
      .integer("app_id")
      .notNullable()
      .references("id")
      .inTable("apps")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    appp
      .integer("project_id")
      .notNullable()
      .references("id")
      .inTable("projects")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });

  await knex.schema.createTable("books_proj", bcat => {
    bcat.increments("id");
    bcat
      .integer("bookmark_id")
      .notNullable()
      .references("id")
      .inTable("bookmarks")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    bcat
      .integer("project_id")
      .notNullable()
      .references("id")
      .inTable("projects")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });

  await knex.schema.createTable("command_cat", ccat => {
    ccat.increments("id");
    ccat
      .integer("command_id")
      .notNullable()
      .references("id")
      .inTable("commands")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    ccat
      .integer("project_id")
      .notNullable()
      .references("id")
      .inTable("projects")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });

  await knex.schema.createTable("snippets", snip => {
    snip.increments("id");
    snip.string("name").notNullable();
    snip.string("category").notNullable();
    snip.string("snippet").notNullable();
    snip.string("language").notNullable();
  });
  await knex.schema.createTable("todos", todo => {
    todo.increments("id");
    todo.string("todo").notNullable();
    todo.integer("project_id").notNullable();
  });
};
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("todo")
    .dropTableIfExists("snippets")
    .dropTableIfExists("command_cat")
    .dropTableIfExists("books_proj")
    .dropTableIfExists("app_proj")
    .dropTableIfExists("file_proj")
    .dropTableIfExists("commands")
    .dropTableIfExists("bookmarks")
    .dropTableIfExists("apps")
    .dropTableIfExists("files")
    .dropTableIfExists("projects")
    .dropTableIfExists("users");
};
