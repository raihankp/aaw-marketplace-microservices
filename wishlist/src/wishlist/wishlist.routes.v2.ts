import express from "express";
import { validate, verifyJWT } from "@src/middleware";
import * as Validation from './validation';
import * as Handler from './wishlist.handler';

const router = express.Router();

router.put('/:id', verifyJWT, validate(Validation.updateWishlistSchema), Handler.updateWishlistHandlerV2);

export default router;