
import userService from '../services/userService';



let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    // validations 
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter !'
        })
    }
    // handle login from services
    let userData = await userService.handleUserLogin(email, password);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        user: userData.user,
    })
}
let handleGetAllUsers = async (req, res) => {
    let id = req.body.type;// ALL, Single
    let users = await userService.getAllUsers(id);
    console.log(users);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        users
    })
}
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
}