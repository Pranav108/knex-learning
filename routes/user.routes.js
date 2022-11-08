const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");

router.get("/seed", userController.seeder);

router
  .route("/")
  .get(userController.getAllUser)
  .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUserById)
  .patch(userController.updateUserById)
  .delete(userController.deleteUserById);

module.exports = router;
