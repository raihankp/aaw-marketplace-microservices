import express from 'express';
import { validate, verifyJWT } from "@src/middleware";
import * as Validation from './validation';
import * as Handler from './cart.handler';

const router = express.Router();

router.post('/', verifyJWT, validate(Validation.addItemToCartSchema), Handler.addItemToCartHandlerV2);

export default router;