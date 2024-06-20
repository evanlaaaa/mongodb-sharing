const useMongoDB = require('./utils/useMongoDb');

async function create() {
  useMongoDB(async db => {
    await db.createCollection('author');
    await db.createCollection('post');
  });
}

create()
  .then(() => console.log('Create collections successfully'))
  .catch(console.error);