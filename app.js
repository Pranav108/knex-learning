var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");

var userRouter = require("./routes/user.routes");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(cookieParser());

const db = require("knex")({
  client: "mysql",
  connection: {
    host: "localhost",
    user: "pranav",
    password: "pranav",
    database: "firstdatabase",
  },
});

app.set("db", db);

app.use("/", userRouter);

app.listen(3000, () => {
  console.log(`Server listening at http://localhost:3000`);
});

module.exports = app;
