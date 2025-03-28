import dotenv from "dotenv";
dotenv.config();

import express, { Express, Request, Response } from "express";
import cors from "cors";
import orderRoutes from "./order/order.routes";
import orderRoutesV2 from "./order/order.routes.v2";
import cartRoutes from "./cart/cart.routes";
import cartRoutesV2 from "./cart/cart.routes.v2";
import express_prom_bundle from "express-prom-bundle";
import swaggerUi from "swagger-ui-express";
const fs = require("fs");

const app: Express = express();

// Load Swagger JSON files
const swaggerOrderV1 = JSON.parse(fs.readFileSync("./src/swagger.order.v1.json"));
const swaggerCartV1 = JSON.parse(fs.readFileSync("./src/swagger.cart.v1.json"));
const swaggerOrderV2 = JSON.parse(fs.readFileSync("./src/swagger.order.v2.json"));
const swaggerCartV2 = JSON.parse(fs.readFileSync("./src/swagger.cart.v2.json"));

// Serve Swagger UI for each version
app.use("/api/order/api-docs", swaggerUi.serveFiles(swaggerOrderV1), swaggerUi.setup(swaggerOrderV1));
app.use("/api/cart/api-docs", swaggerUi.serveFiles(swaggerCartV1), swaggerUi.setup(swaggerCartV1));
app.use("/api/v2/orders/api-docs", swaggerUi.serveFiles(swaggerOrderV2), swaggerUi.setup(swaggerOrderV2));
app.use("/api/v2/carts/api-docs", swaggerUi.serveFiles(swaggerCartV2), swaggerUi.setup(swaggerCartV2));

// Prometheus metrics middleware
const metricsMiddleware = express_prom_bundle({
  includeMethod: true,
  includePath: true,
  includeStatusCode: true,
  includeUp: true,
  customLabels: { project_name: 'orders-service' },
  promClient: {
    collectDefaultMetrics: {}
  }
});

// Middleware
app.use(metricsMiddleware);
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/order', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/v2/orders', orderRoutesV2);
app.use('/api/v2/carts', cartRoutesV2);

// Health check endpoint
app.get('/health', (_, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Root endpoint
app.get('/', (_, res) => {
  res.status(200).json({
    message: 'Marketplace Orders API',
    version: '1.0.0'
  });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: 'Not Found',
    path: req.path
  });
});

const PORT = process.env.PORT || 8002;

app.listen(PORT, () => {
  console.log(`Orders Service running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});

export default app;