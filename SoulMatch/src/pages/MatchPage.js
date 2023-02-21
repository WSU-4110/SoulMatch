import React, {useState} from "react";
import {setLoggedIn, setUser} from "../redux/reducers/UserReducer";
import {connect} from "react-redux";
import { Fade } from 'react-slideshow-image';
import '../styles/MatchPage.css';
import 'react-slideshow-image/dist/styles.css';

class MatchPage extends React.Component {

    state = {
        loaded: false
    }

    componentDidMount() {
        this.setState({loaded: true});
    }

    render() {
        if (this.state.loaded) {
            const history = this.props.history;
            if (!this.props.userState.loggedIn) {
                history.push('/login');
            }

            if (this.props.userState.user.newUser === 'true') {
                history.push('/traits');
            }
        }

        return (
            <div className='match-background'>
                <UserProfile profile={this.props.userState.user.profile} />
            </div>
        );
    }
}

const UserProfile = ({profile}) => {
    let pictures = [...profile.profilePictures];
    if (profile.picture) {
        pictures.push(profile.picture);
    }

    return (
        <div className='profile'>
            <div className='profile-inner'>

                <div className='slideshow'>
                    <Fade>
                        {pictures.map(image => (
                            <div key={image.toString()}>
                                <img style={{ width: '100%' }} src={"http://localhost:8080/files/" + image} />
                            </div>
                        ))}
                    </Fade>
                </div>

            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MatchPage);