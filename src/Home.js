import React, { Component } from 'react';
import 'style/home.less';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      msg: "hello react",
      clickNum: 0
    }
  }

  changeMsg() {
    this.props.history.push({pathname: '/content', query: {msg: 'Hello This One'}})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={require('images/logo.svg')} className="App-logo" alt="logo" />
          <p>{this.state.msg}</p>
          <a className="App-link"
            target="_blank"
            onClick={this.changeMsg.bind(this)}
          >Go to see</a>
        </header>
      </div>
    );
  }
}

export default App;
