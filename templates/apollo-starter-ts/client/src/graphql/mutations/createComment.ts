import gql from "graphql-tag"
import { CommentFragment } from "../fragments/Comment"

export const createComment = gql`
  mutation createComment(id: ID!, text: String!) {
    createComment(input: {text: $text}) {
      ...CommentFields
    }
  }

  ${CommentFragment}
`
