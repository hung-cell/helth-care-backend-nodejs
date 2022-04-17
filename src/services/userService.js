import db from '../models/index';
import bcrypt from "bcryptjs";
import raw from 'body-parser/lib/types/raw';

const salt = bcrypt.genSaltSync(10);

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

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            let check = await checkEmailExist(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    message: 'Your email is already in use, Plz try another email',
                })
            }

            let hashPasswordFromBryct = await hashUserPasswor(data.password)
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBryct,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
                phoneNumber: data.phoneNumber,

            })
            resolve({
                errCode: 0,
                message: 'OK',

            });
        } catch (err) {
            reject(err)
        }
    })
}

let hashUserPasswor = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (err) {
            reject(err);
        }


    })
}

let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: id }
            })

            if (!user) {
                resolve({
                    errCode: 2,
                    message: 'User not found'
                });
            }

            await db.User.destroy({
                where: { id: id }
            })
            resolve({
                errCode: 0,
                message: 'User deleted'
            });
        } catch (err) {
            reject(err)
        }
    })
}

let editUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    message: 'Missing required parameter !'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.firstName = data.firstName
                user.lastName = data.lastName
                user.address = data.address

                user.save()
                resolve({
                    errCode: 0,
                    message: 'User update successfully'
                })
            } else {
                resolve({
                    errCode: 1,
                    message: ` User's not found`
                })
            }
        } catch (err) {
            reject(err)
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    editUser: editUser,
}