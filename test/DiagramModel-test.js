import expect from 'expect.js';
import DATA from './data';
import { diagramEngine } from './engine';
import { DiagramModel } from '../src/main';

describe('Diagram Model', () => {

  it('can deserialize test data', () => {
    const diagramModel = new DiagramModel();
    diagramModel.deSerializeDiagram(DATA, diagramEngine);

    // There should be two nodes
    expect(Object.keys(diagramModel.getNodes()).length).to.be(2);

    // There should be a single link between nodes
    expect(Object.keys(diagramModel.getLinks()).length).to.be(1);
  });

});
