
const CODES = {
  SHOPPING: 'shopping.b0af8d02',
  CENTRAL_PARK: 'b0af8d02'
}

export default class ParkingLotRepositoryMemory {
  parkingLots: { code: string }[]
  parkedCars: never[]
  
  constructor () {
    this.parkingLots = [
      {
        code: CODES.SHOPPING,
      }
    ]

    this.parkedCars = []
  }
}