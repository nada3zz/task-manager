import { Router } from "express";
import { taskBaseRoute, taskRoutes } from "../task/routes/task.routes";
import { userBaseRoute, userRoutes } from "../user/routes/user.routes";

const baseRouter = Router();

baseRouter.use(userBaseRoute, userRoutes);
baseRouter.use(taskBaseRoute, taskRoutes);

export const apiBaseRouter = baseRouter;
