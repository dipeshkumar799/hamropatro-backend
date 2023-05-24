import { gql } from "apollo-server";
const typeDefs = gql`
  scalar Upload
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
  enum Status {
    PENDING
    COMPLETED
  }

  enum ColorPalette {
    RED
    GREEN
    BLUE
  }

  type Attachment {
    id: ID!
    url: String!
  }
  type Note {
    id: ID!
    title: String!
    content: String!
    timestamp: Float!
    status: String!
    colorPalatte: String!
  }

  type Message {
    _id: ID!
  }

  type Conversation {
    _id: ID!
    participants: [ID!]!
    messages: [Message]
  }
  type ConversionResult {
    year: Int!
    month: Int!
    day: Int!
  }
  type Query {
    users(id: String!): [User]
    user(firstName: String!): User!
    valid(id: String!): User!
    getForexs: [Forex!]!
    conversations(userId: ID!): [Conversation!]!
    goldSilver: [GoldSilver!]
    convertToBS(year: Int!, month: Int!, day: Int!): ConversionResult!
    convertToAD(year: Int!, month: Int!, day: Int!): ConversionResult!
    notes: [Note!]!
    note(_id: ID!): Note!
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
      senderId: String!
      recipientId: ID!
      content: String!
      conversationId: ID!
    ): Message!
    createConversation(participantIds: [ID!]!): Conversation!
    createNote(
      title: String!
      content: String!
      status: String!
      colorPalatte: String!
    ): Note
    uploadFiles(files: [Upload!]!): [File!]!
    updateNote(_id: ID!, title: String!, content: String!): Note!
    deleteNote(_id: ID!): ID!
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
