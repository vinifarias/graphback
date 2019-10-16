import { DropCreateDatabaseAlways } from 'graphback'
import { ConfigBuilder } from '../config/ConfigBuilder';
import { createDB } from '../helpers'

export const command = 'db:recreate'

export const desc = 'Drop and recreate the database schema'

export const builder = {}

export async function handler() {
  const configInstance = new ConfigBuilder();
  const config = configInstance.config;

  const initializationStrategy = new DropCreateDatabaseAlways({ client: config.db.database, connectionOptions: config.db.dbConfig });
  await createDB(initializationStrategy)
  process.exit(0);
}
