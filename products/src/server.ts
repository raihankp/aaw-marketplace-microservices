import dotenv from "dotenv";
dotenv.config();

import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import productRoutes from './product/product.routes'
import productRoutesV2 from './product/product.routes.v2'
import express_prom_bundle from "express-prom-bundle";
import swaggerUi from "swagger-ui-express";
const fs = require("fs");

const app: Express = express();

// Load Swagger JSON files
const swaggerV1 = JSON.parse(fs.readFileSync("./src/swagger.v1.json"));
const swaggerV2 = JSON.parse(fs.readFileSync("./src/swagger.v2.json"));
app.use("/api/product/api-docs", swaggerUi.serveFiles(swaggerV1), swaggerUi.setup(swaggerV1));
app.use("/api/v2/products/api-docs", swaggerUi.serveFiles(swaggerV2), swaggerUi.setup(swaggerV2));

// Prometheus metrics middleware
const metricsMiddleware = express_prom_bundle({
  includeMethod: true,
  includePath: true,
  includeStatusCode: true,
  includeUp: true,
  customLabels: { project_name: 'products-service' },
  promClient: {
    collectDefaultMetrics: {}
  }
});

// Middleware
app.use(metricsMiddleware);
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/product", productRoutes);
app.use("/api/v2/products", productRoutesV2);

// Health check endpoint
app.get('/health', (_, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Root endpoint
app.get('/', (_, res) => {
  res.status(200).json({
    message: 'Marketplace Products API',
    version: '1.0.0'
  });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: 'Not Found',
    path: req.path
  });
});

const PORT = process.env.PORT || 8003;

app.listen(PORT, () => {
  console.log(`Products Service running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});

export default app;