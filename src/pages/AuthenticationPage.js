import React, {useState} from "react";
import './../styles/AuthenticationPage.css';

class AuthenticationPage extends React.Component {

    state = {
        registerForm: false
    };

    switchFormType = () => {
        const {registerForm} = this.state;
        this.setState({registerForm: !registerForm});
        console.log("Switching form to: " + !registerForm)
    };

    render() {
        const {registerForm} = this.state;

        return (
            <div className='background'>
                {registerForm ? <RegisterForm switchFormType={this.switchFormType}/> :
                    <LoginForm switchFormType={this.switchFormType}/>}
            </div>
        );
    }
}

const LoginForm = ({switchFormType}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className='form-box'>
            <img className='logo' src='/assets/images/logo192.png' alt='logo'/>
            <p className='form-header'>Soul Match</p>

            <form className='auth-form' onSubmit={() => {
                //TODO: Make user login and redirect to main page here instead of debug printing
                console.log(`Logging in user with email: ${email}, password: ${password}`)
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
            <img className='logo' src='/assets/images/logo192.png' alt='logo'/>
            <p className='form-header'>Soul Match</p>

            <form className='auth-form' onSubmit={() => {
                //TODO: Make user register and redirect to main page here instead of debug printing
                console.log(`Registering in user with email: ${email}, password: ${password}, name: ${firstName} ${lastName}`)
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

export default AuthenticationPage;
