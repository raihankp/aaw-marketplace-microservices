import { NewCart } from "@db/schema/cart";
import { InternalServerErrorResponse, NotFoundResponse } from "@src/commons/patterns";
import { addItemToCart } from "../dao/addItemToCart.dao";
import { User } from "@src/types";

export const addItemToCartService = async (
    user: User,
    product_id: string,
    quantity: number,
) => {
    try {
        const SERVER_TENANT_ID = process.env.TENANT_ID;
        if (!SERVER_TENANT_ID) {
            return new InternalServerErrorResponse('Tenant ID not found').generate();
        }

        if (!user.id) {
            return new NotFoundResponse('User not found').generate();
        }

        const cartData: NewCart = {
            tenant_id: SERVER_TENANT_ID,
            user_id: user.id,
            product_id: product_id,
            quantity: quantity,
        }

        const item = await addItemToCart(cartData);

        return {
            data: {
                ...item,
            },
            status: 201,
        }
    } catch (err: any) {
        return new InternalServerErrorResponse(err).generate();
    }
}

export const addItemToCartServiceV2 = async (
    user: User,
    product_id: string,
    quantity: number,
) => {
    try {
        const SERVER_TENANT_ID = process.env.TENANT_ID;
        if (!SERVER_TENANT_ID) {
            return new InternalServerErrorResponse('Tenant ID not found').generate();
        }

        if (!user.id) {
            return new NotFoundResponse('User not found').generate();
        }

        // Check if there is a product with the same product id
        // Get the product service URL from environment variables
        const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL;
        if (!PRODUCT_SERVICE_URL) {
            return new InternalServerErrorResponse("PRODUCT_SERVICE_URL is not defined").generate();
        }
        // PERFORM API REQUEST TO PRODUCT SERVICE
        const response = await fetch(`${PRODUCT_SERVICE_URL}/api/product/${product_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const product = await response.json()
        // HANDLE ERRORS
        if (!response.ok || !product || Object.keys(product).length === 0) {
            return new NotFoundResponse("Product not found").generate();
        }

        // Continue add to cart
        const cartData: NewCart = {
            tenant_id: SERVER_TENANT_ID,
            user_id: user.id,
            product_id: product_id,
            quantity: quantity,
        }

        const item = await addItemToCart(cartData);

        return {
            data: {
                ...item,
            },
            status: 201,
        }
    } catch (err: any) {
        return new InternalServerErrorResponse(err).generate();
    }
} 