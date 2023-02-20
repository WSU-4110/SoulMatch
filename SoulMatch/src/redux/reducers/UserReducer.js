const SET_USER = 'SET_USER';
const SET_LOGGED_IN = 'SET_LOGGED_IN';

const initialState = {
    loggedIn: false,
    user: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        birthday: '',
        newUser: true,
        profile: {
            gender: '',
            bio: '',
            picture: '',
            profilePictures: [],
            hobbies: []
        },
        matchProfile: {
            likedUsers: [],
            matchedUsers: []
        }
    }
};

const setUserData = (userData) => {
    return {
        type: SET_USER,
        payload: userData
    }
};

const setLoggedIn = (loggedIn) => {
    return {
        type: SET_LOGGED_IN,
        payload: loggedIn
    }
};

export default function(state = initialState, action) {
    let newState = {
        ...state,
        user: {
            ...state.user
        }
    };

    switch (action.type) {
        case SET_LOGGED_IN:
            newState.loggedIn = action.payload;

            return newState;
        case SET_USER:
            newState.user.id = action.payload.id;
            newState.user.firstName = action.payload.firstName;
            newState.user.lastName = action.payload.lastName;
            newState.user.email = action.payload.email;
            newState.user.password = action.payload.password;
            newState.user.birthday = action.payload.birthday;
            newState.user.newUser = action.payload.newUser;
            newState.user.profile = {...action.payload.profile};
            newState.user.matchProfile = {...action.payload.matchProfile};

            return newState;
        default:
            return state;
    }
}

export {SET_USER, SET_LOGGED_IN, setUserData, setLoggedIn};