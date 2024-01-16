// NHB NKTEB Registercontroller w logincontroller 

//n5dh package eli installitha 

const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User , validateRegisterUser, validateLoginUser } = require("../models/User");
const VerificationToken = require("../models/VerificationToken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

// user yhb y3ml compte jdid 
/**----------------------------------------
 * @desc Register New User
 * @route /api/auth/register
 * @method POST
 * @access public
 *  
 * 
 ------------------------------------------*/
// bch nzid user fi database new object fi data base

module.exports.registerUserCtrl = asyncHandler(async (req,res) => { 
    //validation mn9blch ay haja yb3thha user 
    // baynet n5dhhom m req.body 
    //ken error y3tini object esmha error 
    //400 bad request y3ni most5dem 3atina donnees mch shah w mochkla m user mch m serveur 
    const {error} =  validateRegisterUser(req.body);
    if (error)
    {
        return res.status(400).json({ message : error.details[0].message });
    }
    
    
    
    
    
    // is user already exists y3ni nchouf user idha mawjoud fi database 
    //email:req.body.emai user bch y3tini email n5dhha men 8adi 
    
    let user = await User.findOne({ email:req.body.email});
    
    // idha user mawjoud 
    //res hiya response 
    if(user)
    {
        return res.status(400).json({ message : " user already exist"});
    }
    
    
    //hash the password tachfir lel password 
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt );
    
    
    
    
    // new user and save it to Db 
    // password: hashedPassword tachfir lel password 
    
    
    
    user = new User ({
    username: req.body.username,
    email : req.body.email,
    password: hashedPassword,
    });
    //nsjel user 
    await user.save();
    // nab3th response jaweb lel user 
    //201 created successfully
    

// Creating new Verification & save it to DB

const verifictionToken = new VerificationToken({

    userId: user._id,
    token: crypto.randomBytes(32).toString("hex"),
});

await verifictionToken.save();
//making the link

const link = `${process.env.CLIENT_DOMAIN}/users/${user._id}/verify/${verifictionToken.token}`;


//putting the link into an html template
const htmlTemplate = `
<div>
<p>Click on the link below to verify your email</p>
<a href="${link}">Verify</a>
</div>`;



//Sending email to the user 

await sendEmail(user.email, "Verify Your Email", htmlTemplate);









//Response to the client 

    res
    .status(201)
    .json({ message : "We sent to you an email, please verify your email address" });
    
    
    //send a response to client nb3th jweb lel most5dm  
    
    
    });





























/**----------------------------------------
 * @desc login User
 * @route /api/auth/login
 * @method POST
 * @access public
 *  
 * 
 ------------------------------------------*/

module.exports.loginUserCtrl = asyncHandler(async (req,res) => 
{
//1. validation 



const {error} =  validateLoginUser(req.body);
if (error)
{
    return res.status(400).json({ message : error.details[0].message });
}
//bch yod5l lzm ykoun 3andou hisab compte
//2. is user exist
// email n5dhha m body 
const user = await User.findOne({ email : req.body.email });
if (!user)
{
    return res.status(400).json({message : " invalid email or password "});
}

//tchouf password mt3ou shih ou nn 
// 3.check the password 
//compare y9aren password eli jet men client weli fi database
const isPasswordMatch = await bcrypt.compare(req.body.password, user.password) 
if (!isPasswordMatch )
{
    return res.status(400).json({message : " invalid email or password "});
} 






// user ken mch 3aml verification mnsm7louch y3ml login

if(!user.isAccountVerified) {

    let verificationToken = await VerificationToken.findOne({
        userId: user._id,
    });

    if(!verificationToken) {
        verificationToken = new VerificationToken({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
        });
        await verificationToken.save();
    }



const link = `${process.env.CLIENT_DOMAIN}/users/${user._id}/verify/${verificationToken.token}`;


const htmlTemplate = `
<div>
<p>Click on the link below to verify your email</p>
<a href="${link}">Verify</a>
</div>`;




await sendEmail(user.email, "Verify Your Email", htmlTemplate);









 return res
 .status(400)
 .json({ message : "We sent to you an email, please verify your email address"});
}





//4.generate token (jwt)
// token kima hwiya
//fi token ykoun mwjoud username w id hajet eli bch yothbt user rouhou bihom
const token = user.generateAuthToken();
//5.response to client 
res.status(200).json({
    _id: user._id,
    isAdmin : user.isAdmin,
    profilePhoto: user.profilePhoto,
    token,
    username: user.username,
});
});





/**----------------------------------------
 * @desc   Verify User Account
 * @route  /api/auth/:userId/verify/:token
 * @method GET
 * @access public
 *  
 * 
 ------------------------------------------*/
 module.exports.verifyUserAccountCtrl = asyncHandler(async (req,res) => {
//nchouf ken user mawjoud 
    
    
    const user = await User.findById(req.params.userId);
    if(!user) {
        return res.status(400).json({message: "invalid link"});
    }
//n5dh verification men database 
    const verificationToken = await VerificationToken.findOne({
        userId: user._id,
        token: req.params.token,
    });

//n3ml verification ala token 

    if(!verificationToken) {
        return res.status(400).json({message: "invalid link"});
    }
 
 //ken kol chy ok n7wel verified l true 
 
    user.isAccountVerified = true;
    await user.save();


    //b3d nfs5 verification m database
 //await verificationToken.remove();
//b3d nb3th jaweb lel user
    res.status(200).json({ message: "Your account verified"});
 });