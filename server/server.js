const Koa = require('koa');
const mount = require('koa-mount');
const graphqlHTTP = require('koa-graphql');
const schema = require('./schema');
const cors = require('@koa/cors');

const server = new Koa();
const port = process.env.PORT || 4000;

// server.use(async ctx => {
//   ctx.body = 'Hello World';
// });
server.use(cors());
server.use(mount('/', graphqlHTTP({
  schema: schema,
  graphiql: true
})));

server.listen(port, () => { console.log(`Server listening on port: ${port}`) });