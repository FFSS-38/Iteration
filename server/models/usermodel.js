const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  Name: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  Pets: { type: Array },
});

module.exports = mongoose.model('User', userSchema);