-- DropIndex
DROP INDEX "Event_description_key";

-- DropIndex
DROP INDEX "Event_theme_key";

-- DropIndex
DROP INDEX "User_name_key";

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "description" DROP NOT NULL;
