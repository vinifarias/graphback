import { writeFileSync } from 'fs';
import { join } from 'path';
import { buildSchemaText, removeFiles } from '../../../utils';
import {  SchemaProvider } from './SchemaProvider';

/**
 * Provides old and new schema from a local context
 *
 * @export
 * @class InputModelProvider
 * @extends {SchemaProvider}
 */
export class InputModelProvider implements SchemaProvider {
  private oldSchemaDir: string;
  private newSchemaDir: string;
  constructor(oldSchemaDir: string, newSchemaDir: string) {
    this.oldSchemaDir = oldSchemaDir;
    this.newSchemaDir = newSchemaDir;
  }

  public getCurrentSchemaText(): string {
    return buildSchemaText(this.newSchemaDir);
  }

  public getPreviousSchemaText(): string {
    return buildSchemaText(this.oldSchemaDir);
  }

  public async updateOldSchema(newSchema: string) {
    await removeFiles(join(this.oldSchemaDir, '*.graphql'));
    writeFileSync(join(this.oldSchemaDir, 'Previous.graphql'), newSchema);
  }
}
