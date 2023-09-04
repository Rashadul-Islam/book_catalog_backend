export type IPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};

export const paginationCondition = ['limit', 'page', 'sortBy', 'sortOrder'];
