import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';

const nodeSource = {
  beginDrag(props) {
    return props;
  }
};

@DragSource('node-source', nodeSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
export class DragWrapper extends React.Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    children: PropTypes.node
  };

  render() {
    const { isDragging, connectDragSource, children, style } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    return (
      connectDragSource(
        <div style={{ ...style, opacity }}>
          {children}
        </div>
      )
    );
  }
}
