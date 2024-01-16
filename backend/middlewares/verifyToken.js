const jwt = require("jsonwebtoken");

//verify token

function verifyToken(req,res,next)
{
    const authToken = req.headers.authorization;
    if(authToken)
    {
        const token = authToken.split(" ")[1];
        try 
        {
            const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decodedPayload;
            next();
            
        }
         catch (error)
        {
            return res.status(401).json( { message : " invalid token , access denied"});
            
        }
    } 
    else 
    {
        return res.status(401).json({ message : " no token provided , access denied"});
    }
}
//code 401 mhouch authentifier
//ken wsel lel else y3ni mhouch authentifier 
//invalid token token mch shiha  
//no token provided mhouch 3atini token 
// decodedPayload y7el tchfir token w y3tini payload y3ni eli hiya id w is admin 
//y3tini payload haseb token w jwtsecret eli hiya  private key
// req.user = decodedPayload; payload eli bch y3tinheli bch n7otha fi req.user
//next y3ni a3ti 5dma lel middelware eli b3dk





//funtion t3ml verifiy l token w tchouf ken user admin wle b3d ndina l function token fou9  
//if res.user.isadmin ken admin nt3dw lel etape eli b3dha next 
function verifyTokenAndAdmin(req,res,next)
{
    verifyToken(req,res,() => 
    { 
        if(req.user.isAdmin)
         {
        next();
    } 
    else 
    {
        return res.status(403).json ({ message : " not allowed, only admin "});
    }
      
    });
}




//verify token and only himself

function verifyTokenAndOnlyUser(req,res,next)
{
    verifyToken(req,res,() => 
    { 
        if( req.user.id === req.params.id)
         {
        next();
    } 
    else 
    {
        return res.status(403).json ({ message : " not allowed, only user himself "});
    }
      
    });
}




//verify token and authorization
//mnjmch nst3mlha fi delete post 5tr lena y5dh is mt3 user

function verifyTokenAndAuthorization(req,res,next)
{
    verifyToken(req,res,() => 
    { 
        if( req.user.id === req.params.id || req.user.isAdmin)
    {
        next();
    } 
    else 
    {
        return res.status(403).json ({ message : " not allowed, only user himself or admin "});
    }
      
    });
}







module.exports = {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndOnlyUser,
    verifyTokenAndAuthorization,
};