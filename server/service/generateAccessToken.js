import Jwt from "jsonwebtoken";

const accessToken = (id, roles) => {
  const payload = { id, roles }
  return Jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "24h" })
}

export default accessToken;