const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
});

const petSchema = new Schema({
  Name: { type: String, required: true },
  Age: { type: Number },
  Weight: { type: Number },
  Breed: { type: String },
  AssignedVet: { type: String },
  URL: { type: String },
  Owner: { type: String, required: true },
});

const visitSchema = new Schema({
  Pet: { type: String, required: true }, //id
  Date: { type: String, required: true },
  Reason: { type: String },
  Vet: { type: String }, //default to assignedVet in funtionality
});

const sessionSchema = new Schema({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: 3000, default: Date.now },
});

const noteSchema = new Schema({
  Pet: { type: String, required: true }, //id
  // Date: { type: String, required: true },
  Note: { type: String, required: true },
});

module.exports = {
  Pet: mongoose.model('Pet', petSchema),
  User: mongoose.model('User', userSchema),
  Session: mongoose.model('Session', sessionSchema),
  Visit: mongoose.model('Visit', visitSchema),
  Note: mongoose.model('Note', noteSchema),
};
