/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, User } from '@prisma/client';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IUserFilterRequest } from './user.interface';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { userSearchableFields } from './user.constants';
import prisma from '../../../shared/prisma';
import config from '../../../config';
import bcrypt from 'bcrypt';

const getAllUser = async (
  filters: IUserFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Partial<User>[]>> => {
  const { size, page, skip } = paginationHelpers.calculatePagination(options);
  const { search, ...filterData } = filters;

  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: userSearchableFields.map(field => ({
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
        return {
          [key]: {
            equals: (filterData as any)[key],
          },
        };
      }),
    });
  }

  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.user.findMany({
    where: whereConditions,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: 'desc' },
  });

  const total = await prisma.user.count({
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

const getSingleUser = async (id: string): Promise<Partial<User> | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });

  return result;
};

const updateUser = async (id: string, data: User): Promise<Partial<User>> => {
  data.password = await bcrypt.hash(
    data.password,
    Number(config.bycrypt_salt_rounds)
  );

  const result = await prisma.user.update({
    where: {
      id,
    },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });

  return result;
};

const deleteUser = async (id: string): Promise<Partial<User>> => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });

  return result;
};

export const UserService = {
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
