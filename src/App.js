import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Faye from 'faye';

import './main.css';

import Header from './Components/Header';
import Routes from './Routes';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client: new Faye.Client('http://localhost:3000/faye'),
      bots: {},
      botPresets: {},
      jobs: {},
      files: {},
      appColor: 210,
    };

    this.state.client.subscribe('/bots', ({ bots }) => {
      this.setState({ bots });
    });
    this.state.client.subscribe('/botPresets', ({ botPresets }) => {
      this.setState({ botPresets });
    });
    this.state.client.subscribe('/jobs', ({ jobs }) => {
      this.setState({ jobs });
    });
    this.state.client.subscribe('/files', ({ files }) => {
      this.setState({ files });
    });
  }
  render() {
    const Router = BrowserRouter;
    return (
      <div>
        <Router>
          <div>
            <Header {...this.state} />
            <Routes {...this.state} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
