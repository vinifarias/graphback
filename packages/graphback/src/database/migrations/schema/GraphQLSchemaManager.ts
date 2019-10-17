import { Change, diff } from '@graphql-inspector/core';
import { buildSchema } from 'graphql';
import { SchemaProvider } from './SchemaProvider';

export interface SchemaManagerOptions {
  provider: SchemaProvider
}

/**
 * Manages GraphQL schemas
 *
 * @export
 * @class GraphQLSchemaManager
 */
export class GraphQLSchemaManager {
  public provider: SchemaProvider;
  private oldSchemaText: string;
  private newSchemaText: string;
  constructor(options: SchemaManagerOptions) {
    this.provider = options.provider;
    this.oldSchemaText = this.provider.getPreviousSchemaText();
    this.newSchemaText = this.provider.getCurrentSchemaText();
  }

  /**
   *
   *
   * @returns {Change[]}
   * @memberof GraphQLSchemaManager
   */
  public getChanges(): Change[] {
    let changes: Change[] = [];

    if (!this.oldSchemaText || !this.oldSchemaText.length) {
      return changes;
    }

    const oldSchema = buildSchema(this.oldSchemaText);
    const newSchema = buildSchema(this.newSchemaText);

    if (oldSchema && newSchema) {
      changes = diff(oldSchema, newSchema);
    }

    return changes;
  }

  public updateOldSchema() {
    this.provider.updateOldSchema(this.newSchemaText);
  }
}
