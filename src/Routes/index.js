import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// import App from './App';
// import Files from './modules/Files';
// import Settings from './modules/Settings';
// import Jobs from './modules/Jobs';
// import Bots from './modules/Bots';
import Bots from '../Bots';

const Routes = (props) => {
  const Router = BrowserRouter;
  const routes = (
    <Router>
      <Switch>
        <Route exact path="/" component={Bots} {...props} />
        <Route path="/:id" component={Bots} {...props} />
      </Switch>
    </Router>
  );

  // routes.propTypes = {
  //   loggingIn: PropTypes.bool.isRequired,
  //   authenticated: PropTypes.bool.isRequired,
  // };

  return routes;
};

export default Routes;
