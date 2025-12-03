import taskRepo from "../repository/task.repository";
import {
  BadRequestException,
  ForbiddenException,
} from "../../../../utils/exceptions";
import {
  ITask,
  IUpdateTask,
  IFindAllTasks,
  IAddTask,
} from "../interface";

class TaskService {
  async getAllTasks(
    options: IFindAllTasks,
    userId: string 
  ): Promise<{ 
    data: ITask[]; 
    totalCount: number; 
    currentPage: number; 
    totalPages: number;
  }> {
    const result = await taskRepo.findAll(options, userId);
    return {
      data: result.tasks,
      totalCount: result.totalCount,
      currentPage: result.currentPage,
      totalPages: result.totalPages,
    };
  }

  async getTask(id: string, userId: string): Promise<{ data: ITask | null }> { 
    await this._findTask(id, userId)
    const task = await taskRepo.findById(id);
    return { data: task };
  }

  async addTask(data: IAddTask, userId: string): Promise<{ data: string }> {
    await taskRepo.create(data, userId);
    return { data: "Task has been added successfully" };
  }

  async updateTask(
    id: string,
    data: IUpdateTask,
    userId: string
  ): Promise<{ data: string }> {
    await this._findTask(id, userId);
    await taskRepo.update(id, data);
    return { data: "Task has been updated successfully" };
  }

  async deleteTask(id: string, userId: string): Promise<{ data: string }> {
    await this._findTask(id, userId);
    await taskRepo.delete(id);
    return { data: "Task has been deleted successfully" };
  }

  private async _findTask(id: string, userId: string): Promise<ITask> {
    const task = await taskRepo.findByUser(id);
    
    if (!task) {
      throw new BadRequestException("This task does not exist");
    }
        
    if (String(task.user) !== userId) {
      throw new ForbiddenException("You don't have access to this task");
    }
    
    return task;
  }
}

export default new TaskService();
