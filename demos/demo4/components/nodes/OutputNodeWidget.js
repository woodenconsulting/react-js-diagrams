import React from 'react';
import * as RJD from '../../../../src/main';

export class OutputNodeWidget extends React.Component {
  static defaultProps = {
    node: null,
  };

  onRemove() {
    const { node, diagramEngine } = this.props;
    node.remove();
    diagramEngine.forceUpdate();
  }

  getOutPorts() {
    const { node } = this.props;
    return node.getOutPorts ? node.getOutPorts().map((port, i) => <RJD.DefaultPortLabel model={port} key={`out-port-${i}`} />) : [];
  }

  render() {
    const { node, displayOnly } = this.props;
    const { name, color } = node;
    const style = {};
    if (color) {
      style.background = color;
    }
    
    return (
      <div className='basic-node' style={style}>
        <div className='title'>
          <div className='name'>
            {name}
          </div>
          {!displayOnly ? <div className='fa fa-close' onClick={this.onRemove.bind(this)} /> : null}
        </div>
        {!displayOnly ?
          <div className='ports'>
            <div className='out'>
              {this.getOutPorts()}
            </div>
          </div>
        : null}
      </div>
    );
  }
}

export const OutputNodeWidgetFactory = React.createFactory(OutputNodeWidget);
