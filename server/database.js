const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const fs = require('fs');
const credentials = './server/X509-cert-3638548484308457929.pem';
const client = new MongoClient(
  'mongodb+srv://cluster0.g3hjzks.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority',
  {
    sslKey: credentials,
    sslCert: credentials,
    serverApi: ServerApiVersion.v1,
  }
);

mongoose
  .connect(
    'mongodb+srv://cluster0.g3hjzks.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority',
    {
      sslKey: credentials,
      sslCert: credentials,
      serverApi: ServerApiVersion.v1,
    }
    // {
    //   // options for the connect method to parse the URI
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   // sets the name of the DB that our collections are part of
    //   dbName: 'Wonderpets',
    // }
  )
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const userSchema = new Schema({
  Name: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
});

// async function run() {
//   // try {
//   await client.connect();
//   const database = client.db('Wonderpets');
//   const collection = database.collection('Users');
//   const docCount = await collection.countDocuments({});

// }
// run().catch(console.dir);

const petSchema = new Schema({
  Name: { type: String, required: true },
  Age: { type: Number },
  Avatar: { type: String },
  Notes: { type: String },
  Weight: { type: Number, required: true },
  Breed: { type: String, required: true },
  LastVisit: { type: Date, required: true },
  ScheduledEvents: { type: String, required: true },
  VetID: { type: String, required: true },
});

const Pets = mongoose.model('Pets', petSchema);
const Users = mongoose.model('Users', userSchema);
module.exports = { Users, Pets };
// const { Pool } = require('pg');

// const PG_URI =
//   'mongodb+srv://cluster0.g3hjzks.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority';

// // create a new pool here using the connection string above
// const pool = new Pool({
//   connectionString: PG_URI,
// });

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
