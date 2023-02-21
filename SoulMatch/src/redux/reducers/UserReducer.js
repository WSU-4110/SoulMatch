import {createSlice} from "@reduxjs/toolkit";

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

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setLoggedIn: (state, action) => {
            state.loggedIn = action.payload;
        },
        setUser: (state, action) => {
            state.user.id = action.payload.id;
            state.user.firstName = action.payload.firstName;
            state.user.lastName = action.payload.lastName;
            state.user.email = action.payload.email;
            state.user.password = action.payload.password;
            state.user.birthday = action.payload.birthday;
            state.user.newUser = action.payload.newUser;
            state.user.profile = {...JSON.parse(JSON.stringify(action.payload.profile))};
            state.user.matchProfile = {...JSON.parse(JSON.stringify(action.payload.matchProfile))};
        }
    }
});

export const { setLoggedIn, setUser } = userSlice.actions;
export default userSlice.reducer;