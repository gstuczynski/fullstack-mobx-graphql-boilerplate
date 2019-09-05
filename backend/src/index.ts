import "reflect-metadata";
import { GraphQLServer } from "graphql-yoga";
// ... or using `require()`
// const { GraphQLServer } = require('graphql-yoga')
import { importSchema } from "graphql-import";
import { makeExecutableSchema } from "graphql-tools";
import { resolvers } from "./resolvers";
import { createConnection } from "typeorm";

const typeDefs = importSchema("src/schema.graphql");

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new GraphQLServer({ typeDefs, resolvers });

createConnection().then(() => {
  server.start(() => console.log("Server is running on localhost:4000"));
});
