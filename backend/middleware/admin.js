import jwt from "jsonwebtoken";
const key = process.env.PrivetKey;

export const AdminAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const bearer = authorization.split(" ");
    const token = bearer[1];
    // console.log(token);
    try {
      const data = await jwt.verify(token, key);
      if (data) {
        req.admin = data;
        next();
      } else {
        res.status(401).json({ msg: "Unauthorized" });
      }
    } catch (error) {
      res.status(401).json({ msg: "Unauthorized" });
    }
  } else {
    res.status(401).json({ msg: "Unauthorized" });
  }
};
