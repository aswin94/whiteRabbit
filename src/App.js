import React, { Component } from 'react';
import { Route, Switch, withRouter} from 'react-router-dom'

import SignIn from './components/auth/signIn';
// import Home from './components/home/homePage';


export class App extends Component {
  render() {
    const {location} = this.props;
    console.log(location, 'location');
    return (
      <div>
        <Switch location={location}>
          <Route exact path = '/' component = {SignIn} />
          {/* <Route exact path = "/" render={props => <SignIn {...props} />} /> */}
          {/* <Route path = '/home' component = {Home} /> */}
        </Switch>
      </div> 
    );
  }
}

export default withRouter(App);

