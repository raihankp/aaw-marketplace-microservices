const dotenv = require("dotenv");
const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

dotenv.config(); // Load environment variables

// 🟢 Swagger Documentation for Authentication API V1
const docV1 = {
  info: {
    title: "Authentication API V1",
    description: "Auto-generated Swagger for Authentication V1 routes",
    version: "1.0.0",
  },
  servers: [
    {
      url: `${process.env.AUTH_SERVICE_URL}/api/auth`,
      description: "Authentication API V1",
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
const endpointsFilesV1 = ["./user/user.routes.ts"]; // Only V1 routes

// 🟢 Swagger Documentation for Authentication API V2
const docV2 = {
  info: {
    title: "Authentication API V2",
    description: "Auto-generated Swagger for Authentication V2 routes",
    version: "2.0.0",
  },
  servers: [
    {
      url: `${process.env.AUTH_SERVICE_URL}/api/v2/auth`,
      description: "Authentication API V2",
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
const endpointsFilesV2 = ["./user/user.routes.v2.ts"]; // Only V2 routes

// Generate Swagger JSON files for V1 and V2
swaggerAutogen(outputFileV1, endpointsFilesV1, docV1).then(() => {
  swaggerAutogen(outputFileV2, endpointsFilesV2, docV2);
});
