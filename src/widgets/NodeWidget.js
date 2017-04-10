import React from 'react';
import _ from 'lodash';

export class NodeWidget extends React.Component {
  shouldComponentUpdate() {
    return this.props.diagramEngine.canEntityRepaint(this.props.node);
  }

  render() {
    const { node, children, diagramEngine } = this.props;
    const props = {
      'data-nodeid': node.id,
      className: `node${(this.props.node.isSelected() ? ' selected' : '')}`,
      style:{
        top: this.props.node.y,
        left: this.props.node.x,
      }
    };
    
    // Pass the diagramEngine to the node
    const items = _.isArray(children) ?
      children.map(child => (React.cloneElement(child, { diagramEngine }))) :
      React.cloneElement(children, { diagramEngine });

    return (
      <div {...props}>
        {items}
      </div>
    );
  }
}
