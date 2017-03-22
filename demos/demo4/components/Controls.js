import React from 'react';

export class Controls extends React.Component {
  render() {
    const { selectedNode } = this.props;
    const content = selectedNode ? JSON.stringify(selectedNode.model.serialize(), null, 2) : '';

  	return (
  	  <div className='controls'>
  	    <pre>
  	      {content}
  	    </pre>
    	</div>
  	);
  }
}
