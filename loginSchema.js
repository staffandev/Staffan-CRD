var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var loginSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

var Login = mongoose.model("Login", loginSchema);
module.exports = Login;
