import { ITask, IUpdateTask, IFindAllTasks } from "../interface";
import taskModel from "../model/task.model";

class TaskRepository {
  async findAll(options: IFindAllTasks = {}, userId: string): Promise<any> {
    const { page = 1, limit = 5, search, sortOrder = "asc" } = options;

    const query: any = {
      user: userId,
    };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;
    const sortDirection = sortOrder === "desc" ? -1 : 1;

    const [tasks, totalCount] = await Promise.all([
      taskModel
        .find(query)
        .sort({ createdAt: sortDirection })
        .skip(skip)
        .limit(limit)
        .populate("user", "username") 
        .exec(),
      taskModel.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      tasks,
      totalCount,
      currentPage: page,
      totalPages,
    };
  }

  async findById(taskId: string): Promise<ITask | null> {
    const task = await taskModel
      .findById(taskId)
      .populate("user", "username") 
      .exec();
    return task;
  }

  async create(
    data: {
      title: string;
      description?: string;
      completed?: boolean;
    },
    userId: string
  ): Promise<ITask> {
    const taskData = {
      ...data,
      user: userId,
    };

    const task = await taskModel.create(taskData);
    return task;
  }

  async update(taskId: string, data: IUpdateTask): Promise<ITask | null> {
    const task = await taskModel
      .findByIdAndUpdate(taskId, data, { new: true })
      .populate("user", "username email")
      .exec();
    return task;
  }

  async delete(taskId: string): Promise<ITask | null> {
    const task = await taskModel
      .findByIdAndDelete(taskId)
      .populate("user", "username")
      .exec();
    return task;
  }
}

export default new TaskRepository();
