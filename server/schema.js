const graphql = require('graphql');
const axios = require('axios');

const {  
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList  
} = graphql

const UserType = new GraphQLObjectType({
  name: 'User',
  fields:()=>( {
    id: {type: GraphQLString},
    userName: {type: GraphQLString},
    age:{type: GraphQLString}
  })
});

const ArticleType = new GraphQLObjectType({
  name: 'Article',
  fields:()=>( {
    id: {type: GraphQLString},
    artist: {type: GraphQLString},
    track: {type: GraphQLString},
    album: {type: GraphQLString},
    content: {type: new GraphQLList(GraphQLString)},
    img: {type: GraphQLString},
    tags: {type: new GraphQLList(GraphQLString)}
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3001/users/${args.id}`)
        .then(res => res.data);
      }
    },
    users: {
      type: new GraphQLList(UserType),
       resolve(parentValue, args) {
        return axios.get(`http://localhost:3001/users/`)
        .then(res => res.data);
      }
    },
    article: {
      type: ArticleType,
      args: { id: { type: GraphQLString }},
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3001/articles/${args.id}`)
        .then(res => res.data);
      }
    },
    articles: {
      type: new GraphQLList(ArticleType),      
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3001/articles/`)
        .then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});