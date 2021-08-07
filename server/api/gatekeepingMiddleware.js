
const { models: { User }} = require('../db')

const requireToken = async (req, res, next) => {
  try {
    console.log(req.headers)
    const token = req.headers.authorization //Removed token property
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error)
  }
}

const isAdmin = (req, res, next) => {
  if(!req.user.admin){
    return res.status(403).send("Not Authorized.")
  } else {
    next()
  }
}

module.exports = {
  requireToken,
  isAdmin
}

