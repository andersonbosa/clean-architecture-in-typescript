-- CreateTable
CREATE TABLE "ParkingLot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "openHour" DATETIME NOT NULL,
    "closeHour" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ParkedCar" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "Date" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ParkingLot_code_key" ON "ParkingLot"("code");
