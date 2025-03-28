# Marketplace API

## Step By Step
1. masuk docker exec untuk service authentication, jalankan "node generateAdminToken.js" di /dist/src/generateAdminToken.js sebanyak 2x sampai dapet token
2. masukin ke postman, check di /api/auth/verify-admin-token bener apa tidak tokennya, kalau benar, masukin ke authorization bearer
3. buat tenant baru dan copy tenant_id nya
4. close container, buka docker-compose.yaml lalu masukkan TENANT_ID={tennat_id_baru} di bagian environtments untuk SEMUA service kecuali tenant
5. jalankan "docker compose up -d --force-recreate" lalu buka docker, ke inspect dan env, pastiin udah keganti
6. gunain tokennya admin untuk create category & product
7. register akun sendiri dan login biar dapet tokennya dan ganti token di authorization bearernya jdi punya user
8. lakukan sisanya (get all category, product, add to cart, order, dll)

Notes: 
- yang butuh tenant_id diupdate adalah (order, product, wishlist, authentication)
- yang butuh admin_tenant_id adalah (authentication untuk verify admintokenservice)
- somehow admin_tenant_id ini tidak berhubungan dengan tenant samsek, tapi berhubungan sama pembuatan generateAdminToken
- khusus service tenant gabutuh tenant_id ya karena dia pembuat tenantnya
- service product (khusus untuk post dan put dan delete) & tenant, mereka manggil verify-admin-token (terlihat dari verifyJWTProduct) sehingga token yg dipke di authorization bearer adalah admin token, bukan user token
- semua service lainnya (kecuali product yg post put delete & service tenant) perlu token user, bukan token admin



## Overview

REST API for a marketplace application built with Express.js, PostgreSQL, and Drizzle ORM.

## Prerequisites

- Node.js 18.18.2
- pnpm
- Docker and Docker Compose
- PostgreSQL (if running locally)

## Quick Start with Docker

```bash
# Clone the repository
git clone <repository-url>

# Copy environment file
cp .env.example .env

# Start with Docker Compose
docker compose up
```

## Local Development Setup

```bash
# Install dependencies
pnpm install

# Setup database
pnpm run generate # Generate migrations

pnpm run migrate # Run migrations

# Start development server
pnpm dev

```

## Environment Variables

Copy .env.example to .env and configure:

```
TENANT_ID=47dd6b24-0b23-46b0-a662-776158d089ba
JWT_SECRET=auth_ms_jwt_secret
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=postgres
PORT=8000
NODE_ENV=development

```

## Available Scripts

```bash
pnpm dev # Development mode with hot reload
pnpm build # Build production
pnpm start # Start production server
pnpm generate # Generate DB migrations
pnpm migrate # Run DB migrations
```

## API Endpoints

Base URL: http://localhost:8000

## Core endpoints

```
GET /health - Health check
GET / - API information
GET /api/product - List products
POST /api/auth - Authentication
GET /api/order - Orders
GET /api/cart - Shopping cart
```

## Database Schema

Managed through Drizzle ORM with migrations in drizzle directory.
