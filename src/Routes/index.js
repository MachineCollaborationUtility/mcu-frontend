import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Bots from '../Components/Bots';
import Files from '../Components/Files';

const Routes = (props) => {
  const routes = (
    <Switch>
      <Route exact path="/" render={() => <Bots {...props} />} />
      <Route path="/files" render={() => <Files {...props} />} />
      <Route path="/:id" render={routeProps => <Bots {...props} {...routeProps} />} />
    </Switch>
  );

  // routes.propTypes = {
  //   loggingIn: PropTypes.bool.isRequired,
  //   authenticated: PropTypes.bool.isRequired,
  // };

  return routes;
};

export default Routes;
