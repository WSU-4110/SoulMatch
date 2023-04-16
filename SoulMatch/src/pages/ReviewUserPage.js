import React from "react";
import {connect} from "react-redux";
import './../styles/ReviewPage.css';
import NavbarComponent from "../components/NavbarComponent";

import {Model} from "survey-core";
import { Survey } from 'survey-react-ui';
import 'survey-core/defaultV2.min.css';
import 'survey-core/modern.min.css';

// Questions for review page:
//1. Did this person present themselves like their online profile (flag)
//2. Did this user conduct himself appropriately (flag)
//3. How friendly was this user? 1-10 (averaged and shown on review page)
//4. How engaging was this user on a scale of 1-10 (averaged and shown on review page)
//5. If you met this user, how was your experience from 1-10? (averaged and shown on review)

const survey = {
    "title": "User Rating Survey",
    "description": "Fill out this form of questions to rate your interaction with the user.",
    "elements": [
        {
            "type": "boolean",
            "name": "question1",
            "title": "Did this person present themselves like their online profile?",
            "isRequired": true
        },
        {
            "type": "boolean",
            "name": "question2",
            "title": "Did this user conduct themselves inappropriately?",
            "isRequired": true
        },
        {
            "type": "rating",
            "name": "question3",
            "title": "How friendly was this user on a scale of 1-10, with 10 being the most friendly.",
            "isRequired": true,
            "rateMax": 10
        },
        {
            "type": "rating",
            "name": "question4",
            "title": "How engaging was this user on a scale of 1-10, with 10 being the most engaging.",
            "isRequired": true,
            "rateMax": 10
        },
        {
            "type": "rating",
            "name": "question5",
            "title": "If you met this user, how was your experience on a scale of 1-10, with 10 being the highest.",
            "isRequired": true,
            "rateMax": 10
        }
    ]
};

class ReviewUserPage extends React.Component {

    //checks if the page is loaded
    model = null
    state = {
        loaded: false
        //tells the system if it's not loaded that the system is not loaded
    }

    constructor(props) {
        super(props);
        this.model = new Model(survey);
        this.model.css = {

        };
        this.model.onComplete.add((sender, options) => {
            //TODO: Connect to backend here
            console.log(JSON.stringify(sender.data, null, 3));
        });

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


                <Survey model={this.model} />
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