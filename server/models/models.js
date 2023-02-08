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
  Owner: { type: String, required: true },
});

const visitSchema = new Schema({
  Pet: { type: String, required: true }, //id
  Date: { type: Date, required: true },
  Description: { type: String },
  Vet: { type: String }, //default to assignedVet in funtionality
});

const sessionSchema = new Schema({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: 300, default: Date.now },
});

module.exports = {
  Pet: mongoose.model('Pet', petSchema),
  User: mongoose.model('User', userSchema),
  Session: mongoose.model('Session', sessionSchema),
  Visit: mongoose.model('Visit', visitSchema),
};

// // Adding some notes about the database here will be helpful for future you or other developers.
// // Schema for the database can be found below:
// // https://github.com/CodesmithLLC/unit-10SB-databases/blob/master/docs/assets/images/schema.png

// // We export an object that contains a property called query,
// // which is a function that returns the invocation of pool.query() after logging the query
// // This will be required in the controllers to be the access point to the database
// module.exports = {
//   query: (text, params, callback) => {
//     console.log('executed query', text);
//     return pool.query(text, params, callback);
//   },
// };
