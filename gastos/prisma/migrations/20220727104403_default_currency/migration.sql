/*
  Warnings:

  - You are about to drop the `AuthToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Sheet" ADD COLUMN     "defaultCurrency" TEXT NOT NULL DEFAULT 'PHP';

-- DropTable
DROP TABLE "AuthToken";
