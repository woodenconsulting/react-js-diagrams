import React from 'react';
import _ from 'lodash';
import { NodeWidget } from './NodeWidget';

export class NodeLayerWidget extends React.Component {
  render() {
    const { diagramEngine } = this.props;
    const diagramModel = diagramEngine.getDiagramModel();
    const props = {
      className:'node-view',
      style:{
        transform: `scale(${diagramModel.getZoomLevel() / 100.0}) translate(${diagramModel.getOffsetX()}px, ${diagramModel.getOffsetY()}px)`, // eslint-disable-line
        width: '100%',
        height: '100%'
      }
    };

    // Create children
    const children = _.map(diagramModel.getNodes(), node => {
      return (
        <NodeWidget
          key={node.id}
          node={node}
          diagramEngine={diagramEngine}
        >
          {this.props.diagramEngine.generateWidgetForNode(node)}
        </NodeWidget>
      );
    });

    return (
      <div {...props}>
        {children}
      </div>
    );
  }
}
