import * as SRD from '../../src/main';
import * as _ from 'lodash';

export class DiamondPortModel extends SRD.PortModel {
  constructor(pos = 'top') {
    super(pos);
    this.position = pos;
  }

  serialize() {
    return _.merge(super.serialize(), {
      position: this.position,
    });
  }

  deSerialize(data) {
    super.deSerialize(data);
    this.position = data.position;
  }
}
