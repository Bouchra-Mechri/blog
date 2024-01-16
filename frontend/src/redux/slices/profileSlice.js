

import { createSlice } from "@reduxjs/toolkit";

//mra loula profile null ba3d ki n3ml get l user m serveur nedi lel methode setprofile w y3ml t3dil lel profile 
// state.profile.profile photo bch y5dh taswira jdida m serveur 
const profileSlice = createSlice({
    
    
    name: "profile",
    initialState: {
        profile: null,
        loading: false,
        isProfileDeleted: false,
        usersCount: null,
        profiles: [],


    },
    reducers : {
        setProfile(state,action) {
            state.profile = action.payload;
        },
        setProfilePhoto(state,action) {
            state.profile.profilePhoto = action.payload;
        },

        updateProfile(state,action) {
            state.profile = action.payload;
        },
        setLoading(state) {
            state.loading = true;
        },
        clearLoading(state) {
            state.loading = false;
        },
        setIsProfileDeleted(state)
        {
            state.isProfileDeleted = true;
            state.loading = false;
        },
        clearIsProfileDeleted(state)
        {
            state.isProfileDeleted = false;
          
        },
        setUserCount(state,action) {
            state.usersCount = action.payload;
        },
        setProfiles(state,action)
        {
            state.profiles = action.payload;
        }
                        
        },
    });

    const profileReducer = profileSlice.reducer;
    const profileActions = profileSlice.actions;



    //authReducer feha initialstate w ki n3ml update l state authreducer bch y5dm w nhez kol chy l store 
    export { profileActions , profileReducer}