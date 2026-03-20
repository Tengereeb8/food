/*
  Warnings:

  - The `status` column on the `FoodOrder` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `age` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "FoodOrderStatusEnum" AS ENUM ('PENDING', 'CANCELED', 'DELIVERED');

-- CreateEnum
CREATE TYPE "UserRoleEnum" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "FoodOrder" DROP COLUMN "status",
ADD COLUMN     "status" "FoodOrderStatusEnum" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "age",
DROP COLUMN "createdAt",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "role" "UserRoleEnum" NOT NULL DEFAULT 'USER';
