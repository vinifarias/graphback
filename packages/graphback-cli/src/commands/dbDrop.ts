import chalk from 'chalk';
import { ConfigBuilder } from '../config/ConfigBuilder';
import { dropDBResources, postCommandMessage } from '../helpers'

export const command = 'db:drop'

export const desc = 'Drop the existing database'

export const builder = {}

export async function handler() {
  const configInstance = new ConfigBuilder();

  await dropDBResources(configInstance);

  postCommandMessage(`
Database resources dropped.

Run ${chalk.cyan(`graphback db`)} to create them again.
  `)

  process.exit(0);
}
