//njib packages cloudinary 
const cloudinary = require("cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
});

//cloudinary upload image
//ken kol chy mrigel y3ml upload ltswira w yrj3 data  
// ki n3ml throw l new error error handler y5dh error w y3ti error msg lel user
//ki nhb eni n3rf error ka moubarmj n3ml log console error    
const cloudinaryUploadImage = async(fileToUpload) => {
    try {
        const data = await cloudinary.uploader.upload(fileToUpload ,{
            resource_type: 'auto',
        });
        return data;
    }catch (error){
        
        console.log(error);// dev ychouf error 
        throw new Error("Internal Server Error (cloudinary)"); //user ychouf error 
    }
};

//cloudinary Remove image 
const cloudinaryRemoveImage = async(imagePublicId) => {
    try {
        const result = await cloudinary.uploader.destroy(imagePublicId); 
  
        return result;
    }catch (error){
        console.log(error);// dev ychouf error 
        throw new Error("Internal Server Error (cloudinary)");  
    }
};



//cloudinary Remove  Multiple Image 
// async(PublicIds) array men id 5atr ywbed 3andi alef tswr bch nfs5hom 
const cloudinaryRemoveMultipleImage = async(PublicIds) => {
    try {
        const result = await cloudinary.v2.api.delete_resources(PublicIds); //hedha men cloudinary api 
        return result;
    }
    catch (error)
    {
        console.log(error);// dev ychouf error 
        throw new Error("Internal Server Error (cloudinary)"); 
    }
};

module.exports = {
    cloudinaryUploadImage, //exportation lel les fonctions 
    cloudinaryRemoveImage,
    cloudinaryRemoveMultipleImage
};