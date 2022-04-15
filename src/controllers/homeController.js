import db from '../models/index'

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
module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
}