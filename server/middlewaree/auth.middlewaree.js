import Jwt from "jsonwebtoken";

export default (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(403).json({ message: "Пользователь не авторизован" })
    }
    const decodeToken = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    req.user = decodeToken
    next()
  } catch (e) {
    console.log(e)
    return res.status(403).json({ message: "Пользователь не авторизован" })
  }
}