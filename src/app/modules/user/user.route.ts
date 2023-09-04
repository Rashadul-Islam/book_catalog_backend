import express from 'express';
import { USerController } from './user.controller';

const router = express.Router();

router.get(
  '/',
  USerController.getAllUser
);

export const UserRoutes = router;
