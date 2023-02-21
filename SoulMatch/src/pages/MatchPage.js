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
            <div className='match-background'>
                {this.state.users.length > 0 && <UserProfile user={this.state.users[0]} onLikeUser={this.likeUser}
                                                             onDislikeUser={this.dislikeUser}/>}

                {this.state.users.length <= 0 && <h1>No more users available, check again later!</h1>}

                <button style={{marginTop: '2rem'}} onClick={e => {
                    e.preventDefault();
                    this.logout();
                }}>Log Out
                </button>
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
                                <div
                                    style={{
                                        backgroundImage: `url(${"http://localhost:8080/files/" + image})`,
                                        width: '100%',
                                        height: '60vh',
                                        backgroundSize: 'contain',
                                        backgroundPosition: 'center',
                                        borderRadius: '4rem',
                                        position: 'relative'
                                    }}
                                />
                            </div>
                        ))}
                    </Fade>
                </div>

                <h2>{user.firstName + " " + user.lastName}</h2>

                <div className='profile-buttons'>
                    <button onClick={e => {
                        onLikeUser(user);
                    }}>Like
                    </button>
                    <button onClick={e => {
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