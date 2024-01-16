import { authActions } from "../slices/authSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";




//request men naw3 axis feha baseURl





//yab3th requete l serveur w y3ml login l user 
//fetch fonction m javascript nb3th beha requete l serveur 
//login yhb meni user 
//stringify y7wl object l json file 
//headers feha nw3iyt les donnees eli bch tetb3th 
// Login User 
//authactions feha action eli yntami lel auth kima login 
//data howa user eli 5dhineh m serveur
//localStorage howa object fi web brawser n5ajen feha data  

//Login User

export function loginUser(user)
{
    return async (dispatch) => {
        try { 

           const { data } = await request.post("/api/auth/login", user);

            dispatch(authActions.login(data));
            localStorage.setItem("userInfo", JSON.stringify(data));
            
        } catch (error) {
           toast.error(error.response.data.message);

        }
    }
}


//n5dh error m serveur 
//log l error bch ykoun fi console 






//Logout User

export function logoutUser()
{
    return (dispatch) => {
        dispatch(authActions.logout());
        localStorage.removeItem("userInfo"); //nfs5 userinfo m localstorage 

    }
}




//Register User

//b3thet requete nhb n3ml register user lzm ykoun feha username password 

//n7eb register y3tini message succef n5dmha b data.message

export function registerUser(user)
{
    return async (dispatch) => {
        try { 

           const { data } = await request.post("/api/auth/register", user);

            dispatch(authActions.register(data.message));

            
        } catch (error) {
           toast.error(error.response.data.message);

        }
    }
}




//Verify Email



export function verifyEmail(userId,token)
{
    return async (dispatch) => {
        try { 

            await request.get(`/api/auth/${userId}/verify/${token}`);

            dispatch(authActions.setIsEmailVerified());

            
        } catch (error) {
           toast.error(error.response.data.message);

        }
    }
}