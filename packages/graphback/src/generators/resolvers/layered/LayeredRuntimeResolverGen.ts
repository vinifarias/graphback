import { getFieldName, getTableName, ResolverType } from '../../..'
import { Type } from '../../../input/ContextTypes'
import { GraphbackCRUDService } from '../../../layers/service/GraphbackCRUDService'

interface CRUDType {
  table: string,
  resolvers: Resolver[],
}

interface Resolver {
  type: ResolverType,
  name: string,
}

export function generateCRUDType(types: Type[]): CRUDType[] {
  const cruds: CRUDType[] = [];
  for (const element of types) {
    if (element.config.disableGen) {
      continue;
    }

    const table = getTableName(element.name);

    const crud: CRUDType = {
      table, resolvers: []
    }

    const pushResolver = (type: ResolverType) => {
      const name = getFieldName(element.name, type)
      crud.resolvers.push({type,name})
    }
    
    if (element.config.create) {
      pushResolver(ResolverType.CREATE)
    }
    if (element.config.update) {
      pushResolver(ResolverType.UPDATE)
    }
    if (element.config.delete) {
      pushResolver(ResolverType.DELETE)
    }
    if (element.config.findAll) {
      pushResolver(ResolverType.FIND_ALL)
    }
    if (element.config.find) {
      pushResolver(ResolverType.FIND)
    }
    // TODO subscriptions
    // TODO relationships
  }

  return cruds;
}

/**
 * Generate runtime resolver layer using Apollo GraphQL format 
 * and injected service layer. Service layer offers various capabilities like monitoring, cache etc. 
 * so resolver logic can be kept simple and interchangable.
 * 
 * Resolvers are formatted using graphql-tools format
 * 
 * ```javascript
 * const resolvers = {
 *    Query: {...}
 *    Mutation: {...}
 *    Subscription: {...}
 * }
 * ```
 * 
 */
export class ServicesRuntimeResolverGenerator {
  private cruds: CRUDType[]
  private service: GraphbackCRUDService

  constructor(cruds: CRUDType[], service: GraphbackCRUDService) {
    this.cruds = cruds
    this.service = service;
  }

  public generate() {
    const resolvers = {
      Query: {},
      Mutation: {}
    };
    for (const crud of this.cruds) {

      for(const resolver of crud.resolvers) {
        switch (resolver.type) {
          case ResolverType.CREATE: {
            resolvers.Mutation[resolver.name] = (_: any, args: any, context: any) => {
              return this.service.createObject(crud.table, args, context)
            }
            break;
          }
          case ResolverType.UPDATE : {
            resolvers.Mutation[resolver.name] = (_: any, args: any, context: any) => {
              return this.service.updateObject(crud.table, args.id, args.input, context)
            }
            break;
          }
          case ResolverType.DELETE : {
            resolvers.Mutation[resolver.name] = (_: any, args: any, context: any) => {
              return this.service.deleteObject(crud.table, args.id, context)
            }
            break;
          }
          case ResolverType.FIND_ALL : {
            resolvers.Query[resolver.name] = (_: any, args: any, context: any) => {
              return this.service.findAll(crud.table, context)
            }
            break;
          }
          case ResolverType.FIND : {
            resolvers.Query[resolver.name] = (_: any, args: any, context: any) => {
              return this.service.findBy(crud.table, args.filter, context)
            }
            break;
          }
          default: {
            throw new Error(`unhandled type ${resolver.type}`);
          }
        }
      }

      // TODO subscriptions
      // TODO relationships
    }

    return resolvers;
  }
}