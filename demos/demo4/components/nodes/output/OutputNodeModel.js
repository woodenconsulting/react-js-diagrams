import _ from 'lodash';
import * as RJD from '../../../../../src/main';

export class OutputNodeModel extends RJD.NodeModel {
  constructor(name = 'Untitled', color = 'rgb(0, 192, 255)') {
    super('output');
    this.addPort(new RJD.DefaultPortModel(false, 'output', 'Out'));
    this.name = name;
    this.color = color;
  }

  deSerialize(object) {
    super.deSerialize(object);
    this.name = object.name;
    this.color = object.color;
  }

  serialize() {
    return _.merge(super.serialize(), {
      name: this.name,
      color: this.color,
    });
  }

  getOutPorts() {
    return _.filter(this.ports, portModel => !portModel.in);
  }
}
