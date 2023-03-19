import React from "react";
import {connect} from "react-redux";
import './../styles/HomePage.css';

class ContactPage extends React.Component {

    state = {
        loaded: false
    }

    componentDidMount() {
        this.setState({loaded: true});
    }

    render() {
        if (this.state.loaded && this.props.userState.loggedIn) {
            const history = this.props.history;
            history.push('/home');
        }

        return (
            <div className="backgroundHome">
                

                <div className = "homeHeader">
                    <a href="/"><img className = "homeLogo" src="/assets/images/soul-match-logo-updated.png" 
                    alt="SoulMatch Logo"/></a>
                    <nav>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="https://github.com/WSU-4110/SoulMatch" target="blank">About</a></li>
                            <li><a href="/contact">Contact</a></li>
                        </ul>
                    </nav>

                
                    <div>
                        <div className = 'home-form-button'>
                            <a href="/login">Login</a>
                        </div>
                    </div>

                    
                </div>

                <div className="textContainer">
                    <h1>We'd Love to Hear Back From You</h1>
                    <p>Have some feedback for us? Need help with anything? You've come to the right place.</p>
                </div>

                <div className="contactRow">
                    <div className="contactBox">
                        
                    </div>

                    <div className="contactBox">
                       
                    </div>

                    <div className="contactBox">
                        
                    </div>

                </div>
                
                
            
              
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userState: state.user
    };
};
export default connect(mapStateToProps)(ContactPage);
