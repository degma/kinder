const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth');

const app = express();

const PORT = process.env.PORT;
const uri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}`+
'cluster0-shard-00-00-wri1l.gcp.mongodb.net:27017,'+
'cluster0-shard-00-01-wri1l.gcp.mongodb.net:27017,'+
'cluster0-shard-00-02-wri1l.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth);

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

// console.log (
//   `mongodb+srv://${process.env.MONGO_USER}:${
//     process.env.MONGO_PASSWORD
//   }@${process.env.MONGO_SERVER}/${process.env.MONGO_DB}?retryWrites=true`
// );
mongoose
/*   .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@${process.env.MONGO_SERVER}/${process.env.MONGO_DB}?retryWrites=true`
  ) */
  //.connect('mongodb://localhost:27017/kinderDB', {useNewUrlParser: true})
  .connect(uri, { useNewUrlParser: true } )
  .then(() => {
    app.listen(PORT);
    console.log(`Listening to port ${PORT}`);
    console.log("mongoDB connected OK!");
  })
  .catch(err => {
    console.log(err);
  });
