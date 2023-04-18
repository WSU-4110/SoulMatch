import React, {useState} from "react";
import './../styles/AuthenticationPage.css';
import {sendApiRequest} from "../utils/ServerUtils";
import {connect} from "react-redux";
import {setLoggedIn, setUser} from "../redux/reducers/UserReducer";

class AuthenticationPage extends React.Component {

    state = {
        loaded: false,
        registerForm: false
    };

    componentDidMount() {
        this.setState({loaded: true});
    }

    switchFormType = () => {
        const {registerForm} = this.state;
        this.setState({registerForm: !registerForm});
    };

    login = (user) => {
        this.props.setLoggedIn(true);
        this.props.setUser(user);

        const history = this.props.history;
        history.push('/traits');
    };

    render() {
        const {registerForm} = this.state;

        if (this.state.loaded && this.props.userState.loggedIn) {
            const history = this.props.history;
            history.push('/traits');
        }

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
                    if (result) {
                        login(result);
                    }
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
    const [age, setAge] = useState('');
    return (
        <div className='form-box'>
            <img className='logo' src='/assets/images/logo-color.png' alt='logo'/>

            <form className='auth-form' onSubmit={e => {
                e.preventDefault();
                sendApiRequest(
                    '/register',
                    {
                        email: email,
                        firstName: firstName,
                        lastName: lastName,
                        password: password,
                        birthday: age
                    }
                ).then(result => {
                   switchFormType();
                });
            }}>
                <input type='email' placeholder='Email' value={email} onChange={event => setEmail(event.target.value)}/>
                <input type='text' placeholder='First Name' value={firstName} onChange={event => setFirstName(event.target.value)}/>
                <input type='text' placeholder='Last Name' value={lastName} onChange={event => setLastName(event.target.value)}/>
                <input type='date' placeholder='Birthday' value={age} onChange={event => setAge(event.target.value)}/>
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

const mapDispatchToProps = dispatch => {
    return {
        setUser: (user) => dispatch(setUser(user)),
        setLoggedIn: (loggedIn) => dispatch(setLoggedIn(loggedIn))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationPage);
