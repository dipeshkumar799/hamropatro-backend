import { gql } from "apollo-server";
const typeDefs = gql`
  type Message {
    id: ID!
    content: String!
    senderId: ID!
    recipientId: ID!
    createdAt: String!
  }

  type Conversation {
    id: ID!
    participantIds: [ID!]!
    messages: [Message!]!
  }
  type Query {
    users(id: String!): [User]
    user(firstName: String!): User!
    valid(id: String!): User!
    getForexs: [Forex!]!
    conversations(userId: ID!): [Conversation!]!
    goldSilver: [GoldSilver!]
  }

  type User {
    firstName: String!
    lastName: String!
    email: String!
    id: String!
    isLoggedIn: Boolean!
  }
  type Currency {
    unit: Int!
    name: String!
    iso3: String!
  }

  type Forex {
    currency: Currency!
    buy: Float!
    sell: Float!
  }

  type GoldSilver {
    goldHallmarkGram: String!
    goldTejabiGram: String
    silverGram: String!
    goldHallmarkTola: String!
    goldTejabitola: String!
    silvertola: String!
  }

  type Mutation {
    signUp(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): User!
    sendMessage(
      senderId: ID!
      recipientId: ID!
      content: String!
      conversationID: ID!
    ): Message!
    createConversation(participantIds: [ID!]!): Conversation!
    verifyOtp(otp: Int!, email: String!): User!
    update(id: String!, firstName: String!, lastName: String!): User!
    deleteData(id: String!): User!
    login(email: String!, password: String!): User

    forgetPassword(email: String!): String!
    changePassword(
      email: String!
      currentpassword: String!
      newpassword: String!
    ): User!
    logout(id: String!): User
  }
  type Subscription {
    newMessage(recipientId: ID!): Message!
  }
`;

export default typeDefs;
