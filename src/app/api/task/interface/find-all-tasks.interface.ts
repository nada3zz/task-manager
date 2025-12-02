export interface IFindAllTasks {
  page?: number;
  limit?: number;
  search?: string;
  sortOrder?: "asc" | "desc";
}
