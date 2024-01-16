const router = require("express").Router();
const { getAllUsersCtrl,
     getUserProfileCtrl,
      updateUserProfileCtrl, 
      getUsersCountCtrl, 
      profilePhotoUploadCtrl,
      deleteUserProfileCtrl} = 
      require("../controllers/usersController");
const { verifyTokenAndAdmin,
     verifyTokenAndOnlyUser , 
    verifyToken,
    verifyTokenAndAuthorization, } = 
     require("../middlewares/verifyToken");
const validateObjectId = 
require("../middlewares/validateObjectId");
const photoUpload = require("../middlewares/photoUpload");






// // /api/users/profile
// // ychouf user ken ma3andouch token yrj3lou erreur w getallusercrt mhich bch t5dm 
// //ken user admin yt3da lel middlewares eli b3dou eli hiya getAllUsersCtrl

router.route("/profile")
.get( verifyTokenAndAdmin ,getAllUsersCtrl);







// /api/users/profile/:id

router.route("/profile/:id")
.get(  validateObjectId ,getUserProfileCtrl)
.put( validateObjectId, verifyTokenAndOnlyUser , updateUserProfileCtrl )
.delete(validateObjectId , verifyTokenAndAuthorization , deleteUserProfileCtrl );
// // /api/users/profile/profile-photo-upload
// //single image y3ni tswira whda  

router.route("/profile/profile-photo-upload").post(verifyToken,  photoUpload.single("image"), profilePhotoUploadCtrl);


// // /api/users/count
 router.route("/count").get( verifyTokenAndAdmin , getUsersCountCtrl);



module.exports = router;