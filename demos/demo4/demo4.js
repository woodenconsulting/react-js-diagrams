import React from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
//import { DragSource, DropTarget } from 'react-dnd';
import { NodesPanel } from './components/NodesPanel';
import { Diagram } from './components/Diagram';
import './demo4.scss';

export class Demo4 extends React.Component {
  render() {
  	return (
  	  <DragDropContextProvider backend={HTML5Backend}>
    	  <div className='parent-container'>
    	    <NodesPanel />
    	    <div className='canvas-controls-container'>
    	      <Diagram />
    	      <div className='controls'>
    	      </div>
    	    </div>
    	  </div>
  	  </DragDropContextProvider>
  	);
  }
}
