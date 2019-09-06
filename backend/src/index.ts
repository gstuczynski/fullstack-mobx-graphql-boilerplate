import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import { buildSchema, Resolver, Query } from "type-graphql";
import { createConnection } from "typeorm";
import { UserResolver } from "./resolvers/User";

const main = async () => {
  await createConnection();
  const schema = await buildSchema({
    resolvers: [UserResolver]
  });
  const apolloServer = new ApolloServer({ schema });
  const app = Express();
  apolloServer.applyMiddleware({ app });
  app.listen(4001, () => console.log("listening on 4001"));
};
main();
