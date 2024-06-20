const useMongoDB = require('./utils/useMongoDb');

const searchKeyword = 'Libero';
const toPaginate = false;
const perPage = 5;
const page = 1;

async function listPostsWithAuthors(keyword = "") {
  await useMongoDB(async (db) => {
    const postCollection = db.collection('post');

    // Define the aggregation pipeline
    const pipeline = [
      {
        $lookup: {
          from: 'author',
          localField: 'authors',
          foreignField: '_id',
          as: 'authorDetails',
        },
      },
      {
        $project: {
          title: 1,
          content: 1,
          authors: '$authorDetails'
        },
      },
    ];

    if (keyword) {
      const regex = new RegExp(keyword, 'i');
      pipeline.push({
        $match: {
          $or: [
            { title: { $regex: regex } },
            { content: { $regex: regex } },
            { 'authors.name': { $regex: regex } }
          ]
        }
      });
    }

    if (toPaginate) {
      pipeline.push(
        { $skip: (page - 1) * perPage },
        { $limit: perPage }
      );
    }

    // stringify the result for viewing the actual detail of author instead of showing literal [Object]
    const posts = JSON.stringify(await postCollection.aggregate(pipeline).toArray(), null, 2);

    console.log('Posts with Authors:', posts);
  });
}

listPostsWithAuthors(searchKeyword)
  .then(() => console.log('Listed posts successfully'))
  .catch(console.error);