import bcrypt from "bcryptjs";
import db from '../models/index';
const salt = bcrypt.genSaltSync(10);


let createNewUser = async (data) => {

    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBryct = await hashUserPasswor(data.password)
            await db.User.create({
                email: data.email,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
                phoneNumber: data.phoneNumber,

            })
            resolve('create user success');
        } catch (err) {
            reject(err);
        }

    })


}

let hashUserPasswor = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync("B4c0/\/", salt);
            resolve(hashPassword);
        } catch (err) {
            reject(err);
        }


    })
}

module.exports = {
    createNewUser: createNewUser,
}