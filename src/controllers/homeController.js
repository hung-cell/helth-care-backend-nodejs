import db from '../models/index';
import crudService from '../services/crudService';
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();

        return res.render('homePage.ejs', { data: JSON.stringify(data) })
    } catch (err) {

    }
    return res.render('homePage.ejs', { data: data });
}

let getCRUD = async (req, res) => {

    return res.render('crud.ejs');
}

let postCRUD = async (req, res) => {
    await crudService.createNewUser(req.body);

    return res.send('CRUD FROM SERVER')
}
let displayAllUser = async (req, res) => {
    let users = await crudService.displayAllUser();

    return res.render('displayUser.ejs', {
        users: users,
    });
}

let editCRUD = async (req, res) => {
    let id = req.query.id;
    console.log(id);
    return res.send('You are here with edit')
}
module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayAllUser: displayAllUser,
    editCRUD: editCRUD,
}