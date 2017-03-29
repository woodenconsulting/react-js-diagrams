import React from 'react';
import { DragWrapper } from './DragWrapper';
import { OutputNodeWidget } from './nodes/output/OutputNodeWidget';
import { InputNodeWidget } from './nodes/input/InputNodeWidget';
import { ConnectionNodeWidget } from './nodes/connection/ConnectionNodeWidget';

class Node extends React.Component {
  renderNode() {
    const { type, color } = this.props;

    if (type === 'output') {
      return <OutputNodeWidget node={{ name: 'Output Node' }} displayOnly />;
    }
    if (type === 'input') {
      return <InputNodeWidget node={{ name: 'Input Node' }} displayOnly />;
    }
    if (type === 'connection') {
      return <ConnectionNodeWidget node={{ name: 'Connection Node' }} color={color} displayOnly />;
    }
    console.warn('Unknown node type');
    return null;
  }

  render() {
    const { type, color } = this.props;

    return (
      <DragWrapper type={type} color={color} style={{ display: 'inline-block' }}>
        {this.renderNode()}
      </DragWrapper>
    );
  }
}

export class NodesPanel extends React.Component {
  render() {
    return (
      <div className='nodes-panel'>
        <div className='node-wrapper'>
          <Node type='output' />
        </div>
        <div className='node-wrapper'>
          <Node type='connection' color='rgb(224, 98, 20)' />
        </div>
        <div className='node-wrapper'>
          <Node type='connection' color='rgb(157, 13, 193)' />
        </div>
        <div className='node-wrapper'>
          <Node type='connection' color='rgb(12, 193, 180)' />
        </div>
        <div className='node-wrapper'>
          <Node type='input' />
        </div>
      </div>
    );
  }
}
