import { Change } from '@graphql-inspector/core';
import { InputModelTypeContext } from '../../input/ContextTypes';
import { DatabaseContextProvider } from '../migrations/DatabaseContextProvider';

export enum DatabaseInitializationStrategyOptions {
  DropCreateAlways = 'DropCreateDatabaseAlways',
  UpdateIfChanges = 'UpdateDatabaseIfChanges',
}

export interface DatabaseInitializationStrategy {
  init(context: DatabaseContextProvider,types: InputModelTypeContext[], changes: Change[]): Promise<void>;
}
