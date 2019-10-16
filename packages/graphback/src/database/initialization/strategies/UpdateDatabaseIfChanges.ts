import { DatabaseInitializationStrategy } from '../DatabaseInitializationStrategy';
import { DatabaseSchemaManager } from '../../migrations/DataResourcesManager';
import { DatabaseOptions } from '../../DatabaseOptions';
import { DatabaseContextProvider } from '../../migrations/DatabaseContextProvider';
import { InputModelTypeContext } from '../../../input/ContextTypes';
import { Change } from '@graphql-inspector/core';

export class UpdateDatabaseIfChanges implements DatabaseInitializationStrategy {
  private schemaManager: DatabaseSchemaManager;
  constructor(databaseOptions: DatabaseOptions) {
    this.schemaManager = new DatabaseSchemaManager(databaseOptions.client, databaseOptions.connectionOptions);
  }

  public async init(context: DatabaseContextProvider, types: InputModelTypeContext[], changes: Change[]): Promise<void> {
    await this.schemaManager.createDatabaseResources(context, types);
    await this.schemaManager.updateDatabaseResources(context, types, changes);
    await this.schemaManager.createDatabaseRelations(context, types);
  }
}
