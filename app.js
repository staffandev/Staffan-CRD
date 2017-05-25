var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var app = express();
var Data = require("./schema");
var Login = require("./loginSchema");
var token = false;
mongoose.connect('mongodb://staffandev:dsign2006@ds041586.mlab.com:41586/staffandev');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error : '));
db.once('open', function(){console.log('Connection to DB good!');});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(__dirname + ''));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
});

app.get("https://boiling-garden-31614.herokuapp.com", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/form", (req, res) => {
  if (token === false){
    res.sendFile(__dirname + "/login.html");
  }
  else {
    res.sendFile(__dirname + "/form.html");
  }

});

app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/register.html");
});

app.post("/register", (req, res) => {
  var info = {
    username: req.body.username,
    password: req.body.password
  }

  Login.create(info, (login) => {
    res.redirect("/login.html");
  });
});



app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

app.post('/login', (req, res) => {
  Login.find({}, function(err, data){
    if(data[0].username === req.body.username && data[0].password === req.body.password){
      token = true;
      res.redirect('/form');
    } else{
      res.redirect('/login');
    }
  });
});

app.get("/test", (req, res) => {
  Login.find({}, function(err, data){
    console.log(data[0].username);
  });
});

app.get("/data", (req, res) => {
  Data.find({}, function(err, data){
    res.send(data);
  });
});

app.post("/", (req, res) => {
  var info = {
    imageurl: req.body.image,
    projekt: req.body.projekt,
    title: req.body.title,
    subtitle: req.body.subtitle,
    desc: req.body.desc
  }
  Data.create(info, (data) => {
    res.redirect("/form.html");
  });
});
app.listen(4600, () => {
  console.log("Server is upp and running on port: 4600");
})

//test