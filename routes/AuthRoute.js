const AuthRoute = require("express").Router();
const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verify = require("../middleware/verify");


AuthRoute.post(
  "/auth/register",
  
  asyncHandler(async (req, res) => {
  

  

  let { email, password } = req.body;

    if ( !email ||  !password   ) {
      res.json({ msg: "input box cannot be empty!" });
    }

  
  const salt =  await bcrypt.genSalt(10);
  const hashedPassword = await  bcrypt.hash(password, salt);

 await User.create  ({
    email,
  
    password: hashedPassword,
    
  });

   const accesstoken = createAccessToken({id: User._id})
    const refreshtoken = createRefreshToken({id: User._id})


    res.cookie('refreshtoken', refreshtoken, {
      httpOnly: true,
      path: '/auth/refresh_token',
      maxAge: 7*24*60*60*1000 // 7d
    })



    res.json({msg: "account created"});
  })
);

AuthRoute.post(
  "/auth/login",
  asyncHandler(async (req, res) => {
    
    const { email, password } = req.body;

    const userExists = await User.findOne({ email }).select("+password");

    if (!userExists) {
      res.json({
        msg: "No user associated with this username exists in our system. Please register.",
      });
    }

    const passwordMatch = await bcrypt.compare(password, userExists.password);

    if (passwordMatch) {

      const accesstoken = createAccessToken({id: userExists._id})
      const refreshtoken = createRefreshToken({id: userExists._id})

            


        res.cookie('refreshtoken', refreshtoken, {
        httpOnly: true,
        path: '/auth/refresh_token',
        maxAge: 7*24*60*60*1000 // 7d
      })
  




      const { _id, email } = userExists

      res.json({ accesstoken, userExists: { _id, email } });
    } else {
      res.json({ msg: "check your password again" });
    }
  

  
  })

);

AuthRoute.get('/auth/refresh_token', asyncHandler(async(req, res) => {
  try{
  const rf_token = req.cookies.refreshtoken;
// console.log(rf_token);

  if(!rf_token) return res.status(400).json({msg: "Please Login or Register"})

  jwt.verify(rf_token, process.env.REFRESH_TOKEN, (err, user) =>{
    if(err) return res.status(400).json({msg: "Please Login or Register"})

    const accesstoken = createAccessToken({id: user.id})
    

    res.json({accesstoken})
}) }
catch(err) {
  return res.status(500).json({msg: err.message})

}

}))


AuthRoute.get(
  "/auth/logout",
  verify,
  asyncHandler(async (req, res) => {
    res.clearCookie('refreshtoken', {path: '/auth/refresh_token'})
            return res.json({msg: "Logged out"})

    
  })
);


AuthRoute.get('/auth/user',verify, asyncHandler(async(req, res) => {
try{
  const user = await User.findById(req.user).select('-password')
  if(!user) return res.status(400).json({msg: "User does not exist."})

  res.json(user)
// console.log(user);

// res.json(req.user)

}
  catch(err) {
    return res.status(500).json({msg: err.message})


  }


}))




const createAccessToken = (user) =>{
  return jwt.sign(user, process.env.ACCESS_TOKEN, {expiresIn: '11m'})
}
const createRefreshToken = (user) =>{
  return jwt.sign(user, process.env.REFRESH_TOKEN, {expiresIn: '7d'})
}


module.exports = AuthRoute;
