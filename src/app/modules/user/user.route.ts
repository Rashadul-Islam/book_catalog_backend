import express from 'express';
import { USerController } from './user.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from '../auth/auth.validation';

const router = express.Router();

router.get('/', auth(ENUM_USER_ROLE.ADMIN), USerController.getAllUser);

router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), USerController.getSingleUser);

router.patch(
  '/:id',
  validateRequest(AuthValidation.updateUserZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  USerController.updateUser
);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), USerController.deleteUser);

export const UserRoutes = router;
