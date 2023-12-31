const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users/users");
var foodsRouter = require("./routes/foods/foods");
var chatsRouter = require("./routes/chats/chats");
var dealsRouter = require("./routes/deals/deals");
var friendshipsRouter = require("./routes/friendships/friendships");

const app = express();

const corsOptions = {
  origin: "*", // 実際のフロントエンドのURLに変更してください
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(logger("dev"));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/images", express.static("/var/backend/.data/images"));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/foods", foodsRouter);
app.use("/chats", chatsRouter);
app.use("/deals", dealsRouter);
app.use("/friendships", friendshipsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
