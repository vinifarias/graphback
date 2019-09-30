
import { logInfo } from '../utils';

type Params = { name?: string, templateName?: string, templateUrl: string }

export const command = 'saveState'

export const desc = 'Update knowledge base of the current categories'


export const builder = {}

export async function handler({ name }: Params) {
    logInfo(`Metadata refreshed `)
}