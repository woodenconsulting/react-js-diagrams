import React, { PropTypes } from 'react';
import { DragSource } from 'react-dnd';

const nodeSource = {
  beginDrag(props) {
    return {
      type: props.type,
    };
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
