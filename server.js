import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import jwt from "jsonwebtoken";
import typeDefs from "./schemaGql.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import path from "path";
const __dirname = path.resolve();

const port = process.env.PORT || 4000;
const app = express();
const httpServer = http.createServer(app);

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connected."));

mongoose.connection.on("connected", () => {
  console.log("connected to mongodb.");
});
mongoose.connection.on("error", (err) => {
  console.log("error connecting ", err);
});

//import model here to get away from unwanted errors.
import "./models/User.js";
import "./models/Quotes.js";
import resolvers from "./resolvers.js";

//this is middleware
const context = ({ req }) => {
  const { authorization } = req.headers;
  if (authorization) {
    const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);
    return { userId };
  }
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  csrfPrevention: true,
  cache: "bounded",
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    // ApolloServerPluginLandingPageGraphQLPlayground(),//run direct playground
    ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
});

//access react application from node server.
// if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
// }

await server.start();
server.applyMiddleware({ app, path: "/graphql" });
httpServer.listen({ port }, () => {
  console.log(`🚀  Server ready at ${port}  ${server.graphqlPath}`);
});
// server.listen().then(({ url }) => {
//   console.log(`🚀  Server ready at ${url}`);
// });

//npm i graphql@15.7.2 apollo-server@3.5.0 apollo-server-core@3.5.0
