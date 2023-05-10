-- AlterTable
ALTER TABLE "appointments" ALTER COLUMN "is_finished" SET DEFAULT false,
ALTER COLUMN "note" DROP NOT NULL;
