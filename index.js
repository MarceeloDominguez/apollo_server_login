import { ApolloServer } from "apollo-server";
import Jwt from "jsonwebtoken";
import typeDefs from "./db/schema.js";
import resolvers from "./db/resolver.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();

connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers["authorization"] || "";
    if (token) {
      try {
        const user = Jwt.verify(
          token.replace("Bearer ", ""),
          process.env.KEY_SECRET
        );
        return { user };
      } catch (error) {
        console.log(error);
      }
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Servidor en la URL ${url}`);
});
