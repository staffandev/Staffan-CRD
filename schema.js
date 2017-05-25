var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var dataSchema = new Schema({
  imageurl: {
    type: String,
    required: true
  },
  projekt: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  }
});

var Data = mongoose.model("Data", dataSchema);
module.exports = Data;
