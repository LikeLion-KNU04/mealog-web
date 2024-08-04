/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - The required column `userId` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`userId`);

-- CreateTable
CREATE TABLE `Meal` (
    `mealId` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`mealId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MealItem` (
    `mealItemId` VARCHAR(191) NOT NULL,
    `mealId` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `MealItem_mealId_idx`(`mealId`),
    PRIMARY KEY (`mealItemId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MealItemAnalysis` (
    `mealItemAnalysisId` VARCHAR(191) NOT NULL,
    `mealItemId` VARCHAR(191) NOT NULL,
    `kcal` DOUBLE NOT NULL,
    `carbohydrate` DOUBLE NOT NULL,
    `sugars` DOUBLE NOT NULL,
    `fat` DOUBLE NOT NULL,
    `protein` DOUBLE NOT NULL,
    `calcium` DOUBLE NOT NULL,
    `phosphorus` DOUBLE NOT NULL,
    `natrium` DOUBLE NOT NULL,
    `kalium` DOUBLE NOT NULL,
    `magnesium` DOUBLE NOT NULL,
    `iron` DOUBLE NOT NULL,
    `zinc` DOUBLE NOT NULL,
    `cholesterol` DOUBLE NOT NULL,
    `transfat` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `MealItemAnalysis_mealItemId_idx`(`mealItemId`),
    PRIMARY KEY (`mealItemAnalysisId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
