import { ApolloServer } from "apollo-server";

import typeDefs from "./graphql/schema.js";
import resolvers from "./graphql/resolver.js";
import { PubSub } from "graphql-subscriptions";
const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, connection }) => {
    if (connection) {
      return { pubsub };
    }
  },
  subscriptions: {
    onConnect: (connectionParams, webSocket, context) => {
      console.log("Client connected");
    },
    onDisconnect: (webSocket, context) => {
      console.log("Client disconnected");
    },
  },
});
server.listen().then(({ url }) => {
  console.log(`server is running on port at:${url}`);
});
