import React from 'react';
import { NodeWidgetFactory } from '../WidgetFactories';
import { DefaultNodeWidget } from './DefaultNodeWidget';

export class DefaultNodeFactory extends NodeWidgetFactory {
  constructor() {
    super('default');
  }

  generateReactWidget(diagramEngine, node) {
    return (
      <DefaultNodeWidget node={node} diagramEngine={diagramEngine} />
    );
  }
}
