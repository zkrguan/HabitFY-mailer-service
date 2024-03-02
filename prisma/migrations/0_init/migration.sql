BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[__EFMigrationsHistory] (
    [MigrationId] NVARCHAR(150) NOT NULL,
    [ProductVersion] NVARCHAR(32) NOT NULL,
    CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED ([MigrationId])
);

-- CreateTable
CREATE TABLE [dbo].[Goals] (
    [Id] INT NOT NULL IDENTITY(1,1),
    [Description] NVARCHAR(max) NOT NULL,
    [StartDate] DATETIME2 NOT NULL,
    [EndDate] DATETIME2 NOT NULL,
    [LastUpdated] DATETIME2 NOT NULL,
    [CreatedTime] DATETIME2 NOT NULL,
    [IsActivated] BIT NOT NULL,
    [IsQuitting] BIT NOT NULL,
    [GoalValue] FLOAT(53) NOT NULL,
    [ProfileId] NVARCHAR(450),
    CONSTRAINT [PK_Goals] PRIMARY KEY CLUSTERED ([Id])
);

-- CreateTable
CREATE TABLE [dbo].[ProgressRecords] (
    [Id] INT NOT NULL IDENTITY(1,1),
    [CreatedTime] DATETIME2 NOT NULL,
    [Notes] NVARCHAR(max),
    [CompletedValue] FLOAT(53) NOT NULL,
    [GoalId] INT NOT NULL,
    CONSTRAINT [PK_ProgressRecords] PRIMARY KEY CLUSTERED ([Id])
);

-- CreateTable
CREATE TABLE [dbo].[Userprofiles] (
    [Id] NVARCHAR(450) NOT NULL,
    [Sex] NVARCHAR(max),
    [Province] NVARCHAR(max),
    [City] NVARCHAR(max),
    [PostalCode] NVARCHAR(max),
    [Age] INT,
    [NeedReport] BIT NOT NULL CONSTRAINT [DF__Userprofi__needR__6E01572D] DEFAULT CONVERT([bit],(0)),
    CONSTRAINT [PK_Userprofiles] PRIMARY KEY CLUSTERED ([Id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IX_Goals_ProfileId] ON [dbo].[Goals]([ProfileId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IX_ProgressRecords_GoalId] ON [dbo].[ProgressRecords]([GoalId]);

-- AddForeignKey
ALTER TABLE [dbo].[Goals] ADD CONSTRAINT [FK_Goals_Userprofiles_ProfileId] FOREIGN KEY ([ProfileId]) REFERENCES [dbo].[Userprofiles]([Id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[ProgressRecords] ADD CONSTRAINT [FK_ProgressRecords_Goals_GoalId] FOREIGN KEY ([GoalId]) REFERENCES [dbo].[Goals]([Id]) ON DELETE CASCADE ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

