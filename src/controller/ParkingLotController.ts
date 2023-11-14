import GetParkingLot from '../core/usecase/GetParkingLot'
import ParkingLotRepositoryMemory from '../infra/repository/ParkingLotRepositoryMemory'
import ParkingLotRepositoryPrisma from '../infra/repository/ParkingLotRepositoryPrisma'


export default class ParkingLotController {
  static async getParkingLot (params, body) {
    try {
      // const repository = new ParkingLotRepositoryPrisma()
      const repository = new ParkingLotRepositoryMemory()

      const getParkingLot = new GetParkingLot(repository)

      return await getParkingLot.execute(params.code);

    } catch (error) {
      return undefined
    }
  }
}
