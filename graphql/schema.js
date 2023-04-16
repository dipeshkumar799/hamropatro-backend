import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    users(id: String!): [User]
    user(firstName: String!): User!
    upDatemanyData(id: String!): User!
    deleteData(id: String!): User!
    valid(id: String!): User!
  }
  type User {
    firstName: String!
    lastName: String!
    email: String!
    id: String!
    isLoggedIn: Boolean!
  }
  type Mutation {
    signUp(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): User
    update(id: String!, firstName: String!, lastName: String!): User!
    deleteData(id: String!): User!

    login(email: String!, password: String!): User

    logout(id: String!): User
  }
`;

export default typeDefs;
