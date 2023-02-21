import React, {useState} from "react";
import './../styles/AuthenticationPage.css';
import {sendApiRequest} from "../utils/ServerUtils";
import {connect} from "react-redux";
import {setUserData, setLoggedIn} from "../redux/reducers/UserReducer";
import {reactLocalStorage} from "reactjs-localstorage";
import {withRouter} from "react-router-dom";

class AuthenticationPage extends React.Component {

    state = {
        registerForm: false
    };

    componentDidMount() {
        if (this.props.userState.loggedIn) {
            const history = this.props.history;
            history.push('/home');
        }
    }

    switchFormType = () => {
        const {registerForm} = this.state;
        this.setState({registerForm: !registerForm});
    };

    login = (user) => {
        this.props.setLoggedIn(true);
        this.props.setUserData(user);
        reactLocalStorage.setObject("user", user);
        reactLocalStorage.set("loggedIn", true);

        const history = this.props.history;
        history.push('/traits');
    };

    render() {
        const {registerForm} = this.state;

        return (
            <div className='background'>
                {registerForm ? <RegisterForm switchFormType={this.switchFormType} /> :
                    <LoginForm switchFormType={this.switchFormType} login={this.login}/>}
            </div>
        );
    }
}

const LoginForm = ({switchFormType, login}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className='form-box'>
            <img className='logo' src='/assets/images/logo-color.png' alt='logo'/>
            {/* <p className='form-header'>Soul Match</p> */}

            <form className='auth-form' onSubmit={e => {
                e.preventDefault();
                sendApiRequest("/login", {email, password}).then(result => {
                    login(result);
                });
            }}>
                <input type='email' placeholder='Email' value={email} onChange={event => setEmail(event.target.value)}/>
                <input type="password" placeholder='Password' value={password}
                       onChange={event => setPassword(event.target.value)}/>

                <button>login</button>
            </form> 

            <p className='register-text'>
                Don't have an account?&nbsp;
                <a className='register-link' href='/register' onClick={event => {
                    event.preventDefault();
                    switchFormType();
                }}>Register Here</a>
            </p>
        </div>
    );
};

const RegisterForm = ({switchFormType}) => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className='form-box'>
            <img className='logo' src='/assets/images/logo-color.png' alt='logo'/>
            {/* <p className='form-header'>Soul Match</p> */}

            <form className='auth-form' onSubmit={e => {
                e.preventDefault();
                sendApiRequest(
                    '/register',
                    {
                        email: email,
                        firstName: firstName,
                        lastName: lastName,
                        password: password
                    }
                ).then(result => {
                   switchFormType();
                });
            }}>
                <input type='email' placeholder='Email' value={email} onChange={event => setEmail(event.target.value)}/>
                <input type='text' placeholder='First Name' value={firstName} onChange={event => setFirstName(event.target.value)}/>
                <input type='text' placeholder='Last Name' value={lastName} onChange={event => setLastName(event.target.value)}/>
                <input type="password" placeholder='Password' value={password} onChange={event => setPassword(event.target.value)}/>

                <button>register</button>
            </form>

            <p className='register-text'>
                Already have an account?&nbsp;
                <a className='register-link' href='/login' onClick={event => {
                    event.preventDefault();
                    switchFormType();
                }}>Login Here</a>
            </p>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        userState: state.user
    };
};
export default connect(mapStateToProps, {
    setUserData,
    setLoggedIn
})(withRouter(AuthenticationPage));
