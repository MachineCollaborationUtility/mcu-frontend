import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import App from './App';
// import Files from './modules/Files';
// import Settings from './modules/Settings';
// import Jobs from './modules/Jobs';
// import Bots from './modules/Bots';
import Bots from '../Components/Bots';
import Files from '../Components/Files';
import Settings from '../Components/Settings';

const Routes = (props) => {
  const routes = (
    <Switch>
      <Route exact path="/" render={() => <Bots {...props} />} />
      <Route path="/files" render={() => <Files {...props} />} />
      <Route exact path="/settings" render={() => <Settings {...props} />} />
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
