import * as RJD from '../../src/main';
import { WhiteLinkModel } from './WhiteLinkModel';

export class WhiteLinkInstanceFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('WhiteLinkModel');
  }

  getInstance() {
    return new WhiteLinkModel();
  }
}
