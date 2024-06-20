const { MongoClient } = require('mongodb');
const { USERNAME, PASSWORD, HOST, PORT } = require('./constant');

async function useMongoDB(callback) {
  const uri = `mongodb://${USERNAME}:${PASSWORD}@${HOST}:${PORT}`;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('learn-mongodb');
    await callback(db);
  } catch (err) {
    console.error('An error occurred while using MongoDB:', err);
  } finally {
    await client.close();
  }
}

module.exports = useMongoDB;