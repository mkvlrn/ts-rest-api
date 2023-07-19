/*
  Warnings:

  - The primary key for the `sessions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `data` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `sessions` table. All the data in the column will be lost.
  - Added the required column `expire` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sess` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "sessions_sid_key";

-- AlterTable
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_pkey",
DROP COLUMN "data",
DROP COLUMN "expiresAt",
DROP COLUMN "id",
ADD COLUMN     "expire" TIMESTAMP(6) NOT NULL,
ADD COLUMN     "sess" JSON NOT NULL,
ADD CONSTRAINT "sessions_pkey" PRIMARY KEY ("sid");

-- CreateIndex
CREATE INDEX "IDX_session_expire" ON "sessions"("expire");
