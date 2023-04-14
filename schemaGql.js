import { gql } from "apollo-server-express";
const typeDefs = gql`
  type Query {
    users: [User]
    user(_id: ID!): User
    quotes: [Quote]
    quote(by: ID!): [Quote]
    myprofile: User
  }

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    quotes: [Quote]
  }

  type Quote {
    name: String!
    by: ID!
    creator: User
  }
  type Token {
    token: String!
  }

  type Mutation {
    signupUser(userNew: UserInput!): User
    signInUser(userSignIn: UserSingInInput!): Token
    updateUser(userUpdate: UpdateUserInput!): User
    createQuote(name: String!): String
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  input UserSingInInput {
    email: String!
    password: String!
  }

  input UpdateUserInput {
    firstName: String
    lastName: String
    email: String!
    password: String
  }
`;

export default typeDefs;
