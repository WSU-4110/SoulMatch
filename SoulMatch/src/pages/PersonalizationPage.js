import React from "react";
import {connect} from "react-redux";
import {setLoggedIn, setUserData} from "../redux/reducers/UserReducer";
import '../styles/PersonalizationPage.css';
import {withRouter} from "react-router-dom";
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
        gender: 'male',
        hobbies: [],
        picture: null,
        profilePictures: []
    };

    componentDidMount() {
        // if (!this.props.userState.loggedIn) {
        //     const history = this.props.history;
        //     history.push('/login');
        // }
    }

    checkInputs = () => {
        const {gender, hobbies, picture, profilePictures} = this.state;
        return gender && hobbies.length > 0 && picture && profilePictures.length > 0;
    };

    render() {
        const {hobbies, picture, gender, profilePictures} = this.state;

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
                            console.log(user)
                            sendApiRequest("/update", user).then(console.log);
                            this.props.setUserData(user);

                        }
                    }}>

                        <div>
                            <label htmlFor="gender">Gender:&nbsp;</label>
                            <select name="gender" id="gender">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
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

export default connect(mapStateToProps, {
    setLoggedIn,
    setUserData
})(withRouter(PersonalizationPage));


// import React, {useState} from "react";
// import './../styles/PersonalizationPage.css';
//
// class PersonalizationPage extends React.Component {
//
//     render() {
//
//         return (
//             <>
//                 <div className="container">
//                     <img className="logo" src="/assets/images/logo192.png" alt="logo"/>
//                     <h1 className="form-header">SoulMatch</h1>
//                 </div>
//
//                 <br></br>
//
//                 <div>
//                     <div>
//                         <GenderDropdown switchFormType/>
//                         <br></br>
//                     </div>
//
//                     <div>
//                         <PreferGenderDropdown switchFormType/>
//                         <br></br>
//                     </div>
//
//                     <div className="form-box">
//                         <label>Select the selfie you would like to upload</label>
//                         <ImageUpload selfie/>
//                         <br></br>
//                     </div>
//
//                     <br></br>
//
//                     <div>
//                         <Hobbies hobby/>
//                         <br></br>
//                     </div>
//                     <input className="submitButton" type="submit" value="Submit"/>
//                 </div>
//
//                 <br></br>
//             </>
//         );
//
//     }
//
// }
//
// const GenderDropdown = () => {
//     const [gender, setGender] = useState('');
//
//
//     return (
//         <div className='form-box'>
//
//             <form onSubmit={() => {
//
//                 console.log(`Setting Gender: ${gender}`)
//             }}>
//                 <label>Select your gender: </label>
//
//                 <select value={gender} onChange={event => setGender(event.target.value)}>
//                     <option value="">-- Select Option --</option>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                     <option value="Non-Binary">Non-Binary</option>
//                     <option value="Transgender Male">Transgender</option>
//                     <option value="Transgender Female">Transgender</option>
//                     <option value="Other">Other</option>
//                 </select>
//
//
//             </form>
//
//
//         </div>
//     );
// };
//
// const PreferGenderDropdown = () => {
//     const [preferGender, setPreferGender] = useState('');
//
//
//     return (
//         <div className='form-box'>
//
//             <form onSubmit={() => {
//
//                 console.log(`Setting preferred gender: ${preferGender}`)
//             }}>
//                 <label>Select the gender you are
//                     looking for in your matches:</label>
//
//                 <select value={preferGender} onChange={event => setPreferGender(event.target.value)}>
//                     <option value="">-- Select Option --</option>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                     <option value="Non-Binary">Non-Binary</option>
//                     <option value="Transgender Male">Transgender</option>
//                     <option value="Transgender Female">Transgender</option>
//                     <option value="Other">Other</option>
//                 </select>
//
//
//             </form>
//
//
//         </div>
//     );
// };
//
// const Hobbies = () => {
//     const [selectedOptions, setHobbies] = useState([]);
//
//     const handleSelectChange = event => {
//         const options = event.target.options;
//         const selectedValues = [];
//
//
//         for (let i = 0; i < options.length; i++) {
//             if (options[i].selected) {
//                 selectedValues.push(options[i].value);
//             }
//         }
//
//         if (selectedValues.length > 3) {
//             alert('You can only select up to 3 options.');
//             event.preventDefault();   //Fix so that you can only pick 3 hobbies
//                                       // and clears the selections
//
//         } else {
//             setHobbies(selectedValues);
//         }
//
//
//     }
//
//     return (
//         <div className="form-box">
//             <label htmlFor="options">Select your hobbies (up to 3)</label>
//             <select id="options" multiple value={selectedOptions} onChange={handleSelectChange}>
//                 <option value="soccer">Soccer</option>
//                 <option value="video_games">Video Games</option>
//                 <option value="working_out">Working Out</option>
//                 <option value="dancing">Dancing</option>
//                 <option value="tennis">Tennis</option>
//             </select>
//             <p>You selected: {selectedOptions.join(', ')}</p>
//         </div>
//     );
// }
//
//
// const ImageUpload = () => {
//     const [image, setImage] = useState();
//     //console.log(image);
//
//     return (
//         <div>
//
//             <input id="imgs" type="file" onChange={(e) => setImage(e.target.files)}/>
//         </div>
//
//     );
// }
//
//
// export default PersonalizationPage
