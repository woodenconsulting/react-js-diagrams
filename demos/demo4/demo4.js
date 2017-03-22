import React from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { NodesPanel } from './components/NodesPanel';
import { Diagram } from './components/Diagram';
import { Controls } from './components/Controls';
import './demo4.scss';

export class Demo4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNode: null
    };
  }

  render() {
  	return (
  	  <DragDropContextProvider backend={HTML5Backend}>
    	  <div className='parent-container'>
    	    <NodesPanel />
    	    <div className='canvas-controls-container'>
    	      <Diagram onNodeSelected={node => this.setState({ selectedNode: node })} />
    	      <Controls selectedNode={this.state.selectedNode} />
    	    </div>
    	  </div>
  	  </DragDropContextProvider>
  	);
  }
}
