/*
  Warnings:

  - A unique constraint covering the columns `[date,studentId,courseId]` on the table `Attendance` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Attendance" ALTER COLUMN "date" SET DATA TYPE DATE;

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_date_studentId_courseId_key" ON "Attendance"("date", "studentId", "courseId");
