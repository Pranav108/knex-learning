const usersService = require("../module/user.models.js");
const faker = require("faker");

exports.seeder = function (req, res, next) {
  const db = req.app.get("db");
  db.schema.hasTable("users").then(function (exists) {
    if (!exists) {
      db.schema
        .createTable("users", function (table) {
          table.increments("id").primary();
          table.string("name");
          table.string("email");
        })
        .then(function () {
          const records = [];
          for (let i = 0; i < 20; i++)
            records.push({
              name: faker.name.findName(),
              email: faker.internet.email(),
            });
          console.log(records);
          db("users")
            .insert(records)
            .then(() => {
              res.send("data seeded successfully");
            });
        });
    } else {
      res.send("Table exists - data already seeded");
    }
  });
};

exports.getAllUser = function (req, res, next) {
  const db = req.app.get("db");
  usersService.getAllUsers(db).then((data) => {
    res.send(data);
  });
};

exports.createUser = function (req, res) {
  const db = req.app.get("db");
  usersService.insertUser(db, req.body).then((data) => {
    res.send(data);
  });
};

exports.getUserById = function (req, res, next) {
  const db = req.app.get("db");
  usersService.getById(db, req.params.id).then((data) => {
    res.send(data);
  });
};

exports.updateUserById = function (req, res) {
  const db = req.app.get("db");
  usersService.updateUser(db, req.params.id, req.body).then(() => {
    res.status(204).end();
  });
};

exports.deleteUserById = function (req, res) {
  const db = req.app.get("db");
  usersService.deleteUser(db, req.params.id).then((data) => {
    res.status(204).end();
  });
};
