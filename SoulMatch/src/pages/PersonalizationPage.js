import React from "react";
import {connect} from "react-redux";
import {setLoggedIn, setUser} from "../redux/reducers/UserReducer";
import '../styles/PersonalizationPage.css';
import {uploadPicture} from "../utils/FileUtils";
import {sendApiRequest} from "../utils/ServerUtils";

const HOBBIES = [
    "Traveling",
    "Exercise",
    "Cooking",
    "Pets",
    "Gaming",
    "Sports",
    "Dancing",
    "Clubbing",
    "Music"
];


class Customize extends React.Component {
    checkInputs = () => {
        const {gender, hobbies, picture, profilePictures, score} = this.state;
        return gender && hobbies.length > 0 && picture && profilePictures.length > 0 && score;
    }
    render() {
        return(
            <div>
                <p>Not Implemented</p>
            </div>
        )
    }
}

class PersonalizationPage extends Customize {

    state = {
        loaded: false,
        gender: 'male',
        hobbies: [],
        picture: null,
        profilePictures: [],
        bio: '',
        score: 0
    };

    componentDidMount() {
        this.setState({loaded: true});
    }

    checkInputs = () => {
        const {gender, hobbies, picture, profilePictures, score} = this.state;
        return gender && hobbies.length > 0 && picture && profilePictures.length > 0 && score;
    };

    render() {
        const {hobbies, picture, gender, profilePictures, bio, score} = this.state;
        const history = this.props.history;

        if (this.state.loaded) {
            if (!this.props.userState.loggedIn) {
                history.push('/login');
            } else {
                if (!this.props.userState.user.newUser) {
                    history.push('/home');
                }
            }
        }

        return (
            <div className='content'>

                <div className='personalization'>
                    <form onSubmit={e => {
                        e.preventDefault();

                        if (this.checkInputs) {
                            let user = JSON.parse(JSON.stringify(this.props.userState.user));
                            user.profile.hobbies = hobbies;
                            user.profile.picture = picture;
                            user.profile.gender = gender;
                            user.profile.bio = bio;
                            user.profile.score = score;

                            if (picture) {
                                user.profile.picture = uploadPicture(user.id, picture);
                            }

                            const pictures = [];
                            for (let i = 0; i < profilePictures.length; i++) {
                                pictures[i] = uploadPicture(user.id, profilePictures[i]);
                            }

                            user.profile.profilePictures = pictures;
                            sendApiRequest("/update", user).then(data => {
                                this.props.setUser(data);
                                //history.push("/home");
                            }).catch(console.error);
                        }
                    }}>
                        <div>
                            <label className='custom-select'>
                                <select name="gender" id="gender" onChange={e => {
                                    this.setState({gender: e.target.value})
                                }}>
                                    <option value="disabled" disabled selected>Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="non-binary">Non-Binary</option>
                                    <option value="other">Other</option>
                                </select>
                            </label>
                        </div>

                        <h4 style={{marginBottom: '1rem'}}>Bio:</h4>
                        <textarea name="bio" cols="60" rows="5" value={bio}
                                  onChange={e => this.setState({bio: e.target.value})}></textarea>

                        <h2 style={{marginTop: '3rem'}}>Hobbies</h2>
                        <h4 style={{marginBottom: '1rem'}}>(Select 3)</h4>
                        <div className='hobbies'>
                            {HOBBIES.map(hobby => {
                                const selected = hobbies.includes(hobby);

                                return (
                                    <div key={hobby} className={`hobby ${selected ? 'hobby-selected' : ''}`}
                                         onClick={() => {
                                             if (selected) {
                                                 hobbies.splice(hobbies.indexOf(hobby), 1);
                                                 this.setState({hobbies: hobbies})
                                             } else {
                                                 if (hobbies.length < 3) {
                                                     hobbies.push(hobby);
                                                     this.setState({hobbies: hobbies})
                                                 }
                                             }
                                         }}>
                                        {hobby}
                                    </div>
                                );
                            })}
                        </div>

                        <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                            <div style={{flexDirection: 'row', marginTop: '1rem'}}>
                                <input type='file' id='picture' accept='image/*'
                                       onChange={event => this.setState({picture: event.target.files[0]})}/>
                                <label htmlFor="picture">
                                    Upload Picture
                                </label>
                            </div>

                            <div style={{flexDirection: 'row', marginTop: '1rem'}}>
                                <input type='file' id='profile-picture-0' accept='image/*'
                                       onChange={event => {
                                           let pics = [...this.state.profilePictures];
                                           pics[0] = event.target.files[0];
                                           this.setState({profilePictures: pics})
                                       }}/>
                                <label htmlFor="profile-picture-0">
                                    Upload Profile Picture 1
                                </label>
                            </div>

                            <div style={{flexDirection: 'row', marginTop: '1rem'}}>
                                <input type='file' id='profile-picture-0' accept='image/*'
                                       onChange={event => {
                                           let pics = [...this.state.profilePictures];
                                           pics[1] = event.target.files[0];
                                           this.setState({profilePictures: pics})
                                       }}/>
                                <label htmlFor="profile-picture-1">
                                    Upload Profile Picture 2
                                </label>
                            </div>

                            <div style={{flexDirection: 'row', marginTop: '1rem', marginBottom: '1rem'}}>
                                <input type='file' id='profile-picture-0' accept='image/*'
                                       onChange={event => {
                                           let pics = [...this.state.profilePictures];
                                           pics[2] = event.target.files[0];
                                           this.setState({profilePictures: pics})
                                       }}/>
                                <label htmlFor="profile-picture-2">
                                    Upload Profile Picture 3
                                </label>
                            </div>
                        </div>

                        //SCORE INPUT TEST//
                        <div>
                            <br/>
                            <label className='custom-select'>
                                <select name="score" id="score" onChange={e => {
                                    this.setState({score: e.target.value})
                                }}>
                                    <option value="disabled" disabled selected>Profile Score</option>
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                            </label>
                        </div>

                        <button>Submit</button>
                    </form>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(PersonalizationPage);