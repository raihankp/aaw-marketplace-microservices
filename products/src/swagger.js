const dotenv = require("dotenv");
const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

dotenv.config(); // Load environment variables

// 🟢 Swagger Documentation for V1
const docV1 = {
  info: {
    title: "Product API V1",
    description: "Auto-generated Swagger for Product V1 routes",
    version: "1.0.0",
  },
  servers: [
    {
      url: `${process.env.PRODUCT_SERVICE_URL}/api/product`,
      description: "Product Service API V1",
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [{ BearerAuth: [] }],
};

const outputFileV1 = "./swagger.v1.json";
const endpointsFilesV1 = ["./product/product.routes.ts"]; // Only V1 routes

// 🟢 Swagger Documentation for V2
const docV2 = {
  info: {
    title: "Product API V2",
    description: "Auto-generated Swagger for Product V2 routes",
    version: "2.0.0",
  },
  servers: [
    {
      url: `${process.env.PRODUCT_SERVICE_URL}/api/v2/products`,
      description: "Product Service API V2",
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [{ BearerAuth: [] }],
};

const outputFileV2 = "./swagger.v2.json";
const endpointsFilesV2 = ["./product/product.routes.v2.ts"]; // Only V2 routes

// Generate Swagger JSON files
swaggerAutogen(outputFileV1, endpointsFilesV1, docV1).then(() => {
  swaggerAutogen(outputFileV2, endpointsFilesV2, docV2);
});
