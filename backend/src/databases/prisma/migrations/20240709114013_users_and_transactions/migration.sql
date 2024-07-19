/*
  Warnings:

  - You are about to drop the column `name` on the `UserDetails` table. All the data in the column will be lost.
  - Added the required column `Fname` to the `UserDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Sname` to the `UserDetails` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[UserDetails] DROP COLUMN [name];
ALTER TABLE [dbo].[UserDetails] ADD [Fname] NVARCHAR(1000) NOT NULL,
[Sname] NVARCHAR(1000) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
