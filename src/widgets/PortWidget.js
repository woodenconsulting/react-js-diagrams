import React from 'react';

export class PortWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
  }

  render() {
    const { name, node } = this.props;
    return (
      <div
        className={`port${(this.state.selected ? ' selected' : '')}`}
        onMouseEnter={() => this.setState({ selected: true })}
        onMouseLeave={() => this.setState({ selected: false })}
        data-name={name}
        data-nodeid={node.getID()}
      />
    );
  }
}
