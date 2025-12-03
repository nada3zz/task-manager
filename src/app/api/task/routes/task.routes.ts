import { Router } from "express";
import { validator } from "../../../middlewares/validator.middleware";
import { controller } from "../../../middlewares/controller.middleware";
import taskController from "../controller/task.controller";
import { taskValidation } from "../validator/task.validator";
import { isAuthenticated } from "../../../middlewares/isAuthenticated.middleware";

const router = Router();

const baseRoute = "/task";

router.get(
  "/",
  isAuthenticated,
  validator({} as any), 
  controller(taskController.getAllTasks)
);

router.get(
  "/:id",
  isAuthenticated,
  validator(taskValidation.getDetailsSchema),
  controller(taskController.getTask)
);

router.post(
  "/",
  isAuthenticated,
  validator(taskValidation.add),
  controller(taskController.addTask)
);

router.put(
  "/:id",
  isAuthenticated,
  validator(taskValidation.edit),
  controller(taskController.updateTask)
);

router.delete(
  "/:id",
  isAuthenticated,
  validator(taskValidation.delete),
  controller(taskController.delete)
);


export const taskBaseRoute = baseRoute;
export const taskRoutes = router;
