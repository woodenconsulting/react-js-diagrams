import _ from 'lodash';
import { NodeModel } from '../Common';
import { AbstractInstanceFactory } from '../AbstractInstanceFactory';

export class DefaultNodeInstanceFactory extends AbstractInstanceFactory {
  constructor() {
    super('DefaultNodeModel');
  }

  getInstance() {
    return new DefaultNodeModel();
  }
}

export class DefaultNodeModel extends NodeModel {
  constructor(name = 'Untitled', color = 'rgb(0,192,255)') {
    super('default');
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

  getInPorts() {
    return _.filter(this.ports,(portModel) => portModel.in);
  }

  getOutPorts() {
    return _.filter(this.ports,(portModel) => !portModel.in);
  }
}
