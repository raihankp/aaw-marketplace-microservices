const dotenv = require("dotenv");
const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

dotenv.config(); // Load environment variables

// 🟢 Swagger Documentation for Order API V1
const docOrderV1 = {
  info: {
    title: "Order API V1",
    description: "Auto-generated Swagger for Order V1 routes",
    version: "1.0.0",
  },
  servers: [
    {
      url: `${process.env.ORDER_SERVICE_URL}/api/order`,
      description: "Order Service API V1",
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

const outputFileOrderV1 = "./swagger.order.v1.json";
const endpointsFilesOrderV1 = ["./order/order.routes.ts"]; // Only Order V1 routes

// 🟢 Swagger Documentation for Cart API V1
const docCartV1 = {
  info: {
    title: "Cart API V1",
    description: "Auto-generated Swagger for Cart V1 routes",
    version: "1.0.0",
  },
  servers: [
    {
      url: `${process.env.ORDER_SERVICE_URL}/api/cart`,
      description: "Cart Service API V1",
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

const outputFileCartV1 = "./swagger.cart.v1.json";
const endpointsFilesCartV1 = ["./cart/cart.routes.ts"]; // Only Cart V1 routes

// 🟢 Swagger Documentation for Order API V2
const docOrderV2 = {
  info: {
    title: "Order API V2",
    description: "Auto-generated Swagger for Order V2 routes",
    version: "2.0.0",
  },
  servers: [
    {
      url: `${process.env.ORDER_SERVICE_URL}/api/v2/orders`,
      description: "Order Service API V2",
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

const outputFileOrderV2 = "./swagger.order.v2.json";
const endpointsFilesOrderV2 = ["./order/order.routes.v2.ts"]; // Only Order V2 routes

// 🟢 Swagger Documentation for Cart API V2
const docCartV2 = {
  info: {
    title: "Cart API V2",
    description: "Auto-generated Swagger for Cart V2 routes",
    version: "2.0.0",
  },
  servers: [
    {
      url: `${process.env.ORDER_SERVICE_URL}/api/v2/carts`,
      description: "Cart Service API V2",
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

const outputFileCartV2 = "./swagger.cart.v2.json";
const endpointsFilesCartV2 = ["./cart/cart.routes.v2.ts"]; // Only Cart V2 routes

// Generate Swagger JSON files for all four versions
swaggerAutogen(outputFileOrderV1, endpointsFilesOrderV1, docOrderV1).then(() => {
  swaggerAutogen(outputFileCartV1, endpointsFilesCartV1, docCartV1).then(() => {
    swaggerAutogen(outputFileOrderV2, endpointsFilesOrderV2, docOrderV2).then(() => {
      swaggerAutogen(outputFileCartV2, endpointsFilesCartV2, docCartV2);
    });
  });
});
