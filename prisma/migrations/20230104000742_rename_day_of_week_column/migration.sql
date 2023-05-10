/*
  Warnings:

  - You are about to drop the column `dayOfWeek` on the `doctor_schedules` table. All the data in the column will be lost.
  - Added the required column `day_of_week` to the `doctor_schedules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "doctor_schedules" DROP COLUMN "dayOfWeek",
ADD COLUMN     "day_of_week" INTEGER NOT NULL;
