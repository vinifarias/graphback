import { InputModelTypeContext } from '../../input/ContextTypes';
import { DatabaseContextProvider } from '../migrations/DatabaseContextProvider';

export interface DatabaseInitializationStrategy {
  init(context: DatabaseContextProvider,types: InputModelTypeContext[]): Promise<void>;

}
