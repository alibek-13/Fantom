import Jwt from "jsonwebtoken";
import tokenModel from "../models/tokenModel.js";
class TokenService {
    generateTokens(payload) {
        const accessToken = Jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
        const refreshToken = Jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' })
        return {
            accessToken,
            refreshToken
        }
    }
    async saveToken(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({ user: userId })
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await tokenModel.create({ user: userId, refreshToken })
        return token;
    }
    async removeToken(refreshToken) {
        const tokenData = await tokenModel.deleteOne({ refreshToken })
        return tokenData;
    }
}

export default new TokenService;