import { LinkModel } from './Common';
import { AbstractInstanceFactory } from './AbstractInstanceFactory';

export class LinkInstanceFactory extends AbstractInstanceFactory {
  constructor() {
    super('LinkModel');
  }
  
  getInstance() {
    return new LinkModel();
  }
}
