import user from "../models/user.js";

class UserService {
    async registation(phone, password) {
        const candidate = await user.findOne({phone})
        if(candidate){
            return res.status(400).json({message: `Пользователь с таким номером ${phone} уже сушествует`})
        }
        const hashPassword = bcrypt.hashSync(password, 7)
    }
}