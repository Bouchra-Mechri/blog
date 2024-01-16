const mongoose = require("mongoose");
 // mongoose yorbt mongodb database b express framework 

//nchouf id eli je howa object id kima fi database wala le 
//is valid ychouf ken id object wle  
module.exports = (req,res,next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).json({ message : " invalid id"});
    }
    next(); 
}