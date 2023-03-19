import React from "react";
import {initialUserState, setLoggedIn, setUser} from "../redux/reducers/UserReducer";
import {connect} from "react-redux";
import {Fade} from 'react-slideshow-image';
import '../styles/MatchPage.css';
import 'react-slideshow-image/dist/styles.css';
import {sendApiRequest} from "../utils/ServerUtils";
import {reactLocalStorage} from "reactjs-localstorage";

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
            userId: this.props.userState.user.id,
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
            userId: this.props.userState.user.id,
            likedUserId: user.id,
            type: "disliked"
        }).then(data => {
            this.props.setUser(data);
            const users = this.state.users.filter(u => u.id !== user.id);
            this.setState({users});
        });
    };

    logout = () => {
        this.props.setUser(initialUserState);
        this.props.setLoggedIn(false);
        reactLocalStorage.remove("user");
        reactLocalStorage.remove("loggedIn");
    };

    render() {
        if (this.state.loaded) {
            const history = this.props.history;
            if (!this.props.userState.loggedIn) {
                history.push('/login');
            }

            if (this.props.userState.user.newUser) {
                history.push('/traits');
            }

            if (!this.state.loadedProfiles) {
                sendApiRequest("/users", this.props.userState.user).then(data => {
                    this.setState({loadedProfiles: true, users: data});
                });
            }
        }

        return (
            <div className='match-background2'>
                {this.state.users.length <= 0 && <h1>No more users available, check again later!</h1>}
                {this.state.users.length > 0 && <UserProfile user={this.state.users[0]} onLikeUser={this.likeUser}
                                                              onDislikeUser={this.dislikeUser}/>}

                <button className='logout-button' onClick={e => {
                    e.preventDefault();
                    this.logout();
                }}>Log Out
                </button>
            </div>
        );
    }
}

const UserProfile = ({user, onLikeUser, onDislikeUser}) => {
    const gender = user.profile.gender.charAt(0).toUpperCase() + user.profile.gender.slice(1);
    let pictures = [...user.profile.profilePictures];
    if (user.profile.picture) {
        pictures.push(user.profile.picture);
    }

    return (
        <div className='profile2'>
            <div className='profile-pictures'>
                {pictures.map(image => (
                    <div
                        key={image.toString()}
                        style={{
                            backgroundImage: `url(${"http://localhost:8080/files/" + image})`,
                            width: '180px',
                            height: '300px',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            borderRadius: '1rem',
                            margin: '8px'
                        }}
                    />
                ))}
            </div>

            <div className='profile-info'>
                <div className='profile-info-bg'><h2>{user.firstName + " " + user.lastName}</h2></div>
                <div className='profile-info-bg'><h3>Birthday: {user.birthday}</h3></div>
                <div className='profile-info-bg'><h3>Gender: {gender}</h3></div>

                <div className='profile-info-bg'><h3>Profile Score: {user.profile.score}</h3></div>

                <h2 style={{marginTop: '1rem'}}>Hobbies:</h2>
                <div className='profile-hobbies'>
                    {user.profile.hobbies.map(hobby => (
                        <div key={hobby.toString()} className='profile-hobby'>
                            <p>{hobby}</p>
                        </div>
                    ))}
                </div>

                <h2 style={{marginTop: '1rem'}}>Bio:</h2>
                <div className='profile-bio'><p>{user.profile.bio}</p></div>

                <div className='profile-buttons'>
                    <button className='profile-button' onClick={e => {
                        onLikeUser(user);
                    }}>Like
                    </button>
                    <button className='profile-button' onClick={e => {
                        onDislikeUser(user);
                    }}>Dislike
                    </button>
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