import * as React from "react";
import * as _ from "lodash";
const div = React.DOM.div;
import {DefaultPortLabel} from "./DefaultPortLabelWidget";

export class DefaultNodeWidget extends React.Component {
	static defaultProps = {
		node: null,
	};

	onRemove() {
	  this.props.node.remove();
	  this.props.diagramEngine.forceUpdate();
	}

	render() {
		return (
			div({className: 'basic-node', key: 'basic-node', style: {background: this.props.node.color }},
				div({className:'title', key: 'title'},
					div({className:'name', key: 'name'},this.props.node.name),
					div({className: 'fa fa-close', key: 'close', onClick: this.onRemove.bind(this)})
				),
				div({className:'ports', key: 'ports'},
					div({className: 'in', key: 'in'}, _.map(this.props.node.getInPorts(),(port, i) => {
						return React.createElement(DefaultPortLabel,{model: port, key: `in-port-${i}`});
					})),
					div({className: 'out', key: 'out'}, _.map(this.props.node.getOutPorts(),(port, i) => {
						return React.createElement(DefaultPortLabel,{model: port, key: `out-port-${i}`});
					}))
				)
			)
		);
	}
}
