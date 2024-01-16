const mongoose = require("mongoose");
const Joi = require("joi"); //joi lel validation 

//Post Schema
//chnowa bch ykoun fi post 
const PostSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true,
        trim: true, //yn7i les espaces
        minlength: 2,
        maxlength: 200,
    },

    description: {
        type: String , 
        required: true,
        trim: true,
        minlength: 10,
   
    },
//men 5ilel hedha bch n3ml relation bin poste w user y3ni user howa yktb poste
    user : {
        type: mongoose.Schema.Types.ObjectId, //user ykoun men nw3 object id 
        ref: "User", //y3ni n5dh user men user model 3mltha reference 
        required: true,
    },

    category : {
        type: String,
        required: true, 
    },
    image: {
        type : Object,
        default: {
            url: "",
            publicId: null,
        },
    },

    //kol poste 3andha likes
    //likes men nw3 array 
    //user eli y3ml likes ykoun id mt3ou m5zoun fi likes array 
    likes : 
    [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],   
}, 

{
    timestamps: true,
    toJSON: {virtuals: true}, //bch yzid field virtual l schema hedhi 
     toObject: {virtuals: true}
}
);



 
// PostSchema.set toObject virtuals:true
// PostSchema.set toJSON virtuals:true

//Populate Comment For This Post 


 //y3ni 5oudh comments en comment models 
 //bch norbtou b postid eli mwjoud fi comment

PostSchema.virtual("comments", {
    ref: "Comment",
    foreignField: "postId",
    localField: "_id"
});





// Post Model 
const Post = mongoose.model("Post" , PostSchema);


// Validate create Post 

//user ki y3ml new poste lzm y3tini title dw des w category 

function validateCreatePost(obj){
     
    const schema = Joi.object({
        title : Joi.string().trim().min(2).max(200).required(),
        description : Joi.string().trim().min(10).required(),
        category : Joi.string().trim().required(),

    }); 
    return schema.validate(obj);
}


//Validate Update Post 
function validateUpdatePost(obj){
     
    const schema = Joi.object({
        title : Joi.string().trim().min(2).max(200),
        description : Joi.string().trim().min(10),
        category : Joi.string().trim(),

    }); 
    return schema.validate(obj);
}

module.exports = {
    Post, 
    validateCreatePost,
    validateUpdatePost,
}