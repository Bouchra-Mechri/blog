//les fonctions eli yb3thou requete l serveur lel authslice bch ykounou lena 

import { createSlice } from "@reduxjs/toolkit";



const commentSlice = createSlice({
    name:"comment",
    initialState: {
        comments: [],
    },
    reducers : {
        setComments(state,action) {
            state.comments = action.payload;
        },
        deleteComment(state,action) {
            state.comments = state.comments.filter(c => c._id !== action.payload);
        }

                                            //state ya3ni hedha user a3ml valeur mt3ou bouchra 
        }
    });

    const commentReducer = commentSlice.reducer;
    const commentActions = commentSlice.actions;



    //authReducer feha initialstate w ki n3ml update l state authreducer bch y5dm w nhez kol chy l store 
    export { commentActions , commentReducer}