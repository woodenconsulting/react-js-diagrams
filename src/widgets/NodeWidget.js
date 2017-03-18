import React from 'react';

export class NodeWidget extends React.Component {
	shouldComponentUpdate(){
		return this.props.diagramEngine.canEntityRepaint(this.props.node);
	}

	render() {
	  const { node, children } = this.props;
	  const props = {
	    'data-nodeid': node.id,
	    className: 'node' + (this.props.node.isSelected() ? ' selected' : ''),
			style:{
				top: this.props.node.y,
				left: this.props.node.x,
			}
	  };
	  
	  return (
	    <div {...props}>
	      {children}
	    </div>
	  );
	}
}
