import { InternalServerErrorResponse, NotFoundResponse } from "@src/commons/patterns"
import { getProductById } from "../dao/getProductById.dao";

export const getProductByIdService = async (
    id: string,
) => {
    try {
        const SERVER_TENANT_ID = process.env.TENANT_ID;
        if (!SERVER_TENANT_ID) {
            return new InternalServerErrorResponse('Server Tenant ID not found').generate()
        }

        const products = await getProductById(SERVER_TENANT_ID, id)

        return {
            data: {
                ...products
            },
            status: 200
        }
    } catch (err: any) {
        return new InternalServerErrorResponse(err).generate()
    }
}

export const getProductByIdServiceV2 = async (
    id: string,
) => {
    try {
        const SERVER_TENANT_ID = process.env.TENANT_ID;
        if (!SERVER_TENANT_ID) {
            return new InternalServerErrorResponse('Server Tenant ID not found').generate()
        }

        const products = await getProductById(SERVER_TENANT_ID, id)

        if (!products) {
            return new NotFoundResponse("Product not found").generate();
        }

        return {
            data: {
                ...products
            },
            status: 200
        }
    } catch (err: any) {
        return new InternalServerErrorResponse(err).generate()
    }
}