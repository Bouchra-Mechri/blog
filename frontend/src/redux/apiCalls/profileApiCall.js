import { profileActions } from "../slices/profileSlice";
import { authActions } from "../slices/authSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";





//Get User Profile
//id n5dhouha men parametre 
//function tb3th requete l serveur w y5dh user w y3tih lel profile 
export function getUserProfile(userId)
{
    return async (dispatch) => {
        try { 

           const { data } = await request.get(`/api/users/profile/${userId}`);

            dispatch(profileActions.setProfile(data));
       
         } catch (error) {
           toast.error(error.response.data.message);

        }
    };
}







//Upload Profile Photo
//user bch ybdel photo de profile mt3ou 
//bch n9oul l serveur baynet eli bch nb3thhom houma forme data 
// newphoto men nw3 formdata 
export function uploadProfilePhoto(newPhoto)
{
    return async (dispatch,getState) => {
        try { 
            

           const { data } = await request.post(`/api/users/profile/profile-photo-upload`, newPhoto, {
            headers: {
               Authorization: "Bearer " + getState().auth.user.token,
                "Content-Type" : "multipart/form-data"
            }
           });

            dispatch(profileActions.setProfilePhoto(data.profilePhoto)); //y3ml t3dil ala profile w y3tih new profile photo 
            dispatch(authActions.setUserPhoto(data.profilePhoto)); //y3ml t3dil ala user fi auth slice 
            toast.success(data.message);
       

            //modify the user in local stoarge with new photo 
            const user = JSON.parse(localStorage.getItem("userInfo"));//5dhit user m local storage 
            user.profilePhoto = data?.profilePhoto; //3malt t3dil l photo de profile mt3 user 
            localStorage.setItem("userInfo", JSON.stringify(user)); //b3d 3mlt set luser info fi local stoarge 
        
        
        
        } catch (error) {
           toast.error(error.response.data.message);

        }
    };
}







//Update Profile 

export function updateProfile(userId, profile)
{
    return async (dispatch,getState) => {
        try { 
            

           const { data } = await request.put(`/api/users/profile/${userId}`,
            profile,
            {
            headers: {
               Authorization: "Bearer " + getState().auth.user.token,

            },
           }
           );

            dispatch(profileActions.updateProfile(data)); //y3ml t3dil ala profile w y3tih new profile photo 
            dispatch(authActions.setUsername(data.username)); //y3ml t3dil ala user fi auth slice 

       

            //modify the user in local stoarge with new username 
            const user = JSON.parse(localStorage.getItem("userInfo"));//5dhit user m local storage 
            user.username = data?.username; //3malt t3dil l photo de profile mt3 user 
            localStorage.setItem("userInfo", JSON.stringify(user)); //b3d 3mlt set luser info fi local stoarge 
        
        
        
        } catch (error) {
           toast.error(error.response.data.message);

        }
    };
}









//Delete Profile (Account)

export function deleteProfile(userId)
{
    return async (dispatch,getState) => {
        try { 
            
          dispatch(profileActions.setLoading());
           const { data } = await request.delete(`/api/users/profile/${userId}`,

            {
            headers: {
               Authorization: "Bearer " + getState().auth.user.token,

            },
           }
           );

            dispatch(profileActions.setIsProfileDeleted()); //y3ml t3dil ala profile w y3tih new profile photo 
            toast.success(data?.message);
            setTimeout(() => dispatch(profileActions.clearIsProfileDeleted()), 2000);
        
        } catch (error) {
           toast.error(error.response.data.message);
           dispatch(profileActions.clearLoading());

        }
    };
}








//Get Users Count (for admin dashboard)

export function getUsersCount()
{
    return async (dispatch,getState) => {
        try { 
            
    
           const { data } = await request.get(`/api/users/count`,

            {
            headers: {
               Authorization: "Bearer " + getState().auth.user.token,

            },
           }
           );

            dispatch(profileActions.setUserCount(data)); //y3ml t3dil ala profile w y3tih new profile photo 
        
        } catch (error) {
           toast.error(error.response.data.message);

        }
    };
}





//Get All Users Profile (for admin dashboard)

export function getAllUsersProfile()
{
    return async (dispatch,getState) => {
        try { 
            
    
           const { data } = await request.get(`/api/users/profile`,

            {
            headers: {
               Authorization: "Bearer " + getState().auth.user.token,

            },
           }
           );

            dispatch(profileActions.setProfiles(data)); //y3ml t3dil ala profile w y3tih new profile photo 
        
        } catch (error) {
           toast.error(error.response.data.message);

        }
    };
}