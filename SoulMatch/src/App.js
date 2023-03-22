import React from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {connect} from "react-redux";
import {setUser, setLoggedIn} from "./redux/reducers/UserReducer";
import {reactLocalStorage} from "reactjs-localstorage";

import HomePage from "./pages/HomePage";
import AuthenticationPage from "./pages/AuthenticationPage";
import PersonalizationPage from "./pages/PersonalizationPage";
import MatchPage from "./pages/MatchPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import MessagePage from "./pages/MessagePage";

class App extends React.Component {

  state = {
    loggedIn: false
  };

  componentDidMount() {
      if (reactLocalStorage.get("loggedIn", false)) {
          this.props.setLoggedIn(true);
          this.props.setUser(reactLocalStorage.getObject("user", {}))
      }
  }

  render() {
    return (
        <Router forceRefresh={true}>
          <Switch>
            <Route path='/' component={HomePage} exact={true} />
            <Route path='/login' component={AuthenticationPage} exact={true} />
            <Route path='/traits' component={PersonalizationPage} exact={true} />
            <Route path='/home' component={MatchPage} exact={true} />
            <Route path='/contact' component={ContactPage} exact={true} />
            <Route path='/about' component={AboutPage} exact={true} />
            <Route path='/message' component={MessagePage} exact={true} />
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

const mapDispatchToProps = dispatch => {
    return {
        setUser: (user) => dispatch(setUser(user)),
        setLoggedIn: (loggedIn) => dispatch(setLoggedIn(loggedIn))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
