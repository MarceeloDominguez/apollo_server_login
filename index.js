import { ApolloServer } from "apollo-server";
import typeDefs from "./db/schema.js";
import resolvers from "./db/resolver.js";
import { connectDB } from "./config/db.js";

connectDB();

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Servidor en la URL ${url}`);
});
