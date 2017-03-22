import _ from 'lodash';
import * as RJD from '../../../../../src/main';

export class OutputNodeModel extends RJD.NodeModel {
  constructor(){
    super('output');
    this.addPort(new RJD.DefaultPortModel(false, 'output', 'Output Node'));
  }

  getOutPorts() {
    return _.filter(this.ports,(portModel) => !portModel.in);
  }
}
