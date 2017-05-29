import React from 'react';

export class Demos extends React.Component {
  render() {
    return (
      <div>
        <div className='demo-link'><a onClick={() => window.location.assign('/demos/demo1')}>Demo 1</a></div>
        <div className='demo-link'><a onClick={() => window.location.assign('/demos/demo2')}>Demo 2</a></div>
        <div className='demo-link'><a onClick={() => window.location.assign('/demos/demo3')}>Demo 3</a></div>
        <div className='demo-link'><a onClick={() => window.location.assign('/demos/demo4')}>Demo 4</a></div>
        <div className='demo-link'><a onClick={() => window.location.assign('/demos/demo5')}>Demo 5</a></div>
      </div>
    );
  }
}
