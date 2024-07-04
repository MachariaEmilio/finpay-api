/*
  Warnings:

  - The primary key for the `transactionrecord` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
BEGIN TRY

BEGIN TRAN;

-- RedefineTables
BEGIN TRANSACTION;
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'transactionrecord'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_transactionrecord] (
    [transaction_id] NVARCHAR(1000) NOT NULL,
    [receiver_id] INT NOT NULL,
    [sender_id] INT NOT NULL,
    [amount] INT NOT NULL,
    [timestamp] DATETIME2 NOT NULL,
    CONSTRAINT [transactionrecord_pkey] PRIMARY KEY CLUSTERED ([transaction_id])
);
IF EXISTS(SELECT * FROM [dbo].[transactionrecord])
    EXEC('INSERT INTO [dbo].[_prisma_new_transactionrecord] ([amount],[receiver_id],[sender_id],[timestamp],[transaction_id]) SELECT [amount],[receiver_id],[sender_id],[timestamp],[transaction_id] FROM [dbo].[transactionrecord] WITH (holdlock tablockx)');
DROP TABLE [dbo].[transactionrecord];
EXEC SP_RENAME N'dbo._prisma_new_transactionrecord', N'transactionrecord';
COMMIT;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
