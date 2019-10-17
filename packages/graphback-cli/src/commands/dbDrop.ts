import { ConfigBuilder } from '../config/ConfigBuilder';
import { dropDBResources } from '../helpers'
import { logInfo } from '../utils';

export const command = 'db:drop'

export const desc = 'Drop the existing database'

export const builder = {}

export async function handler() {
  const configInstance = new ConfigBuilder();

  await dropDBResources(configInstance);

  logInfo(`
Database resources dropped
  `);

  process.exit(0);
}
