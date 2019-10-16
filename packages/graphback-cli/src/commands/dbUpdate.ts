import { UpdateDatabaseIfChanges } from 'graphback'
import { ConfigBuilder } from '../config/ConfigBuilder';
import { createDB } from '../helpers'

export const command = 'db:update'

export const desc = 'Update the database schema'

export const builder = {}

export async function handler() {
  const configInstance = new ConfigBuilder();
  const config = configInstance.config;

  const initializationStrategy = new UpdateDatabaseIfChanges({ client: config.db.database, connectionOptions: config.db.dbConfig });
  await createDB(initializationStrategy)
  process.exit(0);
}
