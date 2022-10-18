/*
  Warnings:

  - Added the required column `weight` to the `ExerciseSet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExerciseSet" ADD COLUMN     "weight" DOUBLE PRECISION NOT NULL;
