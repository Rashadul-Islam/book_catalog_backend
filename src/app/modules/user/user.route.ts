import express from 'express';
import { USerController } from './user.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.get('/', auth(ENUM_USER_ROLE.ADMIN), USerController.getAllUser);
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), USerController.getSingleUser);
router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), USerController.updateUser);

export const UserRoutes = router;
