import React, {useState} from "react";
import {setLoggedIn, setUser} from "../redux/reducers/UserReducer";
import {connect} from "react-redux";
import { Fade } from 'react-slideshow-image';
import '../styles/MatchPage.css';
import 'react-slideshow-image/dist/styles.css';
import {sendApiRequest} from "../utils/ServerUtils";

class MatchPage extends React.Component {

    state = {
        loaded: false,
        loadedProfiles: false,
        users: []
    }

    componentDidMount() {
        this.setState({loaded: true});
    }

    likeUser = (user) => {
        sendApiRequest("/matching", {
            userId: this.state.userState.user.id,
            likedUserId: user.id,
            type: "liked"
        }).then(data => {
            this.props.setUser(data);
            const users = this.state.users.filter(u => u.id !== user.id);
            this.setState({users});
        });
    };

    dislikeUser = (user) => {
        sendApiRequest("/matching", {
            userId: this.state.userState.user.id,
            likedUserId: user.id,
            type: "disliked"
        }).then(data => {
            this.props.setUser(data);
            const users = this.state.users.filter(u => u.id !== user.id);
            this.setState({users});
        });
    };

    render() {
        if (this.state.loaded) {
            const history = this.props.history;
            if (!this.props.userState.loggedIn) {
                history.push('/login');
            }

            if (this.props.userState.user.newUser === 'true') {
                history.push('/traits');
            }

            sendApiRequest("/users", this.props.userState.user).then(data => {
                console.log(data);
                this.setState({loadedProfiles: true, users: data});
            });
        }

        return (
            <div className='match-background'>
                {this.state.users.length > 0 && <UserProfile user={this.state.users[0]} onLikeUser={this.likeUser} onDislikeUser={this.dislikeUser} />}
            </div>
        );
    }
}

const UserProfile = ({user, onLikeUser, onDislikeUser}) => {
    let pictures = [...user.profile.profilePictures];
    if (user.profile.picture) {
        pictures.push(user.profile.picture);
    }

    return (
        <div className='profile'>
            <div className='profile-inner'>

                <div className='slide-container'>
                    <Fade>
                        {pictures.map(image => (
                            <div key={image.toString()}>
                                <img style={{ width: '100%', borderRadius: '4rem'}} src={"http://localhost:8080/files/" + image} />
                            </div>
                        ))}
                    </Fade>
                </div>

                <div className='profile-buttons'>
                    <button onClick={e => {onLikeUser();}}>Like</button>
                    <button onClick={e => {onDislikeUser();}}>Dislike</button>
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