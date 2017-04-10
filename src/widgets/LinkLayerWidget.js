import React from 'react';
import _ from 'lodash';
import { LinkWidget } from './LinkWidget';

export class LinkLayerWidget extends React.Component {
  generateLinks() {
    const diagramModel = this.props.diagramEngine.getDiagramModel();

    return _.map(diagramModel.getLinks(), link => {
      // TODO: just improve this vastly x_x
      if (link.sourcePort !== null) {
        try {
          //generate a point
          link.points[0].updateLocation(this.props.diagramEngine.getPortCenter(link.sourcePort));
        }
        // Remove the link because its problematic (TODO implement this rather at an engine level)
        catch (ex) {
          diagramModel.removeLink(link);
          return;
        }
      }
      if (link.targetPort !== null) {
        try {
          _.last(link.points).updateLocation(this.props.diagramEngine.getPortCenter(link.targetPort));
        }
        //remove the link because its problematic (TODO implement this rather at an engine level)
        catch (ex) {
          diagramModel.removeLink(link);
          return;
        }
      }

      // Generate the links
      const generatedLink = this.props.diagramEngine.generateWidgetForLink(link);
      if (!generatedLink) {
        return null;
      }

      const props = {
        key: link.getID(),
        link,
        diagramEngine: this.props.diagramEngine,
      };

      return (
        <LinkWidget {...props}>
          {React.cloneElement(generatedLink, { pointAdded: this.props.pointAdded })}
        </LinkWidget>
      );
    });
  }

  render() {
    const diagramModel = this.props.diagramEngine.getDiagramModel();
    const zoom = diagramModel.getZoomLevel();
    const offsetX = diagramModel.getOffsetX();
    const offsetY = diagramModel.getOffsetY();
    const svgStyle = {
      transform: `scale(${zoom / 100.0}) translate(${offsetX}px, ${offsetY}px)`,
      width: '100%',
      height: '100%'
    };

    return (
      <svg style={svgStyle}>
        {this.generateLinks()}
      </svg>
    );
  }
}
