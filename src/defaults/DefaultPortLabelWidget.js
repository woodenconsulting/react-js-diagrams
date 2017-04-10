import React from 'react';
import { PortWidget } from '../widgets/PortWidget';

export class DefaultPortLabel extends React.Component {
  static defaultProps = {
    in: true,
    label: 'port'
  };

  render() {
    const { model } = this.props;
    const port = (
      <PortWidget name={model.name} node={model.getParent()} />
    );
    const label = (
      <div className='name'>
        {model.label}
      </div>
    );
    
    return (
      <div className={`${(model.in ? 'in' : 'out')}-port`}>
        {model.in ? port : label}
        {model.in ? label : port}
      </div>
    );
  }
}
