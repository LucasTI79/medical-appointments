/*
  Warnings:

  - You are about to drop the `Doctor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Doctor" DROP CONSTRAINT "Doctor_speciality_id_fkey";

-- DropForeignKey
ALTER TABLE "Doctor" DROP CONSTRAINT "Doctor_user_id_fkey";

-- DropTable
DROP TABLE "Doctor";

-- CreateTable
CREATE TABLE "doctors" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "crm" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "speciality_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "doctors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doctor_info" (
    "id" TEXT NOT NULL,
    "start_at" TEXT NOT NULL,
    "end_at" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "doctor_id" TEXT NOT NULL,

    CONSTRAINT "doctor_info_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "doctors_email_key" ON "doctors"("email");

-- CreateIndex
CREATE UNIQUE INDEX "doctors_crm_key" ON "doctors"("crm");

-- CreateIndex
CREATE UNIQUE INDEX "doctors_user_id_key" ON "doctors"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "doctor_info_doctor_id_key" ON "doctor_info"("doctor_id");

-- AddForeignKey
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_speciality_id_fkey" FOREIGN KEY ("speciality_id") REFERENCES "specialities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctor_info" ADD CONSTRAINT "doctor_info_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
