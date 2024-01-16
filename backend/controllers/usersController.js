const asyncHandler = require("express-async-handler");
const {User, validateUpdateUser} = require("../models/User");
const bcrypt = require("bcryptjs");
const path = require("path"); //path m nodejs 
// fs file systeme m nodejs nfs5 bih files 
const fs =  require("fs"); 
const {cloudinaryUploadImage , cloudinaryRemoveImage , cloudinaryRemoveMultipleImage } = require("../utils/cloudinary");
const { Comment } = require("../models/Comment");
const { Post } = require("../models/Post");

/**---------------------------------------------------
 * @desc Get All Users Profile
 * @route /api/users/profile
 * @method GET
 * @access private (only admin)
 * 
 *--------------------  */

module.exports.getAllUsersCtrl = asyncHandler(async(req, res) => 
{  
    
    const users = await User.find().select("-password").populate("posts"); 
    res.status(200).json(users);
});
















/**---------------------------------------------------
 * @desc  Get User Profile
 * @route /api/users/profile/:id
 * @method GET
 * @access public
 * 
 *--------------------  */

module.exports.getUserProfileCtrl =
 asyncHandler(async(req, res) => 
{  
    
    const user = await User.findById(req.params.id).select("-password").populate("posts"); //a3tini user profile w posts mt3ou 
   if(!user){
    return res.status(404).json({message : "user not found "});
   }

   res.status(200).json(user);
});



/**---------------------------------------------------
 * @desc   Update User Profile
 * @route  /api/users/profile/:id
 * @method PUT
 * @access private (only user himself)
 * 
 *--------------------  */

module.exports.updateUserProfileCtrl = asyncHandler(async(req, res) => 
{  
    
   const {error} = validateUpdateUser(req.body);
   if (error)
   {
    return res.status(400).json({ message : error.details[0].message});
   }
   if (req.body.password){
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
   }


   const updatedUser = await User.findByIdAndUpdate(req.params.id, 
    { 
        $set: {
        username : req.body.username,
        password: req.body.password,
        bio : req.body.bio
    }

    }, //bch n9olou jib user m3a post mt3ou
    { new : true }).select("-password").populate("posts");

    res.status(200).json(updatedUser);
    
});





/**---------------------------------------------------
 * @desc  Get Users Count
 * @route /api/users/count
 * @method GET
 * @access private (only admin)
 * 
 *--------------------  */

module.exports.getUsersCountCtrl =
 asyncHandler(async(req, res) => 
{  
    
    const count = await User.count();
    res.status(200).json(count);
});





/**---------------------------------------------------
 * @desc   Profile Photo Upload
 * @route  /api/users/profile/profile-photo-upload
 * @method POST
 * @access private (only logged in user)
 * 
 *--------------------  */

module.exports.profilePhotoUploadCtrl = 
asyncHandler(async(req, res) => 
{  //1. validation 
    if(!req.file)
    {
        return res.status(400).json({message : ' no file provided'});
    }

    //2. Get the path to the image
    //y5dh image men images folder 
    const imagePath = path.join(__dirname , `../images/${req.file.filename}` );
    
    
    // 3.Upload to cloudinary

    const result = await cloudinaryUploadImage(imagePath);
    console.log(result);
    // 4. Get the user from DB
    //n5dh user m base D
    const user = await User.findById(req.user.id);

    // 5. Delete the old profile photo if exist 
    //ken tswira idpublic mt3ha mhich null y3ni 3andou tswira 
    // y3ni idha yswira id mt3ha mhich null fs5ha 
    if(user.profilePhoto.publicId !== null)
     {
        await cloudinaryRemoveImage(user.profilePhoto.publicId);
     }
    //6. change the profile field in th DB
    // lzm nbdl url mt3 image 9dima b url mt3 image jdida w publicid zeda tetbdl 
   //y5dh url jdida m result 
   //secure url howa lien eli y3tihouli cloud 
   //kol tswira 3andha publicid mel cloud
   //b3d user y3ml save 
     user.profilePhoto = {
     url : result.secure_url,
     publicId : result.public_id,
    }
    await user.save();

    //7. send response to client 
    res.status(200).json({
         message : " your profile photo uploaded successfully" , 
         profilePhoto : { url : result.secure_url, publicId : result.public_id }
        });

     //8. Remove image from the server 
     //unlinksync yfs5 tswr fi nodejs eli n5dhhom m file systeme 

     //lena bch yfs5li tswr mel images folder y3ni serveur mnhbouch yst7fdh b images nhbha toul tmchii lel cloud 
 fs.unlinkSync( imagePath);

 // fi cloud mfs5ch tswira l9dima 5tr publicid mt3ha null 
});


//0. awel haja fi users route fi photoupload multer y3ml upload l image w y5leha fi folder 
//1. theny haja profilephotouploadctrl y3ml validation l image ythbt fi format mt3ha 
//2. n5dh masar images
//3. n3ml upload lel cloudianry b fonction  cloudinary upload image
//4.b3d njib  id user men base bch n3rf anhou user eli yhb y3ml upload lel image   
//5. b3d nchouf ken user 3andou photo 9dima ken 3andouu lzm nfs5ha m cloud
//6.  nbdl tswira mt3 photo de profile b jdida
//7. nb3th res l user
//8 . nfs5 tswira l9dima 






/**---------------------------------------------------
 * @desc   Delete User Profile (Account)
 * @route  /api/users/profile/:id
 * @method  DELETE
 * @access private (only admin or user himself)
 * 
 *--------------------  */

module.exports.deleteUserProfileCtrl = asyncHandler(async(req, res) => 
{  
    
// 1. Get the user from DB
//n5dh user men base 

const user = await User.findById(req.params.id);
if(!user)
{
    return res.status(404).json({message : "user not found"});
}



// 2. Get all posts from DB

const posts = await Post.find({ user : user._id});
// 3. Get the public ids from the posts
//map ymchi ychouf les post lkol w yjibli men kol post post.image.publicId
//? y3ni ynjm ykoun mfmch post 


const PublicIds = posts?.map((post) => post.image.publicId);

// 4. Delete all posts image from cloudinary that belong to this user 
//ynjm ser m3ndou hta post 

if(PublicIds?.length > 0)
{
    await cloudinaryRemoveMultipleImage(PublicIds);
}

// 5.Delete the profile picture from cloudinary
//nsf5 photo de profile mt3 user men cloud idha 3andou profile photo 

if(user.profilePhoto.publicId !== null){
await cloudinaryRemoveImage(user.profilePhoto.publicId);
}


//@TODO  6. Delete user posts & comments
await Post.deleteMany({ user : user._id }); //yfs5 post lkol eli yntami lel user 
await Comment.deleteMany({ user : user._id }); //fas5li comment eli user mt3ou user id 

// 7. Delete the user himself

await User.findByIdAndDelete(req.params.id);

// 8. send a response to the client 

res.status(200).json({ message : " your profile has been deleted"});
});