 const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken")

// User Schema 
// kifh ykoun chakel mt3 user 



// hedhi user model 
// trim yn7i faraght men awl w e5r string 
//minlength a9al caractere lzm ykoun 2
//maxlength akthr haja 100 caractere 
//email unique y3ni myt3wdch 
// par defaut taswira bch tkoun eli fi lien 

// timestamps y3ml updatead w createdad 
const UserSchema = new mongoose.Schema({
    //validation 3la database mch kima joi validation ala express       
      
  username: {
  
          type:String,
          required: true, 
          trim: true,
          minlength: 2,
          maxlength:100,
  },
  
  email: {
  
      type:String,
      required: true, 
      trim: true,
      minlength: 5,
      maxlength:100,
      unique:true,
  },
  
  
  password : {
  
      type:String,
      required: true, 
      trim: true,
      minlength: 8,
    
  },
  
  profilePhoto: {
      type : Object, 
      default : {
          url : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
          publicId : null,
      }
  },
  
  bio : {
  type: String,
  },
  
  isAdmin: {
      type :Boolean,
      default:false,
  },
  
  isAccountVerified : {
      type : Boolean,
      default : false,
  },  
},
 {
    timestamps : true,
    toJSON : { virtuals: true }, //n3ml hedha bch mongoose ynjm yzid field virtual lel schema 
    toObject : { virtuals: true }
 });  





//fi mongoose 3ana virtuel howa y3ml relation 
//bch n3ml relation bin user w post
//populate posts that belongs to this user when he/she get his/her profile  
//nhb ala les posts lkol w9t manod5l lel profile 






//virtual bch yzid posts lel schema eli hiya username .. ama yzidha ken w9t mayst79lha 
//y3ni 9otlou 5oudhhom m postmodel dossier
//id mt3 user y3ni 9otlou jibli posts kol mt3 id user hedha 


UserSchema.virtual("posts", { 
    ref: "Post", 
    foreignField: "user",  
    localField: "_id", 
});











 
// generate auth token 
//this._id  this y3ni object ._id y5dhha m schema 
UserSchema.methods.generateAuthToken = function()
{
return jwt.sign({ id : this._id , isAdmin : this.isAdmin}, process.env.JWT_SECRET );
}













//y3ml user model hasb user schema 

const User = mongoose.model("User", UserSchema);

//ktbna user model 




//Validate Register User
//joi package sabineha mt3 validation 
//joi y3ml validation 3la mostwe framework expressjs

function validateRegisterUser(obj) {
    const schema = Joi.object(
        {
            username: Joi.string().trim().min(2).max(100).required(),
            email: Joi.string().trim().min(5).max(100).required().email(),
            password: Joi.string().trim().min(8).required(),
        }
    );

    return schema.validate(obj);
}






// validate Login User 
function validateLoginUser(obj) {
    const schema = Joi.object(
        {
            email: Joi.string().trim().min(5).max(100).required().email(),
            password: Joi.string().trim().min(8).required(),
        });

    return schema.validate(obj);
}

 




// validate Update User 
function validateUpdateUser(obj) {
    const schema = Joi.object(
        {
           username: Joi.string().trim().min(2).max(100),
           password: Joi.string().trim().min(8),
           bio: Joi.string(),
        });

    return schema.validate(obj);
}









// validate Email
function validateEmail(obj) {
    const schema = Joi.object(
        {
            email: Joi.string().trim().min(5).max(100).required().email(),    
        });

    return schema.validate(obj);
}




// validate New Password 
function validateNewPassword(obj) {
    const schema = Joi.object(
        {
            password: Joi.string().trim().min(8).required(),
        });

    return schema.validate(obj);
}






// n3ml export lel function  validateRegisterUser
module.exports = 
{
    User,
    validateRegisterUser,
    validateLoginUser,
    validateUpdateUser,
    validateEmail,
    validateNewPassword
}