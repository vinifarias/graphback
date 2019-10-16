export interface SchemaProvider {
  getNewSchemaText(): string;
  getOldSchemaText(): string;
  updateOldSchema(newSchema: string): void;
}
