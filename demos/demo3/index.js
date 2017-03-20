import React from 'react';
import ReactDOM from 'react-dom';
import * as RJD from '../../src/main';
import { DiamondNodeModel } from './DiamondNodeModel';
import { DiamondWidgetFactory } from './DiamondWidgetFactory';
import { DiamondNodeFactory, DiamondPortFactory } from './DiamondInstanceFactories';
import '../test.scss';

/**
 *
 * Shows a much more complex way on how to use this library, by creating custom
 * node elements
 *
 */
class Demo3 extends React.Component {
  constructor(props) {
    super(props);

    // Setup the diagram engine
    this.engine = new RJD.DiagramEngine();
    this.engine.registerNodeFactory(new RJD.DefaultNodeFactory());
  	this.engine.registerLinkFactory(new RJD.DefaultLinkFactory());
  	this.engine.registerNodeFactory(new DiamondWidgetFactory());

  	// Setup the diagram model
  	this.model = new RJD.DiagramModel();
  }

  componentDidMount() {
    setTimeout(() => {
      this.testSerialization();
    }, 1000);
  }

  createNode(options) {
    const { name, color, x, y } = options;
    var node = new RJD.DefaultNodeModel(name, color);
  	node.x = x;
  	node.y = y;
  	return node;
  }

  createPort(node, options) {
    const { isInput, id, name } = options;
    return node.addPort(new RJD.DefaultPortModel(isInput, id, name));
  }

  linkNodes(port1, port2) {
    const link = new RJD.LinkModel();
  	link.setSourcePort(port1);
  	link.setTargetPort(port2);
  	return link;
  }

  testSerialization() {
    const { engine, model } = this;

    // We need this to help the system know what models to create form the JSON
  	engine.registerInstanceFactory(new RJD.DefaultNodeInstanceFactory());
  	engine.registerInstanceFactory(new RJD.DefaultPortInstanceFactory());
  	engine.registerInstanceFactory(new RJD.LinkInstanceFactory());
  	engine.registerInstanceFactory(new DiamondNodeFactory());
  	engine.registerInstanceFactory(new DiamondPortFactory());

  	// Serialize the model
  	const str = JSON.stringify(model.serializeDiagram());
  	console.log(str);

  	// Deserialize the model
  	const model2 = new RJD.DiagramModel();
  	model2.deSerializeDiagram(JSON.parse(str),engine);
  	engine.setDiagramModel(model2);
  	console.log(model2);
  }

  render() {
    const { engine, model } = this;

    // Create first node and port
    const node1 = this.createNode({
      name: 'Node 1',
      color: 'rgb(0, 192, 255)',
      x: 100,
      y: 150
    });
    const port1 = this.createPort(node1, {
      isInput: false,
      id: 'out-1',
      name: 'Out'
    });

    // Create the diamond node
    const diamondNode = new DiamondNodeModel();
    diamondNode.x = 400;
  	diamondNode.y = 100;

    // Create second node and port
    const node2 = this.createNode({
      name: 'Node 2',
      color: 'red',
      x: 800,
      y: 150
    });
    const port2 = this.createPort(node2, {
      isInput: true,
      id: 'in-1',
      name: 'In'
    });

  	// Add the nodes and link to the model
  	model.addNode(node1);
  	model.addNode(diamondNode);
  	model.addNode(node2);
  	model.addLink(this.linkNodes(port1, diamondNode.ports['left']));
  	model.addLink(this.linkNodes(diamondNode.ports['right'], port2));

  	// Load the model into the diagram engine
  	engine.setDiagramModel(model);

    // Render the canvas
  	return <RJD.DiagramWidget diagramEngine={engine} />;
  }
}

window.onload = () => {
  ReactDOM.render(<Demo3 />, document.getElementById('root'));
};
