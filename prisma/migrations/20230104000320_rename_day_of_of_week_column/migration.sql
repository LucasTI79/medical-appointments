/*
  Warnings:

  - You are about to drop the column `dayOdWeek` on the `doctor_schedules` table. All the data in the column will be lost.
  - Added the required column `dayOfWeek` to the `doctor_schedules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "doctor_schedules" DROP COLUMN "dayOdWeek",
ADD COLUMN     "dayOfWeek" INTEGER NOT NULL;
