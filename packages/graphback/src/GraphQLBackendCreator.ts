import { PubSub } from 'graphql-subscriptions';
import { Client, ClientGenerator } from './generators/client';
import { LayeredRuntimeResolverGenerator, LegacyResolverGenerator } from './generators/resolvers';
import { RuntimeResolversDefinition } from './generators/resolvers/layered/RuntimeResolversDefinition';
import { SchemaGenerator, tsSchemaFormatter } from './generators/schema';
import { GraphQLGeneratorConfig } from "./GraphQLGeneratorConfig";
import { IGraphQLBackend } from './IGraphQLBackend'
import { createInputContext } from './input/ContextCreator';
import { InputModelTypeContext, OBJECT_TYPE_DEFINITION } from './input/ContextTypes';
import { GraphbackDataProvider } from './layers/data/GraphbackDataProvider';
import { DefaultCRUDService } from './layers/service/DefaultCRUDService';
import { DatabaseContextProvider, DefaultDataContextProvider } from './migrations/DatabaseContextProvider';
import { IDataLayerResourcesManager } from './migrations/DataResourcesManager';
import { logger } from './utils/logger'

/**
 * GraphQLBackend
 *
 * Automatically generate your database structure resolvers and queries from graphql types.
 * See README for examples
 */
export class GraphQLBackendCreator {

  private dataLayerManager: IDataLayerResourcesManager;
  private dbContextProvider: DatabaseContextProvider;
  private inputContext: InputModelTypeContext[]

  /**
   * @param graphQLSchema string containing graphql types
   * @param config configuration for backend generator
   */
  constructor(graphQLSchema: string, config: GraphQLGeneratorConfig) {
    this.inputContext = createInputContext(graphQLSchema, config)
    this.dbContextProvider = new DefaultDataContextProvider();
  }

  /**
   * Register new data resources manager responsible for creating database layer
   * For example in schema based databases manager will create/update underlying schema.
   */
  public registerDataResourcesManager(manager: IDataLayerResourcesManager) {
    this.dataLayerManager = manager;
  }

  /**
   * Set resolver operations that will be generated
   *
   * @param types - array of resolver operations that should be supported
   */
  public setDatabaseContext(provider: DatabaseContextProvider) {
    this.dbContextProvider = provider;
  }

  /**
   * Create backend with all related resources
   */
  public async createBackend(database: string): Promise<IGraphQLBackend> {
    const backend: IGraphQLBackend = {};

    const schemaGenerator = new SchemaGenerator(this.inputContext, tsSchemaFormatter)
    backend.schema = schemaGenerator.generate()

    const resolverGenerator = new LegacyResolverGenerator(this.inputContext)
    backend.resolvers = resolverGenerator.generate(database)

    return backend;
  }

  /**
   * Create runtime for backend in form of the schema string and resolve functions
   */
  public async createRuntime(db: GraphbackDataProvider, pubSub: PubSub): Promise<RuntimeResolversDefinition> {
    const backend: RuntimeResolversDefinition = {
      schema: "",
      resolvers: {}
    };

    const schemaGenerator = new SchemaGenerator(this.inputContext)
    backend.schema = schemaGenerator.generate()
    const defaultProvider = new DefaultCRUDService(db, pubSub);
    const resolverGenerator = new LayeredRuntimeResolverGenerator(this.inputContext, defaultProvider)
    backend.resolvers = resolverGenerator.generate()

    return backend;
  }

  public async createClient(): Promise<Client> {
    const clientGenerator = new ClientGenerator(this.inputContext)

    return clientGenerator.generate()
  }


  public async createDatabase(): Promise<void> {
    const context = this.inputContext.filter((t: InputModelTypeContext) => t.kind === OBJECT_TYPE_DEFINITION && t.name !== 'Query' && t.name !== 'Mutation' && t.name !== 'Subscription')
    try {
      if (this.dataLayerManager) {
        logger.info("Creating database structure")
        await this.dataLayerManager.createDatabaseResources(this.dbContextProvider, context);
        await this.dataLayerManager.createDatabaseRelations(this.dbContextProvider, context);
      } else {
        logger.info("Database structure generation skipped.")
      }
    } catch (error) {
      // logger.error(`Error on Database creation ${error}`)
      throw error
    }

  }
}

