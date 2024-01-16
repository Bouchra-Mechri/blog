

import { createSlice } from "@reduxjs/toolkit";

//mra loula profile null ba3d ki n3ml get l user m serveur nedi lel methode setprofile w y3ml t3dil lel profile 
// state.profile.profile photo bch y5dh taswira jdida m serveur 
const postSlice = createSlice({
    
    
    name: "post",
    initialState: {
        posts: [], //n5dh post m serveur w n5zenha lena 
        postsCount: null, //9adech 3andi men post fi database 
        postsCate: [], //post categories n5zen feha post hasb categories 
        loading: false, //serveur y3ml create l new post w y3tini jaweb
        isPostCreated: false, //w ki yjini jaweb m serveur n3ml navigate m create post page l home page 
        post: null,
    },
    reducers: {
        setPosts(state, action ){
            state.posts = action.payload;
        },
        setPostsCount(state, action ){
            state.postsCount = action.payload;
        },
        setPostsCate(state, action ){
            state.postsCate = action.payload;
        },
        setLoading(state) {
            state.loading = true;
        },
        clearLoading(state) {
            state.loading = false;
        },
       setIsPostCreated(state){
        state.isPostCreated = true;
        state.loading = false;      
           },

           clearIsPostCreated(state) {
            state.isPostCreated = false;
           },
           setPost(state,action) {
            state.post = action.payload; //action payload ykoun feha post m serveur w y3tih state.post 
           },
           setLike(state,action) {
            state.post.likes = action.payload.likes;
           },
           deletePost(state,action) {
            state.posts = state.posts.filter(p => p._id !== action.payload);
           },
           addCommentToPost(state,action) {
            state.post.comments.push(action.payload);
           },
           updateCommentPost(state,action)
           {
            state.post.comments = state.post.comments.map(comment =>
                comment._id === action.payload._id ? action.payload : comment 
                )
           },
           deleteCommentFromPost(state, action) {
            // mra loula y5dh comment men array ba3d y5dh index mt3 comment w ba3d yfs5 comment hasb index 
            
            const comment = state.post.comments.find(c => c._id === action.payload);
            const commentIndex = state.post.comments.indexOf(comment);

            state.post.comments.splice(commentIndex, 1);
 
           }
                        
        },
    });

    //nzid comment eli fi database l comment array 
    //push methode m javascrpit yzid valeur l array 
    const postReducer = postSlice.reducer;
    const postActions = postSlice.actions;



    //authReducer feha initialstate w ki n3ml update l state authreducer bch y5dm w nhez kol chy l store 
    export { postActions , postReducer};