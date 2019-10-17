import chalk from 'chalk';
import { DropCreateDatabaseAlways } from 'graphback'
import { ConfigBuilder } from '../config/ConfigBuilder';
import { createDB, postCommandMessage } from '../helpers'

export const command = 'db:recreate'

export const desc = 'Drop and recreate the database schema'

export const builder = {}

export async function handler() {
  const configInstance = new ConfigBuilder();
  const config = configInstance.config;

  const initializationStrategy = new DropCreateDatabaseAlways({ client: config.db.database, connectionOptions: config.db.dbConfig });
  await createDB(initializationStrategy)

  postCommandMessage(`
Database resources recreated.

Run ${chalk.cyan(`npm run develop`)} to start the server.
  `)

  process.exit(0);
}
