import { commandRoot } from '../commandRoot'
import { initConfig } from '../helpers/config';
import { ConfigBuilder } from '../config/ConfigBuilder';
import { installDependencies } from '..';
import { createConfig } from '../templates/configTemplates';
import ora = require('ora');
import { logInfo } from '../utils';

type Params = { name?: string, templateName?: string, templateUrl: string }

export const command = 'migrate'

export const desc = 'Migrate data layer based on previous state'


export const builder = {}

export async function handler({ name }: Params) {
  logInfo(`Migrated database `)
}