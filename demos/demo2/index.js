import React from 'react';
import ReactDOM from 'react-dom';
import * as RJD from '../../src/main';
import '../test.scss';

/**
 *
 * Simple stress test of the system, shows that it can handle many nodes, and
 * retain good performance
 *
 * @Author Dylan Vorster
 */
class Demo2 extends React.Component {
  constructor(props) {
    super(props);

    // Setup the diagram engine
    this.engine = new RJD.DiagramEngine();
    this.engine.registerNodeFactory(new RJD.DefaultNodeFactory());
  	this.engine.registerLinkFactory(new RJD.DefaultLinkFactory());

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

  generateNodes(model, offsetX = 0, offsetY = 0) {
    // Create first node and port
    const node1 = this.createNode({
      name: 'Node 1',
      color: 'rgb(0, 192, 255)',
      x: 20 + offsetX,
      y: 20 + offsetY
    });
    const port1 = this.createPort(node1, {
      isInput: false,
      id: 'out-1',
      name: 'Out'
    });

    // Create second node and port
    const node2 = this.createNode({
      name: 'Node 2',
      color: 'rgb(192, 255, 0)',
      x: 120 + offsetX,
      y: 20 + offsetY
    });
    const port2 = this.createPort(node2, {
      isInput: true,
      id: 'in-1',
      name: 'In'
    });

  	// Add the nodes and link to the model
  	model.addNode(node1);
  	model.addNode(node2);
  	model.addLink(this.linkNodes(port1, port2));
	}

  testSerialization() {
    const { engine, model } = this;

    // We need this to help the system know what models to create form the JSON
  	engine.registerInstanceFactory(new RJD.DefaultNodeInstanceFactory());
  	engine.registerInstanceFactory(new RJD.DefaultPortInstanceFactory());
  	engine.registerInstanceFactory(new RJD.LinkInstanceFactory());

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

    for (let i =0; i < 8; i++) {
  		for (let j = 0; j < 8; j++) {
  			this.generateNodes(model, i * 200, j * 100);
  		}
  	}

  	// Load the model into the diagram engine
  	engine.setDiagramModel(model);

    // Render the canvas
  	return <RJD.DiagramWidget diagramEngine={engine} />;
  }
}

window.onload = () => {
  ReactDOM.render(<Demo2 />, document.getElementById('root'));
};
