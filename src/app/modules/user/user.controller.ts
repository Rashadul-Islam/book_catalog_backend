import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { userFilterableFields } from './user.constants';
import pick from '../../../shared/pick';
import { paginationCondition } from '../../../interfaces/pagination';

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, paginationCondition);
  const result = await UserService.getAllUser(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully!',
    data: result,
  });
});

export const USerController = {
  getAllUser,
};
