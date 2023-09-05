import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import prisma from '../../../shared/prisma';
import { Category } from '@prisma/client';

const createCategory = async (data: Category): Promise<Category> => {
  const result = await prisma.category.create({
    data,
  });

  return result;
};

const getAllCategory = async (
  options: IPaginationOptions
): Promise<IGenericResponse<Category[]>> => {
  const { size, page, skip } = paginationHelpers.calculatePagination(options);

  const result = await prisma.category.findMany({
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: 'desc' },
  });

  const total = await prisma.user.count({});

  return {
    meta: {
      total,
      page,
      size,
    },
    data: result,
  };
};

const getSingleCategory = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
    include: {
      books: true,
    },
  });

  return result;
};

const updateCategory = async (
  id: string,
  data: Category
): Promise<Category> => {
  const result = await prisma.category.update({
    where: { id },
    data,
  });

  return result;
};

const deleteCategory = async (id: string): Promise<Category> => {
  const result = await prisma.category.delete({
    where: {
      id,
    },
  });

  return result;
};

export const CategoryService = {
  createCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
