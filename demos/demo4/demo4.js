import React from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import * as actions from './actions';
import { NodesPanel } from './components/NodesPanel';
import { Diagram } from './components/Diagram';
import { Controls } from './components/Controls';
import './demo4.scss';

class Demo extends React.Component {
  render() {
    const { selectedNode, onNodeSelected } = this.props;

  	return (
  	  <DragDropContextProvider backend={HTML5Backend}>
    	  <div className='parent-container'>
    	    <NodesPanel />
    	    <div className='canvas-controls-container'>
    	      <Diagram onNodeSelected={node => onNodeSelected(node)} />
    	      <Controls selectedNode={selectedNode} />
    	    </div>
    	  </div>
  	  </DragDropContextProvider>
  	);
  }
}

const mapStateToProps = state => ({
  selectedNode: state.selectedNode
});

const mapDispatchToProps = dispatch => ({
  onNodeSelected: node => dispatch(actions.onNodeSelected(node))
});

export const Demo4 = connect(mapStateToProps, mapDispatchToProps)(Demo);
