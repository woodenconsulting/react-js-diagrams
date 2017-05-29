import React from 'react';
import ReactDOM from 'react-dom';
import * as RJD from '../../src/main';
import { WhiteLinkModel } from './WhiteLinkModel';
import { WhiteLinkFactory } from './WhiteLinkFactory';
import { WhiteLinkInstanceFactory } from './WhiteLinkInstanceFactory';
import '../test.scss';

/**
 *
 * Demo showing the implementation of a custom link widget
 *
 */
class Demo5 extends React.Component {
  constructor(props) {
    super(props);

    // Setup the diagram engine
    this.engine = new RJD.DiagramEngine();
    this.engine.registerNodeFactory(new RJD.DefaultNodeFactory());
    this.engine.registerLinkFactory(new WhiteLinkFactory());

    // Register instance factories
    this.engine.registerInstanceFactory(new RJD.DefaultNodeInstanceFactory());
    this.engine.registerInstanceFactory(new RJD.DefaultPortInstanceFactory());
    this.engine.registerInstanceFactory(new WhiteLinkInstanceFactory());

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
    const link = new WhiteLinkModel();
    link.setSourcePort(port1);
    link.setTargetPort(port2);
    return link;
  }

  testSerialization() {
    const { engine, model } = this;

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
      y: 100
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
      x: 400,
      y: 100
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

    // Load the model into the diagram engine
    engine.setDiagramModel(model);

    // Render the canvas
    return <RJD.DiagramWidget diagramEngine={engine} />;
  }
}

window.onload = () => {
  ReactDOM.render(<Demo5 />, document.getElementById('root'));
};
