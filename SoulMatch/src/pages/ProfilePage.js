import React, {useState} from "react";
import {initialUserState, setLoggedIn, setUser} from "../redux/reducers/UserReducer";
import {reactLocalStorage} from "reactjs-localstorage";
import {sendApiRequest} from "../utils/ServerUtils";
import {IMAGES_ENDPOINT} from "../utils/FileUtils";
import {connect} from "react-redux";
import '../styles/ProfilePage.css';
import NavbarComponent from "../components/NavbarComponent";

class ProfilePage extends React.Component {
    state = {
        loaded: false,
        loadedProfiles: false,
        users: [],
        report: false
    }

    componentDidMount() {
        this.setState({loaded: true});
    }

    logout = () => {
        this.props.setUser(initialUserState);
        this.props.setLoggedIn(false);
        reactLocalStorage.remove("user");
        reactLocalStorage.remove("loggedIn");
    };

    render() {
        const history = this.props.history;
        if (this.state.loaded) {
            if (!this.props.userState.loggedIn) {
                history.push('/login');
            }

            if (this.props.userState.user.newUser) {
                history.push('/traits');
            }

            //Deleted code might need later
        }

        return(
            <div className="match-background2">
                
            </div>
        )
    }
}


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

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);