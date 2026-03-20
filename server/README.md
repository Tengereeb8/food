# Express + Prisma + Neon Setup

A modern Node.js backend with TypeScript, Express, Prisma ORM, and Neon PostgreSQL database.

## Prerequisites

- Node.js 18+
- npm or yarn
- Neon account (https://console.neon.tech)

## Setup

### 1. Environment Configuration

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Add your Neon database URL:

```
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
```

### 2. Initialize Prisma

Generate the Prisma client:

```bash
npm run prisma:generate
```

Run migrations:

```bash
npm run prisma:migrate
```

### 3. Development

Start the development server with hot reload:

```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Run production build
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio

## Project Structure

```
.
├── src/
│   └── index.ts          # Main application file
├── prisma/
│   └── schema.prisma     # Database schema
├── dist/                 # Compiled output
├── package.json
├── tsconfig.json
└── .env                  # Environment variables
```

## API Endpoints

- `GET /health` - Health check
- `GET /users` - Get all users
- `POST /users` - Create a new user

## Database

This project uses Neon PostgreSQL with Prisma ORM. Schema modifications should be made in `prisma/schema.prisma`, then run migrations.

## Notes

- Type-safe database queries with Prisma
- Hot reload during development
- Full TypeScript support
