import React from 'react';
import { DragWrapper } from './DragWrapper';
import { OutputNodeWidget } from './nodes/OutputNodeWidget';

class Node extends React.Component {
  render() {
    return (
      <DragWrapper type={'node-output'} style={{ display: 'inline-block' }}>
        <OutputNodeWidget node={{ name: 'Output Node' }} displayOnly />
      </DragWrapper>
    );
  }
}

export class NodesPanel extends React.Component {
  render() {
  	return (
  	  <div className='nodes-panel'>
  	    <Node />
  	  </div>
  	);
  }
}
