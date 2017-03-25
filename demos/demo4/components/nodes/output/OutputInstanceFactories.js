import * as RJD from '../../../../../src/main';
import { OutputNodeModel } from './OutputNodeModel';

export class OutputNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('OutputNodeModel');
  }

  getInstance() {
    return new OutputNodeModel();
  }
}
