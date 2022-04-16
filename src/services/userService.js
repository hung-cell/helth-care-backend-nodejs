import db from '../models/index';
import bcrypt from "bcryptjs";


let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkEmailExist(email);
            if (isExist) {
                // if user email already exists
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password'],
                    where: { email: email },
                    raw: true
                })
                // check user if in the sametime some person delete this account
                if (user) {

                    let checkPassword = await bcrypt.compareSync(password.toString(), user.password);

                    if (checkPassword) {
                        userData.errCode = 0;
                        userData.message = 'OK';
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.message = 'Your password not match';
                    }
                } else {
                    userData.errCode = 2;
                    userData.message = `User Not Found`;
                }


            } else {

                // return
                userData.errCode = 1;
                userData.message = `Your email isn't exist. Please try again`;
            }
            resolve(userData);
        } catch (err) {
            reject(err);
        }
    })
}

let checkEmailExist = (email) => {
    return new Promise(async (resolve, reject) => {

        try {
            let user = await db.User.findOne({
                attributes: ['email'],
                where: { email: email },
                raw: true
            })
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (err) {
            reject(err)
        }
    })

}


let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = ''
            if (userId && userId == 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password'],
                    },

                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    attributes: {
                        exclude: ['password'],
                    },
                    where: { id: userId },

                })
            }
            resolve(users)
        } catch (err) {
            reject(err)
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
}