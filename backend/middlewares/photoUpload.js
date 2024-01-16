
const path = require("path");

//multer y3ml upload l tswr fi nodejs 
const multer = require("multer");


//win taswira m7touta 
//photo storage 
//parametre cb mra loula ys2lou y9olou 3andk erreur y9olou le nktb null 
//b3d t7ot path win thb t7ot tswira 
//originalname esm tswira eli lzm tkoun unique tji men 3nd client  
//new date n7wlha l string b3d my9blch no9tin esm tswira fi 3oudh : nktb -
//else y3ni user mch 3atini file 
const photoStorage = multer.diskStorage(
    {
        destination : function(req, file,cb)
        {
            cb(null , "D:/blog-pro/backend/images");
        },
        filename: function(req,file,cb)
        {
            if(file)
            {
                cb(null , new Date().toISOString().replace(/:/g,"-") + file.originalname);
            } else {
                cb(null,false);
            }
        }
    }
);


//Photo Upload Middleware 

//file tjini men client w fiha tswira 
//mimtype naw3 tswira
//mimtype tkoun feha tswira 
const photoUpload = multer( 
    {
         storage:photoStorage,
         fileFilter : function(req, file , cb )
         {
            if(file.mimetype.startsWith("image"))
            {
                cb(null , true)
            } else {
                cb ({ message : "Unsupported file format "},false);
            }
         }, 
         limits : { fileSize : 1024 * 1024 *100 } // 1 megabyte taille tswira 
    });

    module.exports = photoUpload;