import tokenService from "../service/tokenService.js";


export default (req, res, next) => {
  try {
    const AccessToken = req.headers.authorization.split(' ')[1]
    if (!AccessToken) {
      return res.status(403).json({ message: "Пользователь не авторизован" })
    }
    const decodeToken = tokenService.validateAccessToken(AccessToken)
    if (!decodeToken) {
      return res.status(403).json({ message: "Пользователь не авторизован" })
    }
    req.user = decodeToken
    next()
  } catch (e) {
    console.log(e)
    return res.status(403).json({ message: "Пользователь не авторизован" })
  }
}