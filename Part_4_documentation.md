# 🧾 Part_4_documentation.md

## Teebay – Technical Documentation

This document provides a brief technical overview of how each part of the **Teebay** application was implemented.  
Teebay is a full-stack product renting and buying/selling platform built using **NestJS**, **Prisma**, **PostgreSQL**, and **GraphQL**.

---

## ⚙️ Tech Stack Overview

| Layer           | Technology                       | Purpose                                               |
| --------------- | -------------------------------- | ----------------------------------------------------- |
| **Frontend**    | React + Apollo Client            | UI rendering, GraphQL queries/mutations, Apollo cache |
| **Backend**     | NestJS (GraphQL + Apollo Server) | API, resolvers, business logic                        |
| **ORM**         | Prisma                           | Database modeling and migrations                      |
| **Database**    | PostgreSQL                       | Persistent storage                                    |
| **Environment** | dotenv + Docker                  | Config management and containerization                |
| **Validation**  | class-validator                  | Input validation                                      |

---

---

## ⚙️Codebase Architecture

- `src` folder contains the main codebase.
- `apps` folder contains the different modules of the project.
- `shared` folder contains the different service modules of the project(graphql, prisma etc).
- `utils` folder contains the utility functions used in the project.

---

## 🧩 PART 1 – Login and Registration

### Features

- User registration with `name`, `email`, and `password`.
- Simple login via email/password matching.
- Prisma ORM used for persistence.

### Implementation

- **Validation:** Implemented with `class-validator`.
- **Error Handling:** Duplicate emails or missing inputs throw structured GraphQL errors.

### Corner Cases

- Duplicate registration attempts.
- Invalid email or missing fields.

---

## 🧱 PART 2 – Product Management

### Features

- Add, edit, and delete products.
- Products can belong to multiple categories.

### Implementation

- **Categories:** Made an enum for easier access to products as the categories are fixed set of values.
- **Junction Table For Product Categories** Products and Categories have a many to many relationship which is being maintained through a junction table. However, we are using a value from the Category enum once for every entry.

### Corner Cases

- Deleting or editing a product not owned by the user is forbidden.
- Preventing duplicate category relations.
- Deleting products that are bought or rented are forbidden.

---

## 💰 PART 3 – Rent and Buy/Sell

### Features

- View all available products.
- Buy or rent a product.
- Display products a user bought, sold, borrowed, or lent.

### Implementation

- Products are marked `SOLD` or `RENTED` after transaction through isRented and isBought fields respectively.
- Rent overlaps prevented easily using the aforementioned fields.
- Renting start date cannot be in the past and end date must be after start date.

### Corner Cases

- Prevent concurrent purchases using Prisma transactions.
- Sales, Purchases and Rentals managed in one table through the Transaction type enum.

---

## 🧠 Design Decisions

- **Layered Architecture:** Each feature (auth, product, user, transaction) has its own module, entity, dto, service, and resolver.
- **Service-first Logic:** Resolvers delegate logic to services for maintainability.
- **Error Handling:** Centralized exception filters within try-catch blocks.
- **Environment Management:** `.env.development` loaded using `dotenv-cli`.
- **Reusability:** Shared utils for uid generation, shared modules for Prisma and GraphQL.

---

## 🐳 Docker & Environment Setup

### HOW TO SETUP THIS PROJECT IN YOUR LOCAL DEVICE

**Clone this GitHub Repository to your desired location : https://github.com/farhanhasindipro25/teebay-backend.git**

**.env.development**

```env
TARGET_ENV=development
PORT=8000
DB_NAME=teebay_db
DB_USER=postgres
DB_PASS=teebay
DB_PORT=5433
DATABASE_URL=postgresql://postgres:teebay@localhost:5433/teebay_db?schema=public
```

### DATABASE SETUP

1. Open PGAdmin
2. Create a new database called "teebay_db".
3. Right click on the database name and select restore.
4. Click on browse and select the 'teebay_db.sql' file located inside the 'server' directory.
5. Select 'postgres' as the role.
6. Click Restore.

## Installation

```bash
$ npm install
```

## Docker Compose (DEVELOPMENT ONLY)

```bash
# run docker compose for dev environment
$ docker compose --env-file "./configs/.env.development" up -d
```

## Migration

```bash
# run migration for dev environment
$ npm run migrate:dev
```

## Prisma Generate

```bash
# generate prisma client
$ npm run prisma:generate
```

As we are using prisma as ORM, this needs to be run after schema.prisma/migration changes in any environment. Otherwise the prisma schema will not be updated.

## Running the app

```bash
# build command
$ npm run build

# development mode
$ npm run dev
```

---
**THANK YOU**
---
