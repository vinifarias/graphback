import gql from "graphql-tag"
import { CommentFragment } from "../fragments/Comment"

export const findComment = gql`
  query findComment(id: ID!, text: String!) {
    findComment(fields: {id: $id, text: $text}) {
      ...CommentFields
    }
  }

  ${CommentFragment}
`
