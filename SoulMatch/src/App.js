import React from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import HomePage from "./pages/HomePage";
import AuthenticationPage from "./pages/AuthenticationPage";

//TODO: Replace react logos with SoulMatch logos
class App extends React.Component {

  state = {
    loggedIn: false
  };

  componentDidMount() {
    //TODO: Implement logic to check if the user is logged in, if they are logged in set "loggedIn" to true
    //this.setState({loggedIn: true});
  }

  render() {
    //TODO: Implement react router and routing to pages instead of only the login/register page
    return (
        <Router>
          <Switch>
            <Route path='/' component={HomePage} exact={true} />
            <Route path='/login' component={AuthenticationPage} exact={true} />
          </Switch>
        </Router>
    )
  }
}

export default App;
