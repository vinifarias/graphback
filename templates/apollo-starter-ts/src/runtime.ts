import { gql } from 'apollo-server-core';
import { GraphQLBackendCreator, PgKnexDBDataProvider } from 'graphback';
import { PubSub } from 'graphql-subscriptions';
import { makeExecutableSchema } from 'graphql-tools';
import Knex = require('knex');
import * as jsonConfig from '../graphback.json'

/**
 * Method used to create runtime schema
 * It will be part of of the integration tests
 */
export const createRuntime = async (client: Knex) => {
    const backend = new GraphQLBackendCreator(jsonConfig.folders.model, jsonConfig.graphqlCRUD);
    const dbClientProvider = new PgKnexDBDataProvider(client);
    const pubSub = new PubSub();
    const runtime = await backend.createRuntime(dbClientProvider, pubSub);
    const generatedSchema = runtime.schema;
    const executableSchema = makeExecutableSchema({
        typeDefs: gql`${generatedSchema}`,
        resolvers: runtime.resolvers,
        resolverValidationOptions: {
            requireResolversForResolveType: false
        }
    });
    return executableSchema;
}
