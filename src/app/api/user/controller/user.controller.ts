import { Request, Response } from "express";
import userService from "../service/user.service";

class UserController {
  async register(req: Request, res: Response) {
    const { fullName, username, password } = req.body;
    const data = await userService.register({ fullName, username, password });
    return { data };
  }

  async logIn(req: Request, res: Response) {
    const { username, password } = req.body;
    const data = await userService.logIn({ username, password });
    return { data };
  }

}

export default new UserController();
