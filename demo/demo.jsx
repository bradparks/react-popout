import React from 'react';
import domready from 'domready';
import Popout from '../lib/react-popout.jsx';

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.popout = this.popout.bind(this);
    this.incrementTimer = this.incrementTimer.bind(this);
    this.popoutClosed = this.popoutClosed.bind(this);
    this.state = { isPoppedOut: false, timer: 0 };
  }

  incrementTimer() {
    var newTimer = this.state.timer + 1;
    this.setState({ timer: newTimer});
  }

  popout() {
    this.setState({isPoppedOut: true, timerId: setInterval(this.incrementTimer, 1000)});
  }

  popoutClosed() {
    clearInterval(this.state.timerId);
    this.setState({isPoppedOut: false, timerId: null, timer: 0});
  }

  render() {
    if (this.state.isPoppedOut) {
      return (
        // Remove url parameter to see about:blank support
        <Popout title='Test' onClosing={this.popoutClosed}>
          <div>Popped out content! Timer: {this.state.timer}</div>
        </Popout>
      );
    } else {
      return (
        <div>
          <strong>Section <a style={{ textDecoration: 'underline', color: 'blue', cursor: 'pointer' }} onClick={this.popout}>(pop window out)</a></strong>
          <div>Inline content</div>
        </div>
      );
    }
  }
}

domready(() => {
  var container = document.createElement('div');
  document.body.appendChild(container);
  React.render(<Example />, container);
});