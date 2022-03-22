import User from "../models/user.js"
import bcrypt from "bcrypt"
import tokenService from "../service/tokenService.js"
import tokenModel from "../models/tokenModel.js"
import user from "../models/user.js"


class authController {
  async registration(req, res) {
    try {
      const { password, phone, userName, company } = req.body

      const candidate = await User.findOne({ phone })
      if (candidate) {
        return res.status(400).json(`Пользователь с таким номером ${phone} уже сушествует`)
      }
      const hashPassword = bcrypt.hashSync(password, 7)

      const user = new User({ userName, phone, password: hashPassword, company })

      const tokens = tokenService.generateTokens({ user })
      await tokenService.saveToken(user.id, tokens.refreshToken)

      res.cookie('refreshToken', user.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      await user.save()
      return res.json({ user, tokens });

    } catch (e) {
      console.log(e)
    }
  }

  async login(req, res) {
    try {
      const { phone, password } = req.body

      const user = await User.findOne({ phone })
      if (!user) {
        return res.status(400).json({ message: `Пользователь ${user} не найден` })
      }

      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: 'Введен неверный пароль' })
      }

      const tokens = tokenService.generateTokens({ user })
      await tokenService.saveToken(user.id, tokens.refreshToken)


      return res.json({ tokens })
    } catch (e) {
      console.log(e)
    }
  }
  async logout(req, res) {
    try {
      const {refreshToken} = req.cookies
      const token = await tokenModel.deleteOne({refreshToken})
      res.clearCookie('refreshToken');
      return res.json(token)
    } catch (e) {
      console.log(e)
    }
  }
  async refresh(req, res) {
    const {refreshToken} = req.cookies
    if (!refreshToken){
      return res.status(400).json({message:'Пользователь не авторизован'})
    }
    const userData = tokenService.validateRefreshToken(refreshToken)
    const tokenBD = await tokenModel.findOne({refreshToken})
    if (!userData || !tokenBD ){
      return res.status(400).json({message:'Пользователь не авторизован'})
    }
    const User = await user.findById(userData.id)
    const tokens = tokenService.generateTokens(User)
    await tokenService.saveToken(user.id, tokens.refreshToken)
    res.cookie('refreshToken', user.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
    await user.save()
    return res.json({ User, tokens });
  }

  async getUser(req, res) {
    try {
      const user = await User.find();
      return res.json(user)
    } catch (e) {
      console.log(e)

    }
  }
}

export default new authController()