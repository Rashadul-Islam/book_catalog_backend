/* eslint-disable @typescript-eslint/no-explicit-any */
import { Book, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { bookSearchableFields } from './book.constants';
import { IBookFilterRequest } from './book.interface';

const createBook = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
  });

  return result;
};

const getAllBook = async (
  filters: IBookFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { size, page, skip } = paginationHelpers.calculatePagination(options);
  const { search, ...filterData } = filters;

  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: bookSearchableFields.map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (key === 'category') {
          return {
            categoryId: {
              equals: (filterData as any)[key],
            },
          };
        } else if (key === 'minPrice') {
          return {
            price: {
              gte: parseFloat((filterData as any)[key]),
            },
          };
        } else if (key === 'maxPrice') {
          return {
            price: {
              lte: parseFloat((filterData as any)[key]),
            },
          };
        } else {
          return {
            price: {
              lte: parseFloat((filterData as any)[key]),
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    where: whereConditions,
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: 'desc' },
  });

  const total = await prisma.book.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      size,
    },
    data: result,
  };
};

const getSingleBook = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const bookByCategoryId = async (
  options: IPaginationOptions,
  id: string
): Promise<IGenericResponse<Book[]>> => {
  const { size, page, skip } = paginationHelpers.calculatePagination(options);
  const whereCondition = {
    categoryId: id,
  };

  const result = await prisma.book.findMany({
    where: whereCondition,
    include: {
      categoty: true,
    },
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: 'desc' },
  });

  const total = await prisma.book.count({
    where: whereCondition,
  });

  return {
    meta: {
      total,
      page,
      size,
    },
    data: result,
  };
};

const updateBook = async (id: string, data: Book): Promise<Book> => {
  const result = await prisma.book.update({
    where: { id },
    data,
  });

  return result;
};

const deleteBook = async (id: string): Promise<Book> => {
  const result = await prisma.book.delete({
    where: {
      id,
    },
  });

  return result;
};

export const BookService = {
  createBook,
  getAllBook,
  getSingleBook,
  bookByCategoryId,
  updateBook,
  deleteBook,
};
