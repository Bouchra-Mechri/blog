const fs = require("fs");
const path = require("path");
const asyncHandler = require("express-async-handler");
const { Post , validateCreatePost , validateUpdatePost } = require("../models/Post");
const { cloudinaryUploadImage, cloudinaryRemoveImage} = require ("../utils/cloudinary");
const { Comment } = require("../models/Comment");

/**---------------------------------------------------
 * @desc  Create New Post
 * @route /api/posts
 * @method POST
 * @access private (only logged in user)
 * 
 *--------------------  */
module.exports.createPostCtrl 
= asyncHandler(async(req,res) => 
{  
    
 //1. validation for image
 //lzm user y3tini image w ken req mhich file erreur
 if (!req.file)
 {
    return res.status(400).json({ message : " no image provided "});
 }
 // 2. validation for data 
 const {error} = validateCreatePost(req.body);
 if(error)
 {
    return res.status(400).json({ message : error.details[0].message});
 }
 //3. upload photo 

 const imagePath = path.join(__dirname,  `../images/${req.file.filename}`);
 const result = await cloudinaryUploadImage(imagePath);
 // 4. create new post and save it to DB
 // btari9a hedhi mch lzm n7ot save howa y3ml whdou 
 const post = await Post.create({ 
   
   title : req.body.title,
   description : req.body.description,
   category: req.body.category,
   user : req.user.id, // lzm n3rf anhou user eli yhb y3ml post 
   image: {
   url: result.secure_url, //url n5dhha men cloudiary 
   publicId : result.public_id,
   }
 });
 // 5. send response to the client 

 res.status(201).json(post);
 // 6. remove image from the server 
 fs.unlinkSync(imagePath);
});










/**---------------------------------------------------
 * @desc  Get All Posts
 * @route /api/posts
 * @method GET
 * @access public
 * 
 *-----------------------------------------------------*/


//n7b n3ti lel user post hasb category 
//lzm user yb3thli category number ka query
module.exports.getAllPostsCtrl = asyncHandler(async (req, res) => {
   const POST_PER_PAGE = 3; //kol saf7a nhb nb3th feha 3 post 
   const { pageNumber, category} = req.query; //query ykoun page number w category 
   let posts ;

   //idha 3andi page number .find bch yjibli les post lkol 
   //7aseb page number yb3thli donnees w kol saf7a 3 post 
   if(pageNumber) {
      posts = await Post.find()
      .skip((pageNumber - 1 ) * POST_PER_PAGE) //ken page 1 y3tini post 123 ken page 2 y3ml skip ybda m 456 
      .limit(POST_PER_PAGE)
      .sort({ createdAt : -1 })
      .populate("user" , ["-password"]); //n3tih post 456 lel page 2 
   }
    else if (category ) 
    {   //ken client yhb post hasb category 
      posts = await Post.find({ category }).sort({ createdAt : -1 })
      .populate("user" , ["-password"]);
   }
   else
    { //ken mch 3atini la page number la category n3tih les post kol 
      posts = await Post.find().sort({ createdAt : -1 })//ywali post jdid howa yo5rj loul 
      .populate("user" , ["-password"]);} //populate yjib les information mt3 user b details men collection users ela password 
   res.status(200).json(posts);
});








/**---------------------------------------------------
 * @desc  Get Single Post
 * @route /api/posts/:id
 * @method GET
 * @access public
 * 
 *-----------------------------------------------------*/

//n5dh post hasb id 

//.populate({path:"comments",model:Comment});

module.exports.getSinglePostsCtrl = asyncHandler(async (req, res) => {
   
   const post = await Post.findById(req.params.id).populate("user", ["-password"]).populate("comments");

   if(!post)
   {
      return res.status(404).json({ message : 'post not found '});

   }


   
   res.status(200).json(post);
});


      
    
  


   
   
/**---------------------------------------------------
 * @desc  Get Single Count
 * @route /api/posts/count
 * @method GET
 * @access public
 * 
 *-----------------------------------------------------*/

//n5dh post hasb id 

module.exports.getPostCountCtrl = asyncHandler(async (req, res) => {
   
   const count = await Post.count(); //count ymch l database ychouf 9adch men post 3andi 
   res.status(200).json(count);
});




/**---------------------------------------------------
 * @desc  Delete Post
 * @route /api/posts/:id
 * @method DELETE
 * @access private (only admin or owner of the post)
 * 
 *-----------------------------------------------------*/


