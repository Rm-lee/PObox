// Update with your config settings
const path = require("path");
const { app } = require("electron");
module.exports = {
  client: "sqlite3",
  connection: {
    filename: path.resolve(app.getPath("userData"), "projects.db3")
  },
  debug: true,
  pool: {
    afterCreate: (conn, done) => {
      conn.run("PRAGMA foreign_keys = ON", done);
    }
  },
  useNullAsDefault: true,
  migrations: {
    directory: path.join(__dirname, "./data/migrations")
  },
  seeds: {
    directory: path.join(__dirname, "./data/seeds")
  }
};
