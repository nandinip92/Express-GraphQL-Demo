// import express from "express";
// import { graphqlHTTP} from "express-graphql";
// import { buildSchema } from "graphql";

// const app = express();

const express = require("express"); //Standard way to import Express in CommonJS syntax (require).
const { graphqlHTTP } = require("express-graphql"); //graphqlHTTP is the middleware function provided by express-graphql.
const { buildSchema } = require("graphql"); //buildSchema is the simplest way to define a GraphQL schema using Schema Definition Language (SDL) as a string.

//Defining the GraphQL Schema

const schema = buildSchema(`
    type User {
    id: ID!
    name: String!
    email: String!
  }
  
  type Query {
    hello: String
    user(id: ID!): User
  }
  
  type Mutation {
    createUser(name: String!, email: String!): User
  }

  `);

// In GraphQL, the `root` object is a collection of resolvers.
// Each field in your schema (`Query` or `Mutation`) needs a resolver function that tells GraphQL how to fetch or manipulate the data.

// The `root` maps schema fields (hello, user, createUser) to JavaScript functions.
const root = {
  // ------------------------------
  // Query: hello
  // ------------------------------
  // This resolver does not need arguments.
  // It simply returns a static string when the "hello" field is queried.
  hello: () => "Hello World....!!!",

  // ------------------------------
  // Query: user
  // ------------------------------
  // This resolver expects an argument: id.
  // It searches the `users` array and returns the user whose `id` matches.
  user: ({ id }) => users.find((user) => user.id === id),

  // ------------------------------
  // Mutation: createUser
  // ------------------------------
  // This resolver is called when the mutation "createUser" is executed.
  // It accepts `name` and `email` as arguments from the GraphQL query.
  // Create a new user object:
  // 1. Generate an `id` = total number of users + 1 (converted to string, since GraphQL ID is string-like).
  // 2. Assign `name` and `email` from the arguments.
  // Push the new user into the in-memory `users` array.
  // Return the newly created user object.
  createUser: ({ name, email }) => {
    const newUser = { id: String(users.length + 1), name, email };
    users.push(newUser);
    return newUser;
  },
};

// In-memory data storage for users
//They’re just there as sample/mock data so you can test queries and mutations without needing a database yet.
let users = [
  { id: "1", name: "Alice", email: "alice@example.com" },
  { id: "2", name: "Bob", email: "bob@example.com" },
];

//Set up Express server

//Creates an Express application instance.
//`express()` gives you an object (`app`) with methods to define routes, middleware, and start the server.
const app = express();

//This mounts middleware at the /graphql endpoint.
// So whenever a client sends a request to http://localhost:4000/graphql, it will be handled by what you pass inside `app.use`.
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root, // Root object with resolvers
    graphiql: true, // Enable GraphiQL interface
  })
);

//Starts your Express server and makes it listen for incoming requests.
app.listen(4000, () =>
  console.log("Server running at http://localhost:4000/graphql")
);
