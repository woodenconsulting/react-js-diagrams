import React from 'react';

export class LinkWidget extends React.Component {
  shouldComponentUpdate() {
    return this.props.diagramEngine.canEntityRepaint(this.props.link);
  }

  render() {
    return this.props.children;
  }
}
