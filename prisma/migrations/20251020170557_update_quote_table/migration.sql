/*
  Warnings:

  - Changed the type of `createdAt` on the `Quote` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `category` on table `Quote` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `Quote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quote" DROP COLUMN "createdAt",
ADD COLUMN     "createdAt" BIGINT NOT NULL,
ALTER COLUMN "category" SET NOT NULL,
DROP COLUMN "updatedAt",
ADD COLUMN     "updatedAt" BIGINT NOT NULL;
