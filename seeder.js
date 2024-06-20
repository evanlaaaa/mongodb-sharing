const { faker } = require('@faker-js/faker')
const useMongoDB = require('./utils/useMongoDb');

async function main() {
  await useMongoDB(async (db) => {
    const authors = [];
    const posts = [];
    const numberOfAuthors = 10;
    const numberOfPosts = 20;

    // Generate authors
    for (let i = 0; i < numberOfAuthors; i++) {
      authors.push({
        name: faker.person.fullName(),
        age: faker.number.int({ min: 18, max: 90 }),
      });
    }

    // Insert authors and get their ids
    const authorCollection = db.collection('author');
    const authorInsertResult = await authorCollection.insertMany(authors);
    const authorIds = authorInsertResult.insertedIds;

    // Generate posts
    for (let i = 0; i < numberOfPosts; i++) {
      const numberOfAuthorsForPost = faker.number.int({ min: 1, max: 3 }); // Each post can have 1 to 3 authors
      const postAuthors = [];

      for (let j = 0; j < numberOfAuthorsForPost; j++) {
        const randomAuthorId = authorIds[Math.floor(Math.random() * numberOfAuthors)];
        postAuthors.push(randomAuthorId);
      }

      posts.push({
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraphs(),
        authors: postAuthors,
      });
    }

    // Insert posts
    const postCollection = db.collection('post');
    await postCollection.insertMany(posts);

    console.log(`Inserted ${numberOfAuthors} authors and ${numberOfPosts} posts`);
  });
}

main()
  .then(() => console.log('Database seeding completed successfully'))
  .catch(console.error);
