import React from 'react';

export class Controls extends React.Component {
  render() {
    const { selectedNode, onUndo, onRedo } = this.props;
    const content = selectedNode ? JSON.stringify(selectedNode.model.serialize(), null, 2) : '';

  	return (
  	  <div className='controls'>
  	    <div>
  	      <button onClick={onUndo}>Undo</button>
  	      <button onClick={onRedo}>Redo</button>
  	    </div>
  	    <pre>
  	      {content}
  	    </pre>
    	</div>
  	);
  }
}
