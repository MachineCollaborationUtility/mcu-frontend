import React, { Component } from 'react';
import Faye from 'faye';

import './main.css';

import Routes from './Routes';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client: new Faye.Client('http://localhost:3000/faye'),
      bots: {},
      jobs: {},
      files: {},
    };

    this.state.client.subscribe('/bots', ({ bots }) => {
      this.setState({ bots });
    });
    this.state.client.subscribe('/jobs', ({ jobs }) => {
      this.setState({ jobs });
    });
    this.state.client.subscribe('/files', ({ files }) => {
      this.setState({ files });
    });
  }
  render() {
    return <Routes {...this.state} />;
  }
}

export default App;
