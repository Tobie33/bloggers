const {verify} = require('jsonwebtoken')

const validation = (req,res,next) => {
  const accessToken = req.header("accessToken")

  if(!accessToken) {
    res.status(401)
    return res.json({error: "User not logged in"})
  }
  try{
    const validToken = verify(accessToken, process.env.TOKEN_SECRET)
    if(validToken){
      next()
    }
  }catch(err){
    return res.json({error: err})
  }
}

module.exports = {validation}
