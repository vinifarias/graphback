import { commandRoot } from '../commandRoot'
import { initConfig } from '../helpers/config';
import { installDependencies } from '../helpers';
import { createConfig } from '../templates/configTemplates';
import ora = require('ora');
import execa = require('execa');
import { logInfo } from '../utils';

type Params = { name?: string, templateName?: string, templateUrl: string }

export const command = 'service'

export const desc = 'Add service'


export const builder = {}

export async function handler({ name }: Params) {
  logInfo(`Service catalog refreshed `)
}