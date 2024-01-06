const express = require("express");
const controllers = require ("../controllers/index")
const userRouter = express.Router();

userRouter.route("/user").get(controllers.getAllUsers).post(controllers.createUser);
userRouter
    .route("/user/:id")
    .get(controllers.getUserById)
    .put(controllers.updateUser)
    .delete(controllers.deleteUser);

module.exports = userRouter;
