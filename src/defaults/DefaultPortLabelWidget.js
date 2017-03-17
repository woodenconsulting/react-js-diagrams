import * as React from "react";
import {PortWidget} from "../widgets/PortWidget";

/**
 * @author Dylan Vorster
 */
export class DefaultPortLabel extends React.Component {

	static defaultProps = {
		in: true,
		label: "port"
	};

	render() {

		var port = React.createElement(PortWidget, {name: this.props.model.name, node: this.props.model.getParent()});
		var label = React.DOM.div({className: 'name'}, this.props.model.label);

		return React.DOM.div({className: (this.props.model.in?'in':'out')+'-port'},
			this.props.model.in?port:label,
			this.props.model.in?label:port
		);
	}
}