module.exports.deletePostCtrl = asyncHandler(async (req, res) => {
   const post = await Post.findById(req.params.id); //n5dh post men database hasb id 
   if(!post)
   {
      return res.status(404).json({message : "post not found"});
   }


   //y3ni idha poste mt3 user shih ynjm yfs5ou wala ykoun admin zeda ynjm yfs5ou 
//to string n7wl object id l to string 
if(req.user.isAdmin || req.user.id === post.user.toString())
{
   await Post.findByIdAndDelete(req.params.id); //id mt3 post t5dhha men params 
   //lzmni nfs5 zeda image mt3 post eli mawjouda fi cloud 

   await cloudinaryRemoveImage(post.image.publicId);


   // @TODO - Delete all comments that belong to this post 
   //ki nams7 post lzm comments ytfs5ou zeda 
   await Comment.deleteMany({ postId : post._id });









   // lzm zeda lena nfs5 comments bch n5dmha ba3d 

   res.status(200).json(
      {
         message: "post has been deleted successfuly",
         postId : post._id
      });
} //idha user mhouch admin w post mch mt3ou 
else
{
   res.status(403).json({ message : "access denied , forbidden"});

}

 
});












/**---------------------------------------------------
 * @desc  Update Post
 * @route /api/posts/:id
 * @method PUT
 * @access private (only owner of the post)
 * 
 *---------------------------------------------------*/




module.exports.updatePostCtrl = asyncHandler(async (req, res) =>
{ 
   // 1.validation 
   const { error } = validateUpdatePost(req.body);
   if( error ) {
      return res.status(400).json({ message : error.details[0].message });
   }
   

   //2. Get the post from DB and check if post exist 

   const post = await Post.findById(req.params.id);
   if(!post)
   {
      return res.status(404).json({ message : ' post not found '});
   }

   //3. check if this post belong to logged in user 
   //nchouf post mt3 user hedha wle 

   if(req.user.id !== post.user.toString())
   {
      return res.status(403).json({ message : ' access denied , you are not allowed '});
   }

   //4. Update post

   const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
      $set : {
         title : req.body.title,
         description : req.body.description,
         category: req.body.category
      }
   }, { new : true }).populate("user" , [ " -password"])

   //5. send response to the client 
   res.status(200).json(updatedPost);

});











/**---------------------------------------------------
 * @desc  Update Post Image
 * @route /api/posts/upload-image/:id
 * @method PUT
 * @access private (only owner of the post)
 * 
 *---------------------------------------------------*/




module.exports.updatePostImageCtrl = asyncHandler(async (req, res) =>
{ 
   // 1.validation 
   // idha requete mfihech file 
   if( !req.file )
   {
      return res.status(400).json({ message : " no image provided "});
   }
   

   //2. Get the post from DB and check if post exist 

   const post = await Post.findById(req.params.id);
   if(!post)
   {
      return res.status(404).json({ message : ' post not found '});
   }

   //3. check if this post belong to logged in user 
   //nchouf post mt3 user hedha wle 

   if(req.user.id !== post.user.toString())
   {
      return res.status(403).json({ message : 'access denied , you are not allowed '});
   }
//bch n3ml update l tswira lzm nfs5 l9dima 
   //4. delete the old image

   await cloudinaryRemoveImage(post.image.publicId);

 

   //5. upload new photo
   const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
   const result = await cloudinaryUploadImage(imagePath);


   //result bch y3tini url mt3 tswira lzm nbdlha fi base fi base 
   //6. update the image field in the db 

   const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
      $set : {
         image : {
         url : result.secure_url,
         publicId: result.public_id,
       }
      }
   }, { new : true });

   //7. send response to client 

   res.status(200).json(updatedPost);

   //8. remove image from the server

   fs.unlinkSync(imagePath);

});




/**---------------------------------------------------
 * @desc   Toggle Like
 * @route /api/posts/like/:id
 * @method PUT
 * @access private (only logged in user)
 * 
 *---------------------------------------------------*/
// user bch y3ml like lel post 

module.exports.toggleLikeCtrl = asyncHandler(async (req,res) => 
{  
   
   const loggedInUser = req.user.id;
   const { id: postId } = req.params; //id mt3 post 
 

   //user eli y3ml like n7otou fi likes array 
   let post = await Post.findById(postId);
   if(!post)
   {
      return res.status(404).json({ message : " post not found "});
   }

//nchouf ken like m7touta fi likes array 
//find ymchi lel likes array w ychouf id user yousewi id likes y3ni mwjoud fi array 
  

const isPostAlreadyLiked = post.likes.find(
   (user) => user.toString() === loggedInUser); //n7wlha l tostring 5tr object id 



   //ken 3aml like n5lih si non n7ih 

   //ken 3aml like y3ni mwjoud fi likes array 

if(isPostAlreadyLiked)
{

   //findbyidandupdate yjib id mt3 post 
   post = await Post.findByIdAndUpdate (  
   postId,
   {
    $pull:{ likes : loggedInUser } //pull y5dh id men likesarray 
   },
   {new : true}); //yrj3li object jdida 
   } else { //user mch 3aml like w bch y3ml like 
      post = await Post.findByIdAndUpdate(
         postId, //njib post hasb id 
         {
            $push : { likes : loggedInUser} //push y7ot fi array 
         },
         { new : true }); 
   }


   res.status(200).json(post);

});


