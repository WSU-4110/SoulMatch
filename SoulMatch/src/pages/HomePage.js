import React from "react";
import { connect } from "react-redux";
import "./../styles/HomePage.css";

function withLoginRedirect(WrappedComponent) {
  class LoginRedirect extends React.Component {
    componentDidMount() {
      if (this.props.loaded && this.props.loggedIn) {
        const history = this.props.history;
        history.push("/home");
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  const mapStateToProps = (state) => {
    return {
      loaded: state.loaded,
      loggedIn: state.user.loggedIn,
    };
  };

  return connect(mapStateToProps)(LoginRedirect);
}

class HomePage extends React.Component {
  state = {
    loaded: false,
  };

  componentDidMount() {
    this.setState({ loaded: true });
  }

  render() {
    return (
      <div className="backgroundHome">
        <div className="homeHeader">
          <a href="/">
            <img
              className="homeLogo"
              src="/assets/images/soul-match-logo-updated.png"
              alt="SoulMatch Logo"
            />
          </a>
          <nav>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </nav>
          <div>
            <div className="home-form-button">
              <a href="/login">Login</a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h1>SoulMatch</h1>
            <p>
              SoulMatch, a better way to find matches. No matter who you are or
              where you're from, come find your <em>SoulMatch</em>.
            </p>
          </div>
          <div className="col">
            <div className="card"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default withLoginRedirect(HomePage);
