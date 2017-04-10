import React from 'react';
import { DefaultPortLabel } from './DefaultPortLabelWidget';

export class DefaultNodeWidget extends React.Component {
  static defaultProps = {
    node: null,
  };

  onRemove() {
    const { node, diagramEngine } = this.props;
    node.remove();
    diagramEngine.forceUpdate();
  }

  getInPorts() {
    const { node } = this.props;
    return node.getInPorts().map((port, i) => <DefaultPortLabel model={port} key={`in-port-${i}`} />);
  }

  getOutPorts() {
    const { node } = this.props;
    return node.getOutPorts().map((port, i) => <DefaultPortLabel model={port} key={`out-port-${i}`} />);
  }

  render() {
    const { node } = this.props;
    return (
      <div className='basic-node' style={{ background: node.color }}>
        <div className='title'>
          <div className='name'>
            {node.name}
          </div>
          <div className='fa fa-close' onClick={this.onRemove.bind(this)} />
        </div>
        <div className='ports'>
          <div className='in'>
            {this.getInPorts()}
          </div>
          <div className='out'>
            {this.getOutPorts()}
          </div>
        </div>
      </div>
    );
  }
}
