import userRepo from "../repository/user.repository";
import { encryptPassword, comparePassword } from "../../../../utils/bcrypt";
import { signJwt } from "../../../../utils/jwt";
import { BadRequestException } from "../../../../utils/exceptions";
import { IUser } from "../interface/user.interface";

class UserService {
  async register(
    fullName: string,
    username: string,
    password: string
  ): Promise<{ accessToken: string }> {
    const findUser = await userRepo.findUser(username);
    if (findUser) throw new BadRequestException("This username already exists");
    const hashedPassword = await encryptPassword(password);
    const newUser: IUser = {
      fullName,
      username,
      password: hashedPassword,
    };
    const user = await userRepo.create(newUser);
    const accessToken = signJwt({ username: user.username, id: user._id });
    return { accessToken };
  }

  async logIn(
    username: string,
    password: string
  ): Promise<{ accessToken: string }> {
    const user = await userRepo.findUser(username);
    if (!user || !(await comparePassword(password, user.password))) {
      throw new BadRequestException("Invalid credentials");
    }
    const accessToken = signJwt({ username: user.username, id: user._id });
    return { accessToken };
  }

}

export default new UserService();
