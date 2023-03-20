import React from "react";
import {connect} from "react-redux";
import './../styles/HomePage.css';

class AboutPage extends React.Component {

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
                            <li><a href="/about" target="blank">About</a></li>
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
                    <h1>Our Mission</h1>
                    <p>Hello, Augustine here, Founder of Soulmatch. <br/> Our mission here at SoulMatch is to create a dating app that actually works for everyone. <br/> No matter who you are.</p>
                    <img src="https://media.giphy.com/media/X7JROeqSgx4Dbwo053/giphy.gif"></img>
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
export default connect(mapStateToProps)(AboutPage);
