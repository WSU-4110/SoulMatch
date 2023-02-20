import React from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {connect} from "react-redux";
import {setUserData, setLoggedIn} from "./redux/reducers/UserReducer";
import {reactLocalStorage} from "reactjs-localstorage";

import HomePage from "./pages/HomePage";
import AuthenticationPage from "./pages/AuthenticationPage";
import PersonalizationPage from "./pages/PersonalizationPage";

//TODO: Replace react logos with SoulMatch logos
class App extends React.Component {

  state = {
    loggedIn: false
  };

  componentDidMount() {
      if (reactLocalStorage.get("loggedIn", false)) {
          this.props.setLoggedIn(true);
          this.props.setUserData(reactLocalStorage.getObject("user", {}))
      }
  }

  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' component={HomePage} exact={true} />
            <Route path='/login' component={AuthenticationPage} exact={true} />
            <Route path='/traits' component={PersonalizationPage} exact={true} />
          </Switch>
        </Router>
    )
  }
}

const mapStateToProps = state => {
    return {
        userState: state.user
    };
};
export default connect(mapStateToProps, {
    setUserData,
    setLoggedIn
})(App);
