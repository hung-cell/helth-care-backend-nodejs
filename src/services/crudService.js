import bcrypt from "bcryptjs";
import db from '../models/index';
const salt = bcrypt.genSaltSync(10);


let createNewUser = async (data) => {

    return new Promise(async (resolve, reject) => {
        try {
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
            resolve('create user success');
        } catch (err) {
            reject(err);
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

let displayAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({ raw: true });
            resolve(users)
        } catch (err) {
            reject(err);
        }

    })
}
let editCRUD = async (req, res) => {

}
module.exports = {
    createNewUser: createNewUser,
    displayAllUser: displayAllUser,
    editCRUD: editCRUD,
}