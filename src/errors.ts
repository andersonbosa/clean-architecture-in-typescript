export class ParkingLotIsFullError extends Error {
  constructor(args) {
    super(args)
    this.name = "ParkingLotIsFullError"
  }
}

export class ParkingLotIsCloseError extends Error {
  constructor(args) {
    super(args)
    this.name = "ParkingLotIsCloseError"
  }
}