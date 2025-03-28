import express from 'express';
import { validate, verifyJWTProduct } from "@src/middleware";
import * as Validation from './validation';
import * as Handler from './product.handler';

const router = express.Router();

router.get('/:id', validate(Validation.getProductByIdSchema), Handler.getProductByIdHandlerV2);
router.put('/:id', verifyJWTProduct, validate(Validation.editProductSchema), Handler.editProductHandlerV2);
router.delete('/:id', verifyJWTProduct, validate(Validation.deleteProductSchema), Handler.deleteProductHandlerV2);

export default router;