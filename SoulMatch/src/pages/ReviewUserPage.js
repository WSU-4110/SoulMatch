import React from "react";
import {connect} from "react-redux";
import './../styles/ReviewPage.css';
import NavbarComponent from "../components/NavbarComponent"; 

class ReviewUserPage extends React.Component {

    //checks if the page is loaded
    state = {
        loaded: false
        //tells the system if it's not loaded that the system is not loaded
    }

    //copy paste. If the page is loaded, it tells the system that the page is loaded
    componentDidMount() {
        this.setState({loaded: true});
    }

    //copy paste this onto any page
    render() {
        // so if the page is loaded and user is not logged in, take them to the login page.
        // and make it so that if they're logged in, they can access the review page.
        if (this.state.loaded && !this.props.userState.loggedIn) {
            const history = this.props.history;
            history.push('/login');
        }

        return (
            //change this name in every page
            <div className="reviewBackground">
                
                <NavbarComponent />
                

                {/* <div className = "homeHeader">
                    <a href="/"><img className = "homeLogo" src="/assets/images/soul-match-logo-updated.png" 
                    alt="SoulMatch Logo"/></a>
                    <nav>
                        <ul>

                            <li><a href="/">Home</a></li>
                            <li><a href="/about">About</a></li>
                            <li><a href="/contact">Contact</a></li>
                        </ul>
                    </nav>
                </div> */}



            </div>
        );
    }
}

//copy paste code into every page. 
// allows the server to access all the user data
const mapStateToProps = state => {
    return {
        userState: state.user
    };
};
//necessary for exporting to app.js
export default connect(mapStateToProps)(ReviewUserPage);
