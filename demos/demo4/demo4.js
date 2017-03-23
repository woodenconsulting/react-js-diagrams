import React from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import * as actions from './actions';
import { NodesPanel } from './components/NodesPanel';
import { Diagram } from './components/Diagram';
import { Controls } from './components/Controls';
import './demo4.scss';

class Demo extends React.Component {
  render() {
    const { selectedNode, onNodeSelected, onUndo, onRedo } = this.props;

    console.log('RENDER DEMO');
    console.log(this.props);

  	return (
  	  <DragDropContextProvider backend={HTML5Backend}>
    	  <div className='parent-container'>
    	    <NodesPanel />
    	    <div className='canvas-controls-container'>
    	      <Diagram onNodeSelected={node => onNodeSelected(node)} />
    	      <Controls selectedNode={selectedNode} onUndo={onUndo} onRedo={onRedo} />
    	    </div>
    	  </div>
  	  </DragDropContextProvider>
  	);
  }
}

const mapStateToProps = state => ({
  selectedNode: state.history.present.selectedNode
});

const mapDispatchToProps = dispatch => ({
  onNodeSelected: node => dispatch(actions.onNodeSelected(node)),
  onUndo: () => dispatch(UndoActionCreators.undo()),
  onRedo: () => dispatch(UndoActionCreators.redo())
});

export const Demo4 = connect(mapStateToProps, mapDispatchToProps)(Demo);
