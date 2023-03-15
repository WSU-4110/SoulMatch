interface AuthenticationForm {
  renderForm: () => JSX.Element;
  submitForm: (formData: any) => Promise<any>;
  switchFormType: () => void;
}

class LoginForm implements AuthenticationForm {
  // Implementation of interface methods
}

class RegisterForm implements AuthenticationForm {
  // Implementation of interface methods
}

class AuthenticationPage extends React.Component {
  state = {
    loaded: false,
    authenticationForm: new LoginForm(),
  };

  componentDidMount() {
    this.setState({ loaded: true });
  }

  switchFormType = () => {
    const { authenticationForm } = this.state;
    if (authenticationForm instanceof LoginForm) {
      this.setState({ authenticationForm: new RegisterForm() });
    } else {
      this.setState({ authenticationForm: new LoginForm() });
    }
  };

  login = (user) => {
    this.props.setLoggedIn(true);
    this.props.setUser(user);

    const history = this.props.history;
    history.push("/traits");
  };

  render() {
    const { authenticationForm } = this.state;

    if (this.state.loaded && this.props.userState.loggedIn) {
      const history = this.props.history;
      history.push("/traits");
    }

    return (
      <div className="background">
        {authenticationForm.renderForm()}
      </div>
    );
  }
}

class LoginForm implements AuthenticationForm {
  // ...

  submitForm = (formData) => {
    return sendApiRequest("/login", formData).then((result) => {
      this.props.login(result);
    });
  };
}

class RegisterForm implements AuthenticationForm {
  // ...

  submitForm = (formData) => {
    return sendApiRequest("/register", formData).then((result) => {
      this.props.switchFormType();
    });
  };
}