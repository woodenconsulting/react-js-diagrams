import React from 'react';
import { DefaultNodeWidget } from './defaults/DefaultNodeWidget';
import { DefaultLinkWidget } from './defaults/DefaultLinkWidget';

export class WidgetFactory {
  constructor(name) {
    this.type = name;
  }

  getType() {
    return this.type;
  }
}

export class NodeWidgetFactory extends WidgetFactory {
  generateReactWidget(diagramEngine, node) {
    return <DefaultNodeWidget node={node} diagramEngine={diagramEngine} />;
  }
}

export class LinkWidgetFactory extends WidgetFactory {
  generateReactWidget(diagramEngine, link) {
    return <DefaultLinkWidget link={link} diagramEngine={diagramEngine} />;
  }
}
