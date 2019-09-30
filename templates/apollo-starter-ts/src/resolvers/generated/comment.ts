import { GraphQLContext } from '../../context'

export const commentResolvers = {
  Comment: {
    note: async (parent: any, _: any, context: GraphQLContext) => {
      const result = await context.db.select().from('note').where('id', '=', parent.noteId)
      return result[0]
    }
  },

  Query: {
    findComments: (_: any, args: any, context: GraphQLContext) => {
      return context.db.select().from('comment').where(args.fields)
    },
    findAllComments: (_: any, __: any, context: GraphQLContext) => {
      return context.db.select().from('comment')
    }
  },

  Mutation: {
    createComment: async (_: any, args: any, context: GraphQLContext) => {
      const [ id ] = await context.db('comment').insert(args.input).returning('id')
      const result = await context.db.select().from('comment').where('id', '=', id)
      return result[0]
    }
  }
}
