import { createSlice } from "@reduxjs/toolkit";



const passwordSlice = createSlice({
    
    
    name:"password",
    initialState: {

    isError: false,
    
    
    },
    reducers: {
    setError(state) {
        state.isError=true;
    },
                    
        }
    });


    const passwordReducer = passwordSlice.reducer;
    const passwordActions = passwordSlice.actions;



    //authReducer feha initialstate w ki n3ml update l state authreducer bch y5dm w nhez kol chy l store 
    export { passwordActions , passwordReducer}