import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';
import bcrypt from 'bcrypt';
import config from '../../../config';
import pick from '../../../shared/pick';

const createUser = async (data: User): Promise<Partial<User>> => {
  data.password = await bcrypt.hash(
    data.password,
    Number(config.bycrypt_salt_rounds)
  );

  const result = await prisma.user.create({ data });
  const refinResponse = pick(result, [
    'id',
    'name',
    'email',
    'role',
    'contactNo',
    'address',
    'profileImg',
    'createdAt',
    'updatedAt',
  ]);

  return refinResponse;
};

export const AuthService = {
  createUser,
};
