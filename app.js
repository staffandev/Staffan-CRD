var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var app = express();
var Data = require("./schema");
var Login = require("./loginSchema");
var token = false;
/*var path = require('path'),
var fs = require("fs-extra");*/
const aws = require('aws-sdk');


mongoose.connect('mongodb://staffandev:dsign2006@ds041586.mlab.com:41586/staffandev');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error : '));
db.once('open', function(){console.log('Connection to DB good!');});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
/*app.use(express.bodyParser({uploadDir:'/path/to/temporary/directory/to/store/uploaded/files'}));*/
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

/*app.set('views', './views');
app.use(express.static('./public'));*/
/*app.engine('html', require('ejs').renderFile);*/
/*app.listen(process.env.PORT || 3000);*/

const S3_BUCKET = process.env.S3_BUCKET;

app.get("/", (req, res) => {
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


app.get('/sign-s3', (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
});

app.post('/save-details', (req, res) => {
  // TODO: Read POSTed form data and do something useful
  alert("skickat");
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

/*var path = require('path'),
    fs = require('fs');
*/

/*app.post('/upload', function (req, res) {
    var tempPath = req.files.file.path,
        targetPath = path.resolve('./uploads/image.png');
    if (path.extname(req.files.file.name).toLowerCase() === '.png') {
        fs.rename(tempPath, targetPath, function(err) {
            if (err) throw err;
            console.log("Upload completed!");
        });
    } else {
        fs.unlink(tempPath, function () {
            if (err) throw err;
            console.error("Only .png files are allowed!");
        });
    }
});*/

/*app.get('/image.png', function (req, res) {
    res.sendfile(path.resolve('./uploads/image.png'));
}); */

/*app.listen(4600, () => {
  console.log("Server is upp and running on port: 4600");
})*/
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});