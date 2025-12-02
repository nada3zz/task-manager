import userRepo from "../repository/user.repository";
import { encryptPassword, comparePassword } from "../../../../utils/bcrypt";
import { signJwt } from "../../../../utils/jwt";
import { BadRequestException } from "../../../../utils/exceptions";
import { IUser, RegisterDTO, LoginDTO } from "../interface";

class UserService {
  async register(data: RegisterDTO): Promise<{ accessToken: string }> {
    const { fullName, username, password } = data;
    const findUser = await userRepo.findUser(username);
    if (findUser) throw new BadRequestException("This username already exists");
    const hashedPassword = await encryptPassword(password);
    const newUser: RegisterDTO = {
      fullName,
      username,
      password: hashedPassword,
    };
    const user = await userRepo.create(newUser);
    const accessToken = signJwt({ username: user.username, id: user._id });
    return { accessToken };
  }

  async logIn(data: LoginDTO): Promise<{ accessToken: string }> {
    const user = await userRepo.findUser(data.username);
    if (!user || !(await comparePassword(data.password, user.password))) {
      throw new BadRequestException("Invalid credentials");
    }
    const accessToken = signJwt({ username: user.username, id: user._id });
    return { accessToken };
  }
}

export default new UserService();
