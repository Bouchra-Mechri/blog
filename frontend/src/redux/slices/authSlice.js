//les fonctions eli yb3thou requete l serveur lel authslice bch ykounou lena 

import { createSlice } from "@reduxjs/toolkit";



const authSlice = createSlice({
    
    
    name:"auth",
    initialState: {
        user: localStorage.getItem("userInfo") ? 
        JSON.parse(localStorage.getItem("userInfo")) : null,
        registerMessage: null,
        isEmailVerified: false,
    
    
    
    },
    reducers : {
    //ki n3ml login lzm server y3tina user object eli feha token user name email eli mawjouda fi payload  
            login(state, action) {
                state.user = action.payload; //les donnees eli bch n5dhhom m serveur ykounou fi payload
                state.registerMessage = null;
            },
            logout (state) {
                state.user = null; //les donnees eli bch n5dhhom m serveur ykounou fi payload
            },
            register(state,action)
            {
                state.registerMessage = action.payload;
            },
            setUserPhoto(state,action) {
                state.user.profilePhoto = action.payload; //user bch n3tih photo de profile lt3ou jdida 
            },
            setUsername(state,action) { //5tr nhb nbdl username fi header
                state.user.username = action.payload; //user bch n3tih photo de profile lt3ou jdida 
            },
            setIsEmailVerified(state) {
                state.isEmailVerified = true;
                state.registerMessage = null;
            }
                                           
        }
    });

    const authReducer = authSlice.reducer;
    const authActions = authSlice.actions;



    //authReducer feha initialstate w ki n3ml update l state authreducer bch y5dm w nhez kol chy l store 
    export { authActions , authReducer}