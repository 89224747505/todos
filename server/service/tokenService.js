const jwt = require('jsonwebtoken');
const pool = require('../db.js');

class TokenService {
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    generateTokens(payload){
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, {expiresIn:process.env.ACCESS_EXPIRE});
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN, {expiresIn:process.env.REFRESH_EXPIRE});
        return {
            accessToken,
            refreshToken
        }
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.ACCESS_TOKEN);
            return userData;
        }catch (e){
            return null;
        }
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.REFRESH_TOKEN);
            return userData;
        }catch (e){
            return null;
        }
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async findToken(refreshToken) {
        const tokenData = await pool.query("SELECT u1.user_id, u1.name, u1.soname, u1.patronymic, u1.login, u1.password, u1.manager_id, CONCAT(u2.name, ' ', u2.soname) AS manager FROM users AS u1 JOIN users AS u2 ON u1.manager_id = u2.user_id WHERE u1.refreshtoken=$1",
        [refreshToken]);
        return tokenData.rows[0];
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}

module.exports = new TokenService();