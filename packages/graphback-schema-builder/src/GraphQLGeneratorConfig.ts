/**
 * Schema and resolver generator config that contains global values
 */
export interface GraphQLGeneratorConfig {
    create?: boolean;
    update?: boolean;
    //tslint:disable-next-line
    delete?: boolean;
    find?: boolean;
    findAll?: boolean;
    subCreate?: boolean;
    subUpdate?: boolean;
    subDelete?: boolean;
    paginate?: boolean;
    disableGen?: boolean;
}
