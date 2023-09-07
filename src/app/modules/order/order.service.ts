import { Order, OrderedBook } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';

const createOrder = async (
  orderData: OrderedBook[],
  user: string
): Promise<Order | null> => {
  const placeOrderData = await prisma.$transaction(
    async prismaTransactionClient => {
      const placeOrder = await prismaTransactionClient.order.create({
        data: {
          userId: user,
        },
      });

      const updatedOrder = orderData?.map(item => {
        return {
          ...item,
          orderId: placeOrder?.id,
        };
      });

      await prismaTransactionClient.orderedBook.createMany({
        data: updatedOrder,
      });

      return placeOrder;
    }
  );

  const result = await prisma.order.findUnique({
    where: {
      id: placeOrderData?.id,
    },
    include: {
      orderedBooks: true,
    },
  });

  return result;
};

const getAllOrder = async (
  options: IPaginationOptions,
  user: { userId: string; role: string }
): Promise<IGenericResponse<Order[]>> => {
  const { size, page, skip } = paginationHelpers.calculatePagination(options);

  let result;
  if (user.role === 'admin') {
    result = await prisma.order.findMany({
      skip,
      take: size,
      orderBy:
        options.sortBy && options.sortOrder
          ? { [options.sortBy]: options.sortOrder }
          : { createdAt: 'desc' },
    });
  } else {
    result = await prisma.order.findMany({
      where: { userId: user.userId },
      skip,
      take: size,
      orderBy:
        options.sortBy && options.sortOrder
          ? { [options.sortBy]: options.sortOrder }
          : { createdAt: 'desc' },
    });
  }

  let total;
  if (user.role === 'admin') {
    total = await prisma.order.count({});
  } else {
    total = await prisma.order.count({ where: { userId: user.userId } });
  }

  return {
    meta: {
      total,
      page,
      size,
    },
    data: result,
  };
};

export const orderService = {
  createOrder,
  getAllOrder,
};
