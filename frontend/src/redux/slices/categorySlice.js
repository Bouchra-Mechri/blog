//les fonctions eli yb3thou requete l serveur lel authslice bch ykounou lena 

import { createSlice } from "@reduxjs/toolkit";



const categorySlice = createSlice({
    
    
    name:"category",
    initialState: {
  categories: [],
    
    
    
    },
    reducers : {
        setCategories(state, action){
            state.categories = action.payload;
        }, 
        addCategory(state, action) {
            state.categories.push(action.payload);
        },
        deleteCategory(state, action) {
            state.categories = state.categories.filter(c => c._id !== action.payload);
        },
                    
        }
    });

    const categoryReducer = categorySlice.reducer;
    const categoryActions = categorySlice.actions;



    //authReducer feha initialstate w ki n3ml update l state authreducer bch y5dm w nhez kol chy l store 
    export { categoryActions , categoryReducer}