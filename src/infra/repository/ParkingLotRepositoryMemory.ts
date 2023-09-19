import ParkingLotAdapter from "../../adapter/ParkingLotAdapter"
import ParkingLot from "../../core/entity/ParkingLot"
import ParkingLotRepository from "../../core/repository/ParkingLotRepository"

export const ParkingLotCodes = {
  shopping: 'shopping_21b0c8d7',
  central_park: 'central_park_4db6c371'
}

export default class ParkingLotRepositoryMemory implements ParkingLotRepository {

  parkingLots = [
    {
      code: ParkingLotCodes.shopping,
      capacity: 5,
      open_hour: 8,
      close_hour: 22
    }
  ];

  parkedCars = [];

  getParkingLot (code: string): Promise<ParkingLot> {
    const parkingLotData = this.parkingLots.find(parkingLot => parkingLot.code === code)
    const occupiedSpaces = this.parkedCars.length
    const parkingLot = ParkingLotAdapter.create(parkingLotData.code, parkingLotData.capacity, parkingLotData.open_hour, parkingLotData.close_hour, occupiedSpaces)
    return Promise.resolve(parkingLot)
  }

  saveParkedCar (code: string, plate: string, date: Date): void {
    this.parkedCars.push({ code, plate, date })
  }
}