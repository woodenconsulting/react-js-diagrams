import * as RJD from '../../../../../src/main';
import { InputNodeModel } from './InputNodeModel';

export class InputNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('InputNodeModel');
  }

  getInstance() {
    return new InputNodeModel();
  }
}
