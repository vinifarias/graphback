import gql from 'graphql-tag'

export const typeDefs = gql`
  

  type Note {
    id: ID!
    title: String!
    description: String!
    comments: [Comment!]
  }

  type Comment {
    id: ID!
    text: String!
    note: Note!
  }

  type Test {
    id: ID
    name: String
  }

  input NoteInput {
    title: String!
    description: String!
  }

  input CommentInput {
    text: String!
    noteId: ID!
  }

  input TestInput {
    name: String
  }

  input NoteFilter {
    id: ID
    title: String
    description: String
  }

  input CommentFilter {
    id: ID
    text: String
    noteId: ID
  }

  input TestFilter {
    id: ID
    name: String
  }

  type Query {
    findNotes(fields: NoteFilter!): [Note!]!
    findComments(fields: CommentFilter!): [Comment!]!
    findTests(fields: TestFilter!): [Test!]!
    findAllNotes: [Note!]!
    findAllComments: [Comment!]!
    findAllTests: [Test!]!
  }

  type Mutation {
    createNote(input: NoteInput!): Note!
    createComment(input: CommentInput!): Comment!
    createTest(input: TestInput!): Test!
    updateNote(id: ID!, input: NoteInput!): Note!
    updateTest(id: ID!, input: TestInput!): Test!
  }
`
