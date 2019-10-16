import { DatabaseInitializationStrategy } from '../DatabaseInitializationStrategy';
import { DatabaseSchemaManager } from '../../migrations/DataResourcesManager';
import { DatabaseOptions } from '../../DatabaseOptions';
import { DatabaseContextProvider } from '../../migrations/DatabaseContextProvider';
import { InputModelTypeContext } from '../../../input/ContextTypes';

export class DropCreateDatabaseAlways implements DatabaseInitializationStrategy {
  private schemaManager: DatabaseSchemaManager;
  constructor(databaseOptions: DatabaseOptions) {
    this.schemaManager = new DatabaseSchemaManager(databaseOptions.client, databaseOptions.connectionOptions);
  }

  public async init(context: DatabaseContextProvider, types: InputModelTypeContext[]): Promise<void> {
    await this.schemaManager.dropDatabaseSchema();
    await this.schemaManager.createDatabaseResources(context, types);
  }
}
