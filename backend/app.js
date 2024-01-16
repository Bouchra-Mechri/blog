const express = require("express");
const connectToDb = require("./config/connectToDb");
const { errorHandler, notFound } = require("./middlewares/error");
const cors = require("cors"); //y5li frontend y5dh services men 3and backend 5tr houma kol whd port mt3ou 

// nhb n3ml connection bin machrou3 mt3i express framework m3a mongodb 


// bch ynjm y9ra les variables men dotenv
// y5li app mt3i t9ra les variables men .env 
require("dotenv").config();



// bch ynjm y9ra les variables men dotenv
// y5li app mt3i t9ra les variables men .env 
//require("dotenv").config();


// connection to db 
//y3ml itisal b database eli ktbneha fi config 
connectToDb();

//init app
const app = express();

//middlewares 
// y5li express.json framework  y3rf json file  
// app.use(notFound);
app.use(express.json());

// Cors Policy
//bch n9olou a3ti services l domaines hedha
app.use(cors({ 
    origin:"http://localhost:3000"
}));


//Routes 
app.use("/api/auth" , require("./routes/authRoute"));
app.use("/api/users" , require("./routes/usersRoute"));
app.use("/api/posts" , require("./routes/postsRoute"));
app.use("/api/comments" , require("./routes/commentsRoute"));
app.use("/api/categories" , require("./routes/categoriesRoute"));
app.use("/api/password",require("./routes/passwordRoute"));


//Error Handler Middleware 
app.use(errorHandler);

// running the server 

//process.env.NODE_ENV 9otlou 5oudh environnement mt3 develop eli hiya NODE_ENV=development
const PORT = process.env.PORT || 7700;
app.listen(PORT,() => 
console.log 
(
    'server is running in ${process.env.NODE_ENV} mode on port ${PORT}'
)
);