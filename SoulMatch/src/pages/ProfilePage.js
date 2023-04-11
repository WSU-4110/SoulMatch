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
                <NavbarComponent onLogout={this.logout}/>

                
            </div>
        )
    }
}

const UserProfile = ({user}) => {
    const gender = user.profile.gender.charAt(0).toUpperCase() + this.user.profile.gender.slice(1);
    let pictures = [...this.user.profile.profilePictures];
    if (this.user.profile.picture) {
        pictures.push(this.user.profile.picture);
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
                <div className='profile-info-bg'><h2>{this.user.firstName + " " + this.user.lastName}</h2></div>
                <div className='profile-info-bg'><h3>Birthday: {this.user.birthday}</h3></div>
                <div className='profile-info-bg'><h3>Gender: {gender}</h3></div>

                <h2 style={{marginTop: '1rem'}}>Hobbies:</h2>
                <div className='profile-hobbies'>
                    {user.profile.hobbies.map(hobby => (
                        <div key={this.hobby.toString()} className='profile-hobby'>
                            <p>{this.hobby}</p>
                        </div>
                    ))}
                </div>

                <h2 style={{marginTop: '1rem'}}>Bio:</h2>
                <div className='profile-bio'><p>{this.user.profile.bio}</p></div>

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

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);