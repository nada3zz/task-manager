import { RegisterDTO } from "../interface";
import userModel from "../model/user.model";

class UserRepository {
  async create(data: RegisterDTO) {
    const user = await userModel.create(data);
    return user;
  }

  async findUser(username: string) {
    const user = await userModel.findOne({ username });
    return user;
  }

  async findUserById(id: number) {
    const user = await userModel.findById(id);
    return user;
  }
}

export default new UserRepository();
