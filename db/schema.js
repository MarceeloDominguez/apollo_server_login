import { gql } from "apollo-server";

const typeDefs = gql`
  type User {
    name: String
    email: String
  }

  type Query {
    currentUser: User
  }

  input RegisterInput {
    name: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Token {
    token: String
  }

  type Mutation {
    createUser(input: RegisterInput): String
    authenticateUser(input: LoginInput): Token
  }
`;

export default typeDefs;
