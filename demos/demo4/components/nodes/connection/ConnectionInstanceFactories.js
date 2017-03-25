import * as RJD from '../../../../../src/main';
import { ConnectionNodeModel } from './ConnectionNodeModel';

export class ConnectionNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('ConnectionNodeModel');
  }

  getInstance() {
    return new ConnectionNodeModel();
  }
}
