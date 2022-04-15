import db from '../models/index';
import crudService from '../services/crudService';
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        console.log(data)
        return res.render('homePage.ejs', { data: JSON.stringify(data) })
    } catch (err) {
        console.error(err);
    }
    return res.render('homePage.ejs', { data: data });
}

let getCRUD = async (req, res) => {

    return res.render('crud.ejs');
}

let postCRUD = async (req, res) => {
    let message = await crudService.createNewUser(req.body);
    console.log(message);
    return res.send('CRUD FROM SERVER')
}
let displayAllUser = async (req, res) => {
    let users = await crudService.displayAllUser();
    console.log(users);
    return res.render('displayUser.ejs', {
        users: users,
    });
}
module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayAllUser: displayAllUser,
}