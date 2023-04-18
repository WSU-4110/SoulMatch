import React, {useState} from "react";
import {initialUserState, setLoggedIn, setUser} from "../redux/reducers/UserReducer";
import {reactLocalStorage} from "reactjs-localstorage";
import {sendApiRequest} from "../utils/ServerUtils";
import {IMAGES_ENDPOINT} from "../utils/FileUtils";
import {connect} from "react-redux";
import '../styles/MatchPage.css';
import NavbarComponent from "../components/NavbarComponent";

import {FaHeart, FaTrash, FaFlag, FaFacebookMessenger, FaReadme} from "react-icons/fa";

class MatchPage extends React.Component {

    state = {
        loaded: false,
        loadedProfiles: false,
        users: [],
        report: false
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
        const history = this.props.history;
        if (this.state.loaded) {
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
                <NavbarComponent onLogout={this.logout}/>
                {this.state.report && <Report closeReport={() => this.setState({report: false})}/>}

                {this.state.users.length <= 0 && <h1>No more users available, check again later!</h1>}
                {this.state.users.length > 0 &&
                    <UserProfile
                        user={this.state.users[0]}
                        onLikeUser={this.likeUser}
                        onDislikeUser={this.dislikeUser}
                        onReport={() => this.setState({report: true})}
                        onMessage={() => history.push('/message')}
                        onReview={() => history.push({ pathname: '/review', state: { reviewedId: this.state.users[0].id } })}
                    />
                }
            </div>
        );
    }
}

const UserProfile = ({user, onLikeUser, onDislikeUser, onMessage, onReport, onReview}) => {
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
                            backgroundImage: `url(${IMAGES_ENDPOINT + image})`,
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
                    <button
                        className='profile-button'
                        style={{
                            backgroundColor: '#f3006b'
                        }}
                        onClick={e => {
                            onLikeUser(user);
                        }}><FaHeart/>
                    </button>

                    <button
                        className='profile-button'
                        style={{
                            backgroundColor: '#1b7ed2'
                        }}
                        onClick={e => {
                            onDislikeUser(user);
                        }}><FaTrash/>
                    </button>

                    <button
                        className='profile-button'
                        style={{
                            backgroundColor: '#3ec01b'
                        }}
                        onClick={e => {
                            onMessage();
                        }}><FaFacebookMessenger/>
                    </button>

                    <button
                        className='profile-button'
                        style={{
                            backgroundColor: '#ff6c6c'
                        }}
                        onClick={e => {
                            onReport();
                        }}><FaFlag/>
                    </button>

                    <button
                        className='profile-button'
                        style={{
                            backgroundColor: '#FF0000'
                        }}
                        onClick={e => {
                            onReview();
                        }}><FaReadme/>
                    </button>
                </div>
                <br/>
                 <div className='profile-reviews'>
                                <h2>Reviews:</h2>
                                <div className='profile-review'>
                                    <h3>Review 1:</h3>
                                    <p>{user.profile.getReviewAns1}</p>
                                </div>
                                <div className='profile-review'>
                                    <h3>Review 2:</h3>
                                    <p>{user.profile.getReviewAns2}</p>
                                </div>
                                <div className='profile-review'>
                                    <h3>Review 3:</h3>
                                    <p>{user.profile.getReviewAns3}</p>
                                </div>
                                <div className='profile-review'>
                                    <h3>Review 4:</h3>
                                    <p>{user.profile.getReviewAns4}</p>
                                </div>
                                <div className='profile-review'>
                                    <h3>Review 5:</h3>
                                    <p>{user.profile.getReviewAns5}</p>
                                </div>
                            </div>
            </div>
        </div>
    );
};

const Report = ({closeReport}) => {
    const [reportReason, setReportReason] = useState("");

    return (
        <div className='report-body' onClick={e => {
            closeReport();
        }}>
            <div className='report' onClick={e => e.stopPropagation()}>
                <form className='report-form' onClick={e => {
                    e.preventDefault();
                    console.log("TODO: Make reporting work");
                }}>

                    <h3 style={{marginBottom: '1rem'}}>Report Reason:</h3>

                    <textarea style={{resize: 'none'}} name="report" cols="50" rows="10" value={reportReason}
                              onChange={e => setReportReason(e.target.value)}></textarea>
                    <button className='report-button'>Submit</button>
                </form>
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