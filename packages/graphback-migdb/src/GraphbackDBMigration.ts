import { createInputContext } from './ContextCreator';
import { OBJECT_TYPE_DEFINITION, Type } from './ContextTypes';
import { DatabaseContextProvider, DefaultDataContextProvider } from './datasource/DatabaseContextProvider';
import { IDataLayerResourcesManager } from './datasource/DataResourcesManager';
import { GraphQLGeneratorConfig } from "./GraphQLGeneratorConfig";
import { logger } from './logger'

/**
 * Migrate database tables and 
 */
export class GraphbackDBMigration {

  private dataLayerManager: IDataLayerResourcesManager;
  private dbContextProvider: DatabaseContextProvider;
  private inputContext: Type[]

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

  public async createDatabase(): Promise<void> {
    const context = this.inputContext.filter((t: Type) => t.kind === OBJECT_TYPE_DEFINITION && t.name !== 'Query' && t.name !== 'Mutation' && t.name !== 'Subscription')
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

/**
 * Represents generated graphql backend
 */
export interface IGraphQLBackend {
  // Human readable schema that should be replaced with current one
  schema?: string,
  // Resolvers that should be mounted to schema`
  resolvers?: IGraphbackResolvers
}

export interface IGraphbackResolvers {
  // Index file for resolvers stitching
  index?: string
  // Resolvers
  types?: OutputResolver[],
  // Custom resolvers stubs
  custom?: OutputResolver[]
}
