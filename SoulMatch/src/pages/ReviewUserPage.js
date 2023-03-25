import React from "react";
import {connect} from "react-redux";
import './../styles/ReviewPage.css';

class ReviewUserPage extends React.Component {

    //checks if you're logged in or not
    state = {
        loaded: false
    }

    //copy paste
    componentDidMount() {
        this.setState({loaded: true});
    }

    //copy paste this onto any page
    render() {
        if (this.state.loaded && this.props.userState.loggedIn) {
            const history = this.props.history;
            history.push('/home');
        }

        return (
            <div className="reviewBackground">
                

                <div className = "homeHeader">
                    <a href="/"><img className = "homeLogo" src="/assets/images/soul-match-logo-updated.png" 
                    alt="SoulMatch Logo"/></a>
                    <nav>
                        <ul>

                            <li><a href="/">Home</a></li>
                            <li><a href="/about">About</a></li>
                            <li><a href="/contact">Contact</a></li>
                        </ul>
                    </nav>
                </div>

                

            </div>
        );
    }
}

//copy paste code into every page
const mapStateToProps = state => {
    return {
        userState: state.user
    };
};
//necessary for exporting to app.js
export default connect(mapStateToProps)(ReviewUserPage);
