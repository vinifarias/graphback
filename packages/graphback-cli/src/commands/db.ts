import { CreateDatabaseIfNotExists } from 'graphback'
import { ConfigBuilder } from '../config/ConfigBuilder';
import { createDB } from '../helpers'

export const command = 'db'

export const desc = 'Create the database schema if it doesn\'t exist'

export const builder = {}

export async function handler() {
  const configInstance = new ConfigBuilder();
  const config = configInstance.config;

  const initializationStrategy = new CreateDatabaseIfNotExists({ client: config.db.database, connectionOptions: config.db.dbConfig });
  await createDB(initializationStrategy)
  process.exit(0);
}
