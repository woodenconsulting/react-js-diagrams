import * as React from "react";

export class NodeWidget extends React.Component {
	shouldComponentUpdate(){
		return this.props.diagramEngine.canEntityRepaint(this.props.node);
	}

	render() {
		return (
			React.DOM.div({
				'data-nodeid': this.props.node.id,
				className: 'node' + (this.props.node.isSelected() ? ' selected' : ''),
				style:{
					top: this.props.node.y,
					left: this.props.node.x,
				}},
				React.cloneElement(this.props.children, {})
			)
		);
	}
}
