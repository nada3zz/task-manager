import { IUser } from "../interface/user.interface";
import userModel from "../model/user.model";

class UserRepository {
  async create(data: IUser) {
    const user = await userModel.create(data);
    return user;
  }

  async findUser(username: string) {
    const user = await userModel.findOne({username});
    return user;
  }

  async findUserById(id: number) {
    const user = await userModel.findById(id);
    return user;
  }

}

export default new UserRepository();
