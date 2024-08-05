/*
  Warnings:

  - A unique constraint covering the columns `[mealItemId]` on the table `MealItemAnalysis` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `amount` to the `MealItemAnalysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `classId` to the `MealItemAnalysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `className` to the `MealItemAnalysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `confidence` to the `MealItemAnalysis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `MealItemAnalysis` ADD COLUMN `amount` DOUBLE NOT NULL,
    ADD COLUMN `classId` INTEGER NOT NULL,
    ADD COLUMN `className` VARCHAR(191) NOT NULL,
    ADD COLUMN `confidence` DOUBLE NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `MealItemAnalysis_mealItemId_key` ON `MealItemAnalysis`(`mealItemId`);
