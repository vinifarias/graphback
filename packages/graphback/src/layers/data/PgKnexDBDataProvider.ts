import * as Knex from 'knex';
import { InputModelTypeContext } from '../../input/ContextTypes';
import { getTableName } from '../../utils';
import { KnexDBDataProvider } from './KnexDBDataProvider';
import { NoDataError } from './NoDataError';

/**
 * Knex.js database data provider exposing basic CRUD operations. 
 * 
 * NOTE: This class implements Postgres specific implementaion that provides more performant object creation than generic `KnexDBDataProvider`
 * that works with the rest of the databases.
 */
// tslint:disable-next-line: no-any
export class PgKnexDBDataProvider<Type = any, GraphbackContext = any> extends KnexDBDataProvider<Type, GraphbackContext>{

    constructor(db: Knex) {
        super(db);
    }

    public async create(inputType: InputModelTypeContext,  data: Type): Promise<Type> {
        const name = getTableName(inputType.name)
        const dbResult = await this.db(name).insert(data).returning('*');
        if (dbResult && dbResult[0]) {
            return dbResult[0]
        }
        throw new NoDataError(`Cannot create ${name}`);
    }
}