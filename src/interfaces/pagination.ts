export type IPaginationOptions = {
  page?: number;
  size?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};

export const paginationCondition = ['size', 'page', 'sortBy', 'sortOrder'];
