/*
  Warnings:

  - The values [Present,Absent,Late,Excused] on the enum `AttendanceStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `educationLevel` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `schooldGrade` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `Course` table. All the data in the column will be lost.
  - The `shift` column on the `Course` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `evaluationType` on the `Evaluation` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Evaluation` table. All the data in the column will be lost.
  - The `term` column on the `Evaluation` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `enrollmentCode` on the `Student` table. All the data in the column will be lost.
  - The `gender` column on the `Student` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `institutionName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `teachingLevel` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `EvaluationResult` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[dni]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `grade` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Evaluation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Evaluation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passwordHash` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AttendanceStatus_new" AS ENUM ('PRESENT', 'ABSENT', 'LATE', 'JUSTIFIED');
ALTER TABLE "Attendance" ALTER COLUMN "status" TYPE "AttendanceStatus_new" USING ("status"::text::"AttendanceStatus_new");
ALTER TYPE "AttendanceStatus" RENAME TO "AttendanceStatus_old";
ALTER TYPE "AttendanceStatus_new" RENAME TO "AttendanceStatus";
DROP TYPE "AttendanceStatus_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "EvaluationResult" DROP CONSTRAINT "EvaluationResult_evaluationId_fkey";

-- DropForeignKey
ALTER TABLE "EvaluationResult" DROP CONSTRAINT "EvaluationResult_studentId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "educationLevel",
DROP COLUMN "schooldGrade",
DROP COLUMN "studentId",
ADD COLUMN     "grade" TEXT NOT NULL,
ADD COLUMN     "level" TEXT NOT NULL,
DROP COLUMN "shift",
ADD COLUMN     "shift" TEXT;

-- AlterTable
ALTER TABLE "Evaluation" DROP COLUMN "evaluationType",
DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
DROP COLUMN "term",
ADD COLUMN     "term" TEXT;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "enrollmentCode",
ADD COLUMN     "dni" TEXT,
DROP COLUMN "gender",
ADD COLUMN     "gender" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "institutionName",
DROP COLUMN "password",
DROP COLUMN "teachingLevel",
DROP COLUMN "updatedAt",
ADD COLUMN     "level" TEXT,
ADD COLUMN     "passwordHash" TEXT NOT NULL,
ADD COLUMN     "school" TEXT;

-- DropTable
DROP TABLE "EvaluationResult";

-- DropEnum
DROP TYPE "EducationLevel";

-- DropEnum
DROP TYPE "EvaluationType";

-- DropEnum
DROP TYPE "Gender";

-- DropEnum
DROP TYPE "Shift";

-- DropEnum
DROP TYPE "Term";

-- CreateTable
CREATE TABLE "Grade" (
    "id" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "observation" TEXT,
    "studentId" TEXT NOT NULL,
    "evaluationId" TEXT NOT NULL,

    CONSTRAINT "Grade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_dni_key" ON "Student"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_evaluationId_fkey" FOREIGN KEY ("evaluationId") REFERENCES "Evaluation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
