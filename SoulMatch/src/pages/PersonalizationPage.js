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

class PersonalizationPage extends React.Component {

    state = {
        loaded: false,
        gender: 'male',
        hobbies: [],
        picture: null,
        profilePictures: []
    };

    componentDidMount() {
        this.setState({loaded: true});
    }

    checkInputs = () => {
        const {gender, hobbies, picture, profilePictures} = this.state;
        return gender && hobbies.length > 0 && picture && profilePictures.length > 0;
    };

    render() {
        const {hobbies, picture, gender, profilePictures} = this.state;
        const history = this.props.history;

        if (this.state.loaded) {
            if (!this.props.userState.loggedIn) {
                history.push('/login');
            }else {
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
                            let user = this.props.userState.user;

                            user.profile.hobbies = hobbies;
                            user.profile.picture = picture;
                            user.profile.gender = gender;

                            user.profile.picture = uploadPicture(user.id, picture);

                            const pictures = [];
                            for (let i = 0; i < profilePictures.length; i++) {
                                pictures[i] = uploadPicture(user.id, profilePictures[i]);
                            }

                            user.profile.profilePictures = pictures;
                            sendApiRequest("/update", user).then(console.log);
                            this.props.setUser(user);

                        }
                    }}>

                        <div>
                            <label htmlFor="gender">Gender:&nbsp;</label>
                            <select name="gender" id="gender">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="non-binary">Non-Binary</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

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

                        <div>
                            <input type='file' id='contained-button-file' accept='image/*' onChange={event => this.setState({picture: event.target.files[0]})} />
                        </div>

                        <button>Submit</button>
                        <p>Theres still a lot to do on this page, for now this is the base, dont mess with it please</p>
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