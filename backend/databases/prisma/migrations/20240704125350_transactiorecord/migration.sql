BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[transactionrecord] (
    [transaction_id] INT NOT NULL IDENTITY(1,1),
    [receiver_id] INT NOT NULL,
    [sender_id] INT NOT NULL,
    [amount] INT NOT NULL,
    [timestamp] DATETIME2 NOT NULL,
    CONSTRAINT [transactionrecord_pkey] PRIMARY KEY CLUSTERED ([transaction_id])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
