import {  SchemaProvider } from './SchemaProvider';
import { buildSchemaText, removeFiles } from '../../utils';
import { writeFileSync } from 'fs';
import { join } from 'path';

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

  public getNewSchemaText(): string {
    return buildSchemaText(this.newSchemaDir);
  }

  public getOldSchemaText(): string {
    return buildSchemaText(this.oldSchemaDir);
  }

  public async updateOldSchema(newSchema: string) {
    await removeFiles(join(this.oldSchemaDir, '*.graphql'));
    writeFileSync(join(this.oldSchemaDir, 'OldSchema.graphql'), newSchema);
  }
}
