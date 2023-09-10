import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { Request, Response } from 'express';
import { orderService } from './order.service';
import pick from '../../../shared/pick';
import { paginationCondition } from '../../../interfaces/pagination';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const user = req?.user?.userId;
  const result = await orderService.createOrder(req.body.orderedBooks, user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order placed successfully!',
    data: result,
  });
});

const getAllOrder = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, paginationCondition);
  const result = await orderService.getAllOrder(options, req?.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders retrieved successfully!',
    data: result,
  });
});

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await orderService.getSingleOrder(req?.user, req?.params?.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order retrieved successfully!',
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrder,
  getSingleOrder,
};
