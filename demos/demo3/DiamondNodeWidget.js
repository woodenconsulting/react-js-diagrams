import * as React from 'react';
import * as SRD from '../../src/main';

export class DiamonNodeWidget extends React.Component  {
  static defaultProps = {
    size:150,
    node: null
  };

  render() {
    return (
      React.DOM.div({className: "diamond-node", style: {position: 'relative', width: this.props.size, height: this.props.size}},
        React.DOM.svg({
          width:this.props.size,height: this.props.size,dangerouslySetInnerHTML: {__html:`
            <g id="Layer_1">
            </g>
            <g id="Layer_2">
              <polygon fill="cyan" stroke="#000000" stroke-width="3" stroke-miterlimit="10" points="10,`+(this.props.size/2)+` `+(this.props.size/2)+`,10 `+(this.props.size-10)+`,`+(this.props.size/2)+` `+(this.props.size/2)+`,`+(this.props.size-10)+` "/>
            </g>
        `}}),

        // left node
        React.DOM.div({
          style: {
            position: 'absolute',
            zIndex: 10,
            top: this.props.size / 2 - 5
          }
        },
          React.createElement(SRD.PortWidget,{name: 'left', node: this.props.node})
        ),

        // top node
        React.DOM.div({
          style: {
            position: 'absolute',
            zIndex: 10,
            left: this.props.size / 2 - 8
          }
        },
          React.createElement(SRD.PortWidget,{name: 'top', node: this.props.node})
        ),

        // right
        React.DOM.div({
          style: {
            position: 'absolute',
            zIndex: 10,
            left: this.props.size - 10,
            top: this.props.size / 2
          }
        },
          React.createElement(SRD.PortWidget,{name: 'right', node: this.props.node})
        ),

        // bottom
        React.DOM.div({ 
          style: { 
            position: 'absolute',
            zIndex: 10,
            left: this.props.size / 2 - 8,
            top: this.props.size - 10
          }
        },
          React.createElement(SRD.PortWidget,{name: 'bottom', node: this.props.node})
        )
      )
    );
  }
}

export var DiamonNodeWidgetFactory = React.createFactory(DiamonNodeWidget);
