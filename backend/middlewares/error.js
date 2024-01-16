

//  //Not Found Middleware 
//  const notFound = (req, res, next) => {
//     const error = new Error( `not found - ${req.originalUrl}`); //error classe fi javascript 
//     res.status(404);
//     next(error);
//  }











// error handler middleware 
const errorHandler = (err, req, res, next) => {

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode).json({
        message : err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack, //stack y3tini win erreur mwjouda 
    });
}

module.exports = {
    errorHandler,
   // notFound
}