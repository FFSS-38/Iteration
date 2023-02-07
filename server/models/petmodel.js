const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petSchema = new Schema({
  Name: { type: String, required: true },
  Age: { type: Number },
  Weight: { type: Number },
  Breed: { type: String },
  LastVisit: { type: String },
  AssignedVet: { type: String, required: true },
  Owner: { type: Object, required: true },
});

module.exports = mongoose.model('Pet', petSchema);
