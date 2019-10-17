import chalk from 'chalk';
import { CreateDatabaseIfNotExists } from 'graphback'
import { ConfigBuilder } from '../config/ConfigBuilder';
import { createDB, postCommandMessage } from '../helpers'

export const command = 'db'

export const desc = 'Create the database schema if it doesn\'t exist'

export const builder = {}

export async function handler() {
  const configInstance = new ConfigBuilder();
  const config = configInstance.config;

  const initializationStrategy = new CreateDatabaseIfNotExists({ client: config.db.database, connectionOptions: config.db.dbConfig });
  await createDB(initializationStrategy)

  postCommandMessage(`
Database resources created.

Run ${chalk.cyan(`npm run develop`)} to start the server.
  `)

  process.exit(0);
}
