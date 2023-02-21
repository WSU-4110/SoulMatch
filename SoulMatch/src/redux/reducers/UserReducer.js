import {createSlice} from "@reduxjs/toolkit";
import {reactLocalStorage} from "reactjs-localstorage";

const initialUserState = {
    loggedIn: false,
    user: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        birthday: '',
        newUser: 'true',
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
    initialState: initialUserState,
    reducers: {
        setLoggedIn: (state, action) => {
            state.loggedIn = action.payload;
            reactLocalStorage.set("loggedIn", action.payload);
        },
        setUser: (state, action) => {
            state.user.id = action.payload.id;
            state.user.firstName = action.payload.firstName;
            state.user.lastName = action.payload.lastName;
            state.user.email = action.payload.email;
            state.user.password = action.payload.password;
            state.user.birthday = action.payload.birthday;
            state.user.newUser = action.payload.newUser;
            state.user.profile = {...action.payload.profile};
            state.user.matchProfile = {...action.payload.matchProfile};

            reactLocalStorage.setObject("user", state.user);
        }
    }
});

export const { setLoggedIn, setUser } = userSlice.actions;
export {initialUserState};
export default userSlice.reducer;