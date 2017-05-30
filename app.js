var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var app = express();
var Data = require("./schema");
var Login = require("./loginSchema");
var token = false;
const aws = require('aws-sdk');
var nodemailer = require("nodemailer");

mongoose.connect('mongodb://staffandev:dsign2006@ds041586.mlab.com:41586/staffandev');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error : '));
db.once('open', function() { console.log('Connection to DB good!'); });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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


const S3_BUCKET = process.env.S3_BUCKET;

const user_name = 'staffanericson2@gmail.com';
const refresh_token = '';
const access_token = '';
const client_id = '994918690662-tvcdmu2fk57d6pfu7g2ghlu9ekp07oal.apps.googleusercontent.com';
const client_secret = 'JZG-vVF01e8DImUhdKaZMB8b';

const email_to = 'staffanericson2@gmail.com';


var smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        type: 'OAuth2',
        clientId: client_id,
        clientSecret: client_secret
    }
});

smtpTransport.on('token', token => {
    console.log('A new access token was generated');
    console.log('User: %s', token.user);
    console.log('Access Token: %s', token.accessToken);
    console.log('Expires: %s', new Date(token.expires));
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get('/send', function(req, res) {
    var mailOptions = {
        to: req.query.to,
        subject: req.query.subject,
        text: req.query.text
    }
    console.log(mailOptions);
});

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});

app.get("/form", (req, res) => {
    if (token === false) {
        res.sendFile(__dirname + "/login.html");
    } else {
        res.sendFile(__dirname + "/form.html");
    }

});


app.get('/sign-s3', (req, res) => {
    const s3 = new aws.S3({
        signatureVersion: 'v4',
        region: 'eu-central-1'
    });

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
        if (err) {
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
    Login.find({}, function(err, data) {
        if (data[0].username === req.body.username && data[0].password === req.body.password) {
            token = true;
            res.redirect('/form');
        } else {
            res.redirect('/login');
        }
    });
});

app.get("/test", (req, res) => {
    Login.find({}, function(err, data) {
        console.log(data[0].username);
    });
});

app.get("/data", (req, res) => {
    Data.find({}, function(err, data) {
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


app.listen(process.env.PORT || 3000, function() {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});