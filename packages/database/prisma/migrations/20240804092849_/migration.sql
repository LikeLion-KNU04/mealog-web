/*
  Warnings:

  - Added the required column `height` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `height` INTEGER NOT NULL,
    ADD COLUMN `weight` INTEGER NOT NULL;
