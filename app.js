var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const flatted = require("flatted");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use('/login', (req,res) => {
  res.redirect('https://auth.todaycode.org/login?client_id=6kn128fpk2ijuia7daituipcqn&response_type=token&scope=email+openid&redirect_uri=https://api.todaycode.org/callback&CognitoCloudFrontEndpoint=https%3A%2F%2Fdpp0gtxikpq3y.cloudfront.net&CognitoCloudFrontVersion=20221014152150&CustomerCloudFrontEndpoint=d3pzxyxkde08tg.cloudfront.net&CustomerCloudFrontVersion=20221112052502&SanitizedQueryString=client_id%3D6kn128fpk2ijuia7daituipcqn%26response_type%3Dcode%26scope%3Demail%2Bopenid%26redirect_uri%3Dhttps%3A%2F%2Fapi.todaycode.org%2Fcallback&loginErrorMessage=You+tried+to+access+a+page+that+requires+authentication%2C+please+try+again+after+authenticating')
})

app.use("/callback", (req, res) => {
  res.send(req.query);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
