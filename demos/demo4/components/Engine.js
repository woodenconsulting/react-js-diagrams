import React from 'react';
import * as RJD from '../../../src/main';
import { OutputWidgetFactory } from './nodes/output/OutputWidgetFactory';
import { OutputNodeFactory } from './nodes/output/OutputInstanceFactories';
import { InputWidgetFactory } from './nodes/input/InputWidgetFactory';
import { InputNodeFactory } from './nodes/input/InputInstanceFactories';
import { ConnectionWidgetFactory } from './nodes/connection/ConnectionWidgetFactory';
import { ConnectionNodeFactory } from './nodes/connection/ConnectionInstanceFactories';

// Setup the diagram engine
export const diagramEngine = new RJD.DiagramEngine();
diagramEngine.registerNodeFactory(new RJD.DefaultNodeFactory());
diagramEngine.registerLinkFactory(new RJD.DefaultLinkFactory());
diagramEngine.registerNodeFactory(new OutputWidgetFactory());
diagramEngine.registerNodeFactory(new InputWidgetFactory());
diagramEngine.registerNodeFactory(new ConnectionWidgetFactory());

// Register instance factories
diagramEngine.registerInstanceFactory(new RJD.DefaultNodeInstanceFactory());
diagramEngine.registerInstanceFactory(new RJD.DefaultPortInstanceFactory());
diagramEngine.registerInstanceFactory(new RJD.LinkInstanceFactory());
diagramEngine.registerInstanceFactory(new OutputNodeFactory());
diagramEngine.registerInstanceFactory(new InputNodeFactory());
diagramEngine.registerInstanceFactory(new ConnectionNodeFactory());
