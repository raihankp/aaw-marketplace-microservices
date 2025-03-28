const dotenv = require("dotenv");
const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

dotenv.config(); // Load environment variables

const doc = {
  info: {
    title: "Tenant API",
    description: "Auto-generated Swagger for Tenant routes",
    version: "1.0.0",
  },
  servers: [
    {
      url: `${process.env.TENANT_SERVICE_URL}/api/tenant`,
      description: "Tenant Service",
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
  security: [{ BearerAuth: [] }], // Apply BearerAuth globally
};

const outputFile = "./swagger.json"; // Path to save the generated Swagger file
const endpointsFiles = ["./tenant/tenant.routes.ts"]; // Paths to your routes

swaggerAutogen(outputFile, endpointsFiles, doc);
