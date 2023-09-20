import ParkingLot from "../../core/entity/ParkingLot"
import ParkingLotRepository from "../../core/repository/ParkingLotRepository"
import DatabaseClient from '../database/prisma'

export default class PrismaParkingLotRepository implements ParkingLotRepository {
  async getParkingLot (code: string): Promise<ParkingLot | null> {
    return await DatabaseClient.parkingLot.findUnique({ where: { code } })
  }

  async saveParkedCar (code: string, plate: string, date: Date): Promise<void> {
    await DatabaseClient.parkedCar.create({
      data: {
        code,
        plate,
        enterDate: date,
      },
    })
  }
}
