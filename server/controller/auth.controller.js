import User from "../models/user.js"
import Role from "../models/role.js"
import bcrypt from "bcrypt"
import accessToken from "../service/generateAccessToken.js"

class authController {
  async registration(req, res) {
    try {
      const { name, password, phone, company } = req.body

      const candedat = await User.findOne({ phone })
      if (candedat) {
        return res.status(400).json({ message: "Такой пользовател уже существует" })
      }

      const hashPassword = bcrypt.hashSync(password, 7)
      const userRole = await Role.findOne({ value: "USER" })

      // if (!phone || !first_name || !last_name || !password || !company) {
      //   return res.status(400).json({ message: "отсутствует обязательные поля для регистраций" })
      // }
      // if (password.length < 6) {
      //   return res.status(400).json({ message: "пароль должен быть не меньшее 6 символов" })
      // }

      const user = new User({ phone, name, company, password: hashPassword, roles: [userRole.value] })
      await user.save()

      return res.json({ message: 'Пользователь зарегистрировался успешно!!!' })

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
      //Пользователь выходить null
      if (!phone || !password) {
        return res.status(400).json({ message: 'отсутствует логин или пароль' })
      }

      const validPassword = bcrypt.compareSync(password, user.password)
      if (!validPassword) {
        return res.status(400).json({ message: 'Введен неверный пароль' })
      }
      const token = accessToken(user._id, user.roles)
      return res.json({ token })
    } catch (e) {
      console.log(e)
    }
  }
}

export default new authController()