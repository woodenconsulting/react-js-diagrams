import React from 'react';
import { DragWrapper } from './DragWrapper';
import { OutputNodeWidget } from './nodes/output/OutputNodeWidget';
import { InputNodeWidget } from './nodes/input/InputNodeWidget';
import { ConnectionNodeWidget } from './nodes/connection/ConnectionNodeWidget';

class Node extends React.Component {
  renderNode() {
    const { type } = this.props;
    if (type === 'output') {
      return <OutputNodeWidget node={{ name: 'Output Node' }} displayOnly />;
    }
    if (type === 'input') {
      return <InputNodeWidget node={{ name: 'Input Node' }} displayOnly />;
    }
    if (type === 'connection') {
      return <ConnectionNodeWidget node={{ name: 'Connection Node' }} displayOnly />;
    }
    console.warn('Unknown node type');
    return null;
  }

  render() {
    const { type } = this.props;

    return (
      <DragWrapper type={type} style={{ display: 'inline-block' }}>
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
          <Node type='input' />
        </div>
        <div className='node-wrapper'>
          <Node type='connection' />
        </div>
      </div>
    );
  }
}
