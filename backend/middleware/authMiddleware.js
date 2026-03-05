// import jwt from "jsonwebtoken"

// export const protect = (req,res,next)=>{
// const token = req.headers.authorization?.split(" ")[1]

// if(!token) return res.status(401).json({msg:"Unauthorized"})

// const decoded = jwt.verify(token,process.env.JWT_SECRET)

// req.user = decoded

// next()
// }
import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.id) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({ msg: "Unauthorized" });
  }
};