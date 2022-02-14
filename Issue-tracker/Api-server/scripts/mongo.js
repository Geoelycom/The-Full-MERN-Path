const { MongoClient } = require('mongodb');
//const mongoose = require( 'mongoose')
require('dotenv').config()
const uri = "mongodb+srv://Elyan: "+ process.env.DB_URI + "@userproifle.g0qgd.mongodb.net/IssueDatabase?retryWrites=true&w=majority";

function testWithCallbacks(callback) {
  console.log('\n--- testWithCallbacks ---');
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(function(err, client) {
    if (err) {
      callback(err);
      return;
    }
    console.log('Connected to MongoDB');

    const db = client.db();
    const collection = db.collection('employees');

    const employee = { id: 1, name: 'A. Callback', age: 23 };
    collection.insertOne(employee, function(err, result) {
      if (err) {
        client.close();
        callback(err);
        return;
      }
      console.log('Result of insert:\n', result.insertedId);
      collection.find({ _id: result.insertedId})
        .toArray(function(err, docs) {
        if (err) {
          client.close();
          callback(err);
          return;
        }
        console.log('Result of find:\n', docs);
        client.close();
        callback(err);
      });
    });
  });
}


async function testWithAsync(){
  console.log('\n --- testWithAsync ---');
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

  try {
    await client.connect()
    console.log('Connected to mongodb')
    const db  = client.db();
    const collection = db.collection('employees');

    const employee = { id: 2, name: 'B. margaret', age: 65};
    const result = await collection.insertOne(employee)
     console.log('Result of insert: \n', result.insertedId)
     
     const docs = await collection.find({_id: result.insertedId })
     .toArray()
     console.log('Result of find: \n', docs)
  } catch (err){
  console.log(err)
  } finally{
    client.close()
  }
}


testWithCallbacks(err => {
if (err){
  console.log(err)
}
testWithAsync();
})



