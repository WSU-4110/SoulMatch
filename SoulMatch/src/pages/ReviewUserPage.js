import React from "react";
import {connect} from "react-redux";
import './../styles/ReviewPage.css';
import NavbarComponent from "../components/NavbarComponent"; 

// Questions for review page:
//1. Did this person present themselves like their online profile (flag)
//2. Did this user conduct himself appropriately (flag)
//3. How friendly was this user? 1-10 (averaged and shown on review page)
//4. How engaging was this user on a scale of 1-10 (averaged and shown on review page)
//5. If you met this user, how was your experience from 1-10? (averaged and shown on review)


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
