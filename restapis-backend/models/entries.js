const mongoose = require('mongoose');

const entriesSchema = mongoose.Schema({
  dateOfEntry: { type: Date, require: Date.now },
  entry: { type: String, require: true },
  title: { type: String, require: true }
});

const userSchema = mongoose.Schema({
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  entries: [entriesSchema]
});

module.exports = mongoose.model('User', userSchema);