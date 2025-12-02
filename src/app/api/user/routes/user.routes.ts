import { Router } from "express";
import { validator } from "../../../middlewares/validator.middleware";
import { controller } from "../../../middlewares/controller.middleware";
import userController from ".././controller/user.controller";
import { userValidation } from "../validator/user.validator";

const router = Router();

const baseRoute = "/user/auth";

router.post(
  "/register",
  validator(userValidation.register),
  controller(userController.register)
);

router.post(
  "/login",
  validator(userValidation.login),
  controller(userController.logIn)
);



export const userBaseRoute = baseRoute;
export const userRoutes = router;

