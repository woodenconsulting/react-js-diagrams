import * as RJD from '../../../../../src/main';
import { ConnectionNodeWidgetFactory } from './ConnectionNodeWidget';

export class ConnectionWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('connection');
  }

  generateReactWidget(diagramEngine, node) {
    return ConnectionNodeWidgetFactory({ node });
  }
}
