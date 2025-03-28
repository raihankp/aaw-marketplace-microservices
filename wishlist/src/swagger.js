const dotenv = require("dotenv");
const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

dotenv.config(); // Load environment variables

// 🟢 Swagger Documentation for V1
const docV1 = {
  info: {
    title: "Wishlist API V1",
    description: "Auto-generated Swagger for Wishlist V1 routes",
    version: "1.0.0",
  },
  servers: [
    {
      url: `${process.env.WISHLIST_SERVICE_URL}/api/wishlist`,
      description: "Wishlist Service API V1",
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

const outputFileV1 = "./swagger.v1.json"; // Path to save Swagger V1 file
const endpointsFilesV1 = ["./wishlist/wishlist.routes.ts"]; // V1 routes only

// 🟢 Swagger Documentation for V2
const docV2 = {
  info: {
    title: "Wishlist API V2",
    description: "Auto-generated Swagger for Wishlist V2 routes",
    version: "2.0.0",
  },
  servers: [
    {
      url: `${process.env.WISHLIST_SERVICE_URL}/api/v2/wishlists`,
      description: "Wishlist Service API V2",
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

const outputFileV2 = "./swagger.v2.json"; // Path to save Swagger V2 file
const endpointsFilesV2 = ["./wishlist/wishlist.routes.v2.ts"]; // V2 routes only

// Generate Swagger JSON files
swaggerAutogen(outputFileV1, endpointsFilesV1, docV1).then(() => {
  swaggerAutogen(outputFileV2, endpointsFilesV2, docV2);
});
