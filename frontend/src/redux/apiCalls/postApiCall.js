import { postActions } from "../slices/postSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";




//Fetch Posts Based On Page Number 
export function fetchPosts(pageNumber)
{
    return async (dispatch) => {
        try { 

           const { data } = await request.get(`/api/posts?pageNumber=${pageNumber}`);

            dispatch(postActions.setPosts(data));
       
         } catch (error) {
           toast.error(error.response.data.message);

        }
    };
}



//Get Posts Count 
//y5dh post count m serveur 
export function getPostsCount()
{
    return async (dispatch) => {
        try { 

           const { data } = await request.get(`/api/posts/count`);

            dispatch(postActions.setPostsCount(data));
       
         } catch (error) {
           toast.error(error.response.data.message);

        }
    };
}

//Fetch Posts Based On Category 
//yjibli post hasb category 
export function fetchPostsBasedOnCategory(category)
{
    return async (dispatch) => {
        try { 

           const { data } = await request.get(`/api/posts?category=${category}`);

            dispatch(postActions.setPostsCate(data));
       
         } catch (error) {
           toast.error(error.response.data.message);

        }
    };
}



//Create Post

export function createPost(newPost)
{
    return async (dispatch,getState) => {
        try { 

            dispatch(postActions.setLoading());

           await request.post(`/api/posts`,newPost, {
            headers: {
            Authorization: "Bearer " + getState().auth.user.token,
           "Content-Type" : "multipart/form-data"
            }
           });

            dispatch(postActions.setIsPostCreated()); //y3ml setispostcreated true y3ni 5abeh 7atou fi serveur w lzm b3d y3ml navigate lel home 
       
           //lzm ba3d nrj3ha l false setispostcreated 
           // 2000 y3ni 2 secondes
           setTimeout(() => dispatch(postActions.clearIsPostCreated()), 2000); //2s 


         } catch (error) {
           toast.error(error.response.data.message);
           dispatch(postActions.clearLoading());

        }
    };
}




//Fetch Single Post
//nb3th requete l serveur w yjibli post hasb id 
export function fetchSinglePost(postId) 
{
    return async (dispatch) => {
        try { 

           const { data } = await request.get(`/api/posts/${postId}`);

            dispatch(postActions.setPost(data));
       
         } catch (error) {
           toast.error(error.response.data.message);

        }
    };
}




//Toggle Like Post

export function toggleLikePost(postId) 
{
    return async (dispatch,getState) => {
        try { 
//m3ndich baynet bch nb3thhom l serveur n5li object fergha 
           const { data } = await request.put(`/api/posts/like/${postId}`, {}, {
            headers: {
                Authorization: "Bearer " + getState().auth.user.token,
            }
           });

            dispatch(postActions.setLike(data));
       
         } catch (error) {
           toast.error(error.response.data.message);

        }
    };
}






//Update Post Image

export function updatePostImage(newImage,postId)  //user y3tini new image w post id 
{
    return async (dispatch,getState) => {
        try { 
//m3ndich baynet bch nb3thhom l serveur n5li object fergha 
            await request.put(`/api/posts/update-image/${postId}`, newImage, {
            headers: {
                Authorization: "Bearer " + getState().auth.user.token,
                "Content-Type":"multipart/form-data",
            }
           });

         toast.success("New post image uploaded successfully");
       
         } catch (error) {
           toast.error(error.response.data.message);

        }
    };
}



//Update Post 
//m3ndich baynet bch nb3thhom l serveur n5li object fergha 
export function updatePost(newPost,postId)  //user y3tini new post w post id 
{
    return async (dispatch,getState) => {
        try { 
        const { data } = await request.put(`/api/posts/${postId}`, newPost, {
            headers: {
                Authorization: "Bearer " + getState().auth.user.token,

            }
           });
        dispatch(postActions.setPost(data));
       
         } catch (error) {
           toast.error(error.response.data.message);

        }
    };
}





//Delete Post 

export function deletePost(postId)  //user y3tini new post w post id 
{
    return async (dispatch,getState) => {
        try { 
        const { data } = await request.delete(`/api/posts/${postId}`, {
            headers: {
                Authorization: "Bearer " + getState().auth.user.token,

            }
           });
        dispatch(postActions.deletePost(data.postId));
        toast.success(data.message);
       
         } catch (error) {
           toast.error(error.response.data.message);

        }
    };
}







// Get All Posts 
export function getAllPosts()
{
    return async (dispatch) => {
        try { 

           const { data } = await request.get(`/api/posts`);

            dispatch(postActions.setPosts(data));
       
         } catch (error) {
           toast.error(error.response.data.message);

        }
    };
}
