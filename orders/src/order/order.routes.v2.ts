import express from 'express';
import { validate, verifyJWT } from "@src/middleware";
import * as Validation from './validation';
import * as Handler from './order.handler';

const router = express.Router();

router.get('/', verifyJWT, Handler.getAllOrdersHandlerV2);

export default router;