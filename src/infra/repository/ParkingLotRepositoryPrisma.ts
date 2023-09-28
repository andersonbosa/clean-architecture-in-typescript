import { PrismaClient } from '@prisma/client'
import ParkingLot from "../../core/entity/ParkingLot"
import ParkingLotRepository from "../../core/repository/ParkingLotRepository"
import dbClient from '../database/prisma'
import ParkingLotAdapter from '../../adapter/ParkingLotAdapter'


export default class ParkingLotRepositoryPrisma implements ParkingLotRepository {

  /* TODO */
  async getParkingLot (code: string): Promise<ParkingLot> {
    const parkingLotData = await dbClient.parkingLot.findUnique({ where: { code } })
    const occupiedSpaces = await dbClient.parkedCar.count()

    const parkingLot = ParkingLotAdapter.create(
      parkingLotData.code,
      parkingLotData.capacity,
      parkingLotData.openHour,
      parkingLotData.closeHour,
      occupiedSpaces
    )

    return parkingLot
  }

  /* TODO */
  saveParkedCar (code: string, plate: string, date: Date): void {
    debugger
    // this.parkedCars.push({ code, plate, date })
  }
}