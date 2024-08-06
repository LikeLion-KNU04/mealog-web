/*
  Warnings:

  - Added the required column `cholesterolPenalty` to the `MealItemAnalysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eer` to the `MealItemAnalysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `energyScore` to the `MealItemAnalysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ironPenalty` to the `MealItemAnalysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `natriumPenalty` to the `MealItemAnalysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nutritionCalciumScore` to the `MealItemAnalysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nutritionCarbohydrateScore` to the `MealItemAnalysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nutritionIronScore` to the `MealItemAnalysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nutritionMagnesiumScore` to the `MealItemAnalysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nutritionPhosphorusScore` to the `MealItemAnalysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nutritionProteinScore` to the `MealItemAnalysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nutritionZincScore` to the `MealItemAnalysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phosphorusPenalty` to the `MealItemAnalysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ratioCarbohydrateScore` to the `MealItemAnalysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ratioFatScore` to the `MealItemAnalysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ratioProteinScore` to the `MealItemAnalysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ratioTransfatScore` to the `MealItemAnalysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalNutritionScore` to the `MealItemAnalysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPenalty` to the `MealItemAnalysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalRatioScore` to the `MealItemAnalysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalScore` to the `MealItemAnalysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zincPenalty` to the `MealItemAnalysis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `MealItemAnalysis` ADD COLUMN `cholesterolPenalty` DOUBLE NOT NULL,
    ADD COLUMN `eer` DOUBLE NOT NULL,
    ADD COLUMN `energyScore` DOUBLE NOT NULL,
    ADD COLUMN `ironPenalty` DOUBLE NOT NULL,
    ADD COLUMN `natriumPenalty` DOUBLE NOT NULL,
    ADD COLUMN `nutritionCalciumScore` DOUBLE NOT NULL,
    ADD COLUMN `nutritionCarbohydrateScore` DOUBLE NOT NULL,
    ADD COLUMN `nutritionIronScore` DOUBLE NOT NULL,
    ADD COLUMN `nutritionMagnesiumScore` DOUBLE NOT NULL,
    ADD COLUMN `nutritionPhosphorusScore` DOUBLE NOT NULL,
    ADD COLUMN `nutritionProteinScore` DOUBLE NOT NULL,
    ADD COLUMN `nutritionZincScore` DOUBLE NOT NULL,
    ADD COLUMN `phosphorusPenalty` DOUBLE NOT NULL,
    ADD COLUMN `ratioCarbohydrateScore` DOUBLE NOT NULL,
    ADD COLUMN `ratioFatScore` DOUBLE NOT NULL,
    ADD COLUMN `ratioProteinScore` DOUBLE NOT NULL,
    ADD COLUMN `ratioTransfatScore` DOUBLE NOT NULL,
    ADD COLUMN `totalNutritionScore` DOUBLE NOT NULL,
    ADD COLUMN `totalPenalty` DOUBLE NOT NULL,
    ADD COLUMN `totalRatioScore` DOUBLE NOT NULL,
    ADD COLUMN `totalScore` DOUBLE NOT NULL,
    ADD COLUMN `zincPenalty` DOUBLE NOT NULL;
