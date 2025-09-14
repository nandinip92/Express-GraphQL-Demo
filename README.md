# `express-graphql` Demo

This Repo is to setup a simple GraphQL server set up a simple GraphQL server using Node.js, Express, and the express-graphql library.

### Step - 1 Project Setup

Following are the steps I used to create a Node.js project

```script
mkdir express-graphql-demo
cd express-graphql-demo
npm init -y
```

- `npm init` sets up a new **Node.js project** in the current directory.

- It creates a `package.json` file, which stores information about your project, such as:

  - Project name

  - Version

  - Dependencies

  - Scripts

- Normally, `npm init` asks you for details like project name, version, author, etc.
- `-y` (or `--yes`) automatically answers “yes” to all prompts.It just creates a package.json with default values.

### Step-2 Installing Dependencies

```script
npm install express graphql express-graphql
```

### Step-3 Create GraphQL API

look at [`server.js`](/server.js)

### Step-4 To Run the server

```script
Express-GraphQL-Demo> node server.js
```

**(or)** If you want to run with `npm start`, make sure your package.json has:

```json
"scripts": {
  "start": "node server.js"
}
```

### Step-5 Check the Server

Server will run at http://localhost:4000/graphql
It will take you to GraphiQL.an in-browser playground.

**👉Click the link to check how [GraphiQL Browser](/Images/GraphiQL.png)**

## Running Queries and Mutations in GraphiQL

### 1. Example for Query:

```graphql
{
  hello
}
```

![Hello Output](/Images/HelloOpt.png)

```graphql
{
  user(id: "1") {
    id
    name
    email
  }
}
```

![User1 Output](/Images/User1Output.png)

---

### 2. Example for Mutation:

```graphql
mutation {
  createUser(name: "Charlie", email: "charlie@example.com") {
    id
    name
    email
  }
}
```

![MutationOutput image](/Images/MutationOutput.png)

---

### 3. Running two seperate queries at the same time

If you want to run completely separate queries in one request, you must use aliases:

```graphql
query {
  firstUser: user(id: "1") {
    id
    name
  }
  secondUser: user(id: "2") {
    id
    name
  }
}
```

**_Explanation:_**

- firstUser and secondUser are aliases.

- Both call the same user query, but GraphQL treats them as distinct fields in the response.

![TwoSeperateQueries](/Images/TwoSeperateQueries.png)

---

### 4. Multiple Operations in One File

You can also define multiple named operations, but GraphiQL will execute **only one at a time** unless you select which operation to run:

```graphql
query getFirstUser {
  user(id: "1") {
    id
    name
  }
}

query getSecondUser {
  user(id: "2") {
    id
    name
  }
}
```

![Multipule Operations](/Images/MultipleOperations.png)

**In GraphiQL, a dropdown lets you choose which query to run.**

![Select options](/Images/selectOption.png)

---

## Can I write both Query and Mutation in a GraphQl

### 1️⃣ Separate operations

GraphQL treats queries and mutations as separate operations, so you can’t mix them directly in a single unnamed operation block.

**Correct way — separate named operations:**

```graphql
# Query operation
query getUser {
  user(id: "1") {
    id
    name
    email
  }
}

# Mutation operation
mutation addUser {
  createUser(name: "Charlie", email: "charlie@example.com") {
    id
    name
    email
  }
}
```

**In GraphiQL, a dropdown appears to choose which operation to run (getUser or addUser).**

### 2️⃣ Single request combining query and mutation

If you want to run both in one request, you can wrap the query inside a mutation because GraphQL allows fields of type Query to be called inside mutation operations if your schema supports it, or you can use aliases to distinguish.

**Example using aliases in a mutation block:**

```graphql
mutation {
  newUser: createUser(name: "Charlie", email: "charlie@example.com") {
    id
    name
  }
  secondUser: createUser(name: "Diana", email: "diana@example.com") {
    id
    name
  }
}
```

**Resources Link:**

https://medium.com/@ravipatel.it/a-beginners-guide-to-graphql-understanding-the-basics-with-an-example-4c40d84c320a
