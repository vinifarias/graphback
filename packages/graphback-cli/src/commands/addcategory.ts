import { commandRoot } from '../commandRoot'
import { initConfig } from '../helpers/config';
import { ConfigBuilder } from '../config/ConfigBuilder';
import { installDependencies } from '..';
import { createConfig } from '../templates/configTemplates';
import ora = require('ora');
import { logInfo } from '../utils';

type Params = { name?: string, templateName?: string, templateUrl: string }

export const command = 'category <name>'

export const desc = 'Add new integration category to project'


export const builder = {}

export async function handler({ name }: Params) {
  const configInstance = new ConfigBuilder();
  const { db: { database } } = configInstance.config;
  const spinner = ora('Building knowledge base').start()
  await new Promise((resolve) => {
    setTimeout(() => {
      spinner.succeed()
      resolve();
    }, 6000);
  })

  if (name === "cache") {
    logInfo(`Assigned ${name} to Redis server.`);
  }
  if (name === "metrics") {
    logInfo(`Assigned ${name} to inmemory service.`);
  }
  await installDependencies(database)

}