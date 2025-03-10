import { InputModelTypeContext } from '../../input/ContextTypes';
import { generateSchemaString } from './schemaTemplate';
import { buildTargetContext, createCustomSchemaContext, TargetContext } from './targetSchemaContext';

/**
 * Schema formatter that provides ability to wrap schema string with language specific code 
 * that can simplify importing and using it within server side code.
 * 
 * @see jsSchemaFormatter
 * @see tsSchemaFormatter
 * 
 */
export interface SchemaFormatter {
    /**
     * Transform schema string to new format. 
     * Can be used to wrap schema into js or typescript import format that can be added to the file
     * 
     * @param schemaString 
     */
    format(schemaString: string): string
}


/**
 * Generate schema string based on the input model.
 * 
 * Schema is generated by passing type `inputContext` array containing information about all 
 * provided types that needs to be included.
 */
export class SchemaGenerator {
    private context: TargetContext
    private inputContext: InputModelTypeContext[]
    private formatter: SchemaFormatter;

    constructor(inputContext: InputModelTypeContext[], formatter?: SchemaFormatter) {
        this.inputContext = inputContext
        this.formatter = formatter;
    }

    /**
     * Generate output schema as string
     */
    public generate() {
        this.context = buildTargetContext(this.inputContext)
        const customContext = createCustomSchemaContext(this.inputContext)
        const schemaString = generateSchemaString(this.context, customContext)
        if (this.formatter) {
            return this.formatter.format(schemaString);
        }

        return schemaString
    }




}