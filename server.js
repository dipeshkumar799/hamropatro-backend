import { ApolloServer, gql } from "apollo-server";
import typeDefs from "./graphql/schema.js";

import resolvers from "./graphql/resolver.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
server.listen().then(({ url }) => {
  console.log(`server is running on port at:${url}`);
});
