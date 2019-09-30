import gql from "graphql-tag"
import { NoteFragment } from "../fragments/Note"

export const createNote = gql`
  mutation createNote(id: ID!, title: String!, description: String!) {
    createNote(input: {title: $title, description: $description}) {
      ...NoteFields
    }
  }

  ${NoteFragment}
`
