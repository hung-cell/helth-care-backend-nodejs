import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController"
let router = express.Router();

let initWebRouter = (app) => {
    router.get('/', homeController.getHomePage)

    router.get('/crud', homeController.getCRUD)
    router.post('/post-crud', homeController.postCRUD)
    router.get('/get-crud', homeController.displayAllUser)
    router.get('/edit-crud', homeController.editCRUD)
    router.post('/api/login', userController.handleLogin)
    return app.use("/", router);
}


module.exports = initWebRouter;