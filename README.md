# mongodb-sharing

### Run locally
```bash
$ git https://github.com/evanlaaaa/mongodb-sharing.git
$ cd mongodb
$ npm i
```

### Configure MongoDb
Head to `/utils/constant.js` and modify according to your enviornment
```js
const USERNAME = 'admin';
const PASSWORD = '1234';
const HOST = 'localhost';
const PORT = '27017';
```


### Create pre-defined collection
```bash
$ node create.js
```

### Seed Database
```bash
$ node seeder.js
```

### Query Data
```bash
$ node query.js
```

You can also play around with the conditional query
```js
const searchKeyword = 'keyword'; // empty string will not perform search
const toPaginate = false;
const perPage = 5;
const page = 1;
```

## Vscode extension
If you are working with VScode, I recommend you an extension to work with MongoDB

https://www.mongodb.com/products/tools/vs-code