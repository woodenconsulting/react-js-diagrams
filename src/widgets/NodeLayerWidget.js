import * as React from "react";
import * as _ from "lodash";
import { NodeWidget } from "./NodeWidget";

export class NodeLayerWidget extends React.Component {
	render() {
	  const { diagramEngine, updateDiagram } = this.props;
		const diagramModel = diagramEngine.getDiagramModel();

		return (
			React.DOM.div({
					className:'node-view',
					key: 'node-view',
					style:{
						transform: 'scale(' + diagramModel.getZoomLevel() / 100.0 + ') translate(' + diagramModel.getOffsetX()+'px,'+diagramModel.getOffsetY()+'px)',
						width: '100%',
						height: '100%'
					}
				},
				_.map(diagramModel.getNodes(),(node) => {
					return(
						React.createElement(NodeWidget, {diagramEngine, updateDiagram, key: node.id, node},
							this.props.diagramEngine.generateWidgetForNode(node))
					);
				})
			)
		);
	}
}
