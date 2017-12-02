import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import AddPostPage from '../components/AddPostPage';
import Post from '../components/Post';
import Profile from '../components/Profile';
import Header from '../components/Header';
import Seens from '../components/Seens';
import SeensList from '../components/SeensList';
import AddSeenPage from '../components/AddSeenPage';
import Seen from '../components/Seen';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header />
      <Seens />
      <Switch>
      <Route path="/" component={DashboardPage} exact={true}/>
        <Route path="/login" component={LoginPage} />
        <Route path="/s/:title/create" component={AddPostPage} />
        <Route path="/s/:seen/posts/:title" component={Post} />
        <Route path="/s/:title" component={Seen} exact={true}/>
        <Route path="/seens" component={Seens} exact={true}/>
        <PrivateRoute path="/seens/create" component={AddSeenPage} />
        <Route path="/seens/:seen" component={Seens} exact={true}/>
        <PrivateRoute path="/profile" component={Profile} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
