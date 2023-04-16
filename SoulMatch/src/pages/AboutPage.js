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
                        <a className="home-form-button" href="/login">
                            <button>Login</button>
                        </a>
                    </div>

                    
                </div>

                <div className="textContainer2">
                    <h1>Our Mission</h1>
                    <h3>Hello, Founder of SoulMatch here.</h3>
                    <br/><br/>
                    <p>Our mission at our dating webapp is to create a safe, welcoming,
                    and inclusive space where individuals <br/>can connect with others and form meaningful relationships.
                    We strive to foster a community where<br/> people feel comfortable being themselves and can find partners
                    who share their values, interests, and goals.<br/> Our goal is to use the latest technology to provide a
                    platform that is easy to use, convenient, and effective <br/>in helping our users find love and
                    companionship. We are committed to continuously improving <br/>our service and providing unparalleled
                    customer support to ensure that every user has the best possible experience.
                    <br/><br/>
                    <b>Ultimately, our
                    mission is to help people find happiness and fulfillment in their personal lives by bringing
                    them together in a fun and engaging way.</b>
                    <br/></p>

                       <br/>
                       <br/>
                    {/*<img src="https://media.giphy.com/media/X7JROeqSgx4Dbwo053/giphy.gif"></img>*/}

                    <p> </p>
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