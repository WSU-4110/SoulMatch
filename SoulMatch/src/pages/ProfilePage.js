import React from "react";

import {connect} from "react-redux";
import {initialUserState, setLoggedIn, setUser} from "../redux/reducers/UserReducer";
import {reactLocalStorage} from "reactjs-localstorage";

import '../styles/ProfilePage.css';
import NavbarComponent from "../components/NavbarComponent";
import {IMAGES_ENDPOINT, uploadPicture} from "../utils/FileUtils";
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

class ProfilePage extends React.Component {

    state = {
        loaded: false,
        loadedUser: false,
        firstName: '',
        lastName: '',
        birthday: '',
        bio: '',
        saving: false
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
        }

        const {loadedUser, saving, firstName, lastName, birthday, bio, picture} = this.state;
        let user = this.props.userState.user;
        if (!loadedUser) {

            this.setState({
                loadedUser: true,
                firstName: user.firstName,
                lastName: user.lastName,
                birthday: user.birthday,
                bio: user.profile.bio,
                picture: null
            });
        }

        let pictures = [...user.profile.profilePictures];
        if (user.profile.picture) {
            pictures.push(user.profile.picture);
        }

        return (
            <div className='profile-background'>
                <NavbarComponent onLogout={this.logout}/>

                <div className='profile-background-container'>
                    <div className='profile-left-pictures'>
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
                                    marginTop: 12
                                }}
                            >
                                <button className='profile-picture-remove' disabled={user.profile.picture === image && user.profile.profilePictures.length <= 0} onClick={() => {
                                    //TODO: Add endpoint to remove picture
                                    let newUser = {
                                        ...user,
                                        profile: {
                                            ...user.profile,
                                            picture: user.profile.picture,
                                            profilePictures: user.profile.profilePictures
                                        }
                                    };

                                    let picture = user.profile.picture;
                                    let pictures = JSON.parse(JSON.stringify(user.profile.profilePictures));

                                    if (picture === image) {
                                        picture = pictures[0];
                                        pictures.splice(0, 1);
                                    }else {
                                        pictures.splice(pictures.indexOf(image), 1);
                                    }

                                    newUser.profile.picture = picture;
                                    newUser.profile.profilePictures = pictures;

                                    this.setState({saving: true});

                                    sendApiRequest("/update", newUser).then(data => {
                                        this.props.setUser(data);
                                        this.setState({saving: false});
                                    }).catch(console.error);

                                }}>X
                                </button>
                            </div>
                        ))}

                        {pictures.length < 4 &&
                            <form className='profile-add-picture' style={{marginTop: pictures.length >= 1 ? 12 : 0}} onSubmit={e => {
                                e.preventDefault();
                            }}>
                                <label className='select-file-label' style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <p>{picture ? picture.name : 'Select a picture'}</p>
                                    <input disabled={picture != null} style={{ display: 'none' }} type='file' id='picture-upload-profile' accept='image/*'
                                           onChange={event => {
                                               this.setState({picture: event.target.files[0], saving: true});

                                               uploadPicture(user.id, event.target.files[0]).then((resultPic) => {
                                                   const newUser = {
                                                       ...user,
                                                       profile: {
                                                           ...user.profile,
                                                           profilePictures: [
                                                               ...user.profile.profilePictures,
                                                               resultPic
                                                           ]
                                                       }
                                                   };

                                                   sendApiRequest("/update", newUser).then(data => {
                                                       this.props.setUser(data);
                                                       this.setState({saving: false, picture: null});
                                                   }).catch(console.error);
                                               });
                                           }}/>
                                </label>
                            </form>
                        }
                    </div>

                    <div className='profile-right-information'>
                        <h1 className='profile-right-title'>Profile Information</h1>
                        <form className='profile-right-form' onSubmit={e => {
                            e.preventDefault();
                            const newUser = {
                                ...user,
                                firstName,
                                lastName,
                                birthday,
                                profile: {
                                    ...user.profile,
                                    bio
                                }
                            };

                            this.setState({saving: true});
                            sendApiRequest("/update", newUser).then(data => {
                                this.props.setUser(data);
                                this.setState({saving: false});
                            }).catch(console.error);
                        }}>
                            <input type='text' placeholder='First Name' value={firstName}
                                   onChange={event => this.setState({firstName: event.target.value})}/>
                            <input type='text' placeholder='Last Name' value={lastName}
                                   onChange={event => this.setState({lastName: event.target.value})}/>
                            <input type='text' placeholder='Birthday' value={birthday}
                                   onChange={event => this.setState({birthday: event.target.value})}/>

                            <textarea name="bio" cols="60" rows="5" value={bio}
                                      onChange={e => this.setState({bio: e.target.value})}></textarea>

                            <button disabled={saving}>Save</button>
                        </form>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
