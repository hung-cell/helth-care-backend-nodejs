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

module.exports = {
    getHomePage: getHomePage,

}