/*
  Warnings:

  - A unique constraint covering the columns `[userId,achievementId]` on the table `UserAchievements` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserAchievements_userId_achievementId_key" ON "UserAchievements"("userId", "achievementId");
