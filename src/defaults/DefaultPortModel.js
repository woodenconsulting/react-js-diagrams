import { PortModel } from '../Common';
import { AbstractInstanceFactory } from '../AbstractInstanceFactory';

export class DefaultPortInstanceFactory extends AbstractInstanceFactory {
  constructor() {
    super('DefaultPortModel');
  }

  getInstance() {
    return new DefaultPortModel(true, 'unknown');
  }
}

export class DefaultPortModel extends PortModel {
  constructor(isInput, name, label = null) {
    super(name);
    this.in = isInput;
    this.label = label || name;
  }

  deSerialize(object) {
    super.deSerialize(object);
    this.in = object.in;
    this.label = object.label;
  }

  serialize() {
    return {
      ...super.serialize(),
      in: this.in,
      label: this.label
    };
  }
}
