export interface SchemaProvider {
  getCurrentSchemaText(): string;
  getPreviousSchemaText(): string;
  updateOldSchema(newSchema: string): void;
}
