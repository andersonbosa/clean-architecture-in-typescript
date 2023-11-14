import EnterParkingLot from "../src/core/usecase/EnterParkingLot"
import GetParkingLot from "../src/core/usecase/GetParkingLot"
import { ParkingLotIsCloseError, ParkingLotIsFullError } from '../src/errors'
import ParkingLotRepositoryMemory from "../src/infra/repository/ParkingLotRepositoryMemory"
import { ParkingLotCodes } from '../src/types'

const getEnterDate = (): Date => new Date("2023-09-19 12:00:00")

test("Should get parking lot", async function () {
	const repository = new ParkingLotRepositoryMemory()
	const getParkingLot = new GetParkingLot(repository)

	const parkingLot = await getParkingLot.execute(ParkingLotCodes.shopping)

	expect(parkingLot.code).toBe(ParkingLotCodes.shopping)
})

test("Should enter parking lot", async () => {
	const repository = new ParkingLotRepositoryMemory()
	console.log('1', repository.parkingLots, repository.parkedCars)

	const getParkingLot = new GetParkingLot(repository)
	const parkingLotBeforeEnter = await getParkingLot.execute(ParkingLotCodes.shopping)

	// 1. should be empty before enter
	expect(parkingLotBeforeEnter.occupiedSpaces).toBe(0)

	const enterParkingLot = new EnterParkingLot(repository)
	console.log('2', repository.parkingLots, repository.parkedCars)
	await enterParkingLot.execute(ParkingLotCodes.shopping, "MMM-0001", getEnterDate())
	await enterParkingLot.execute(ParkingLotCodes.shopping, "MMM-0001", getEnterDate())
	await enterParkingLot.execute(ParkingLotCodes.shopping, "MMM-0001", getEnterDate())
	await enterParkingLot.execute(ParkingLotCodes.shopping, "MMM-0001", getEnterDate())
	console.log('3', repository.parkingLots, repository.parkedCars)
	const parkingLotAfterEnter = await getParkingLot.execute(ParkingLotCodes.shopping)
	// 2. should be occupied a space after enter
	expect(parkingLotAfterEnter.occupiedSpaces).toBe(1)
})

test("Should be closed", async function () {
	const repository = new ParkingLotRepositoryMemory()

	const getParkingLot = new GetParkingLot(repository)
	const parkingLotBeforeEnter = await getParkingLot.execute(ParkingLotCodes.shopping)
	expect(parkingLotBeforeEnter.occupiedSpaces).toBe(0)

	try {
		const enterParkingLot = new EnterParkingLot(repository)
		const closedHour = new Date(new Date().setHours(23))
		await enterParkingLot.execute(ParkingLotCodes.shopping, "MMM-0001", closedHour)
	} catch (error) {
		expect(error instanceof ParkingLotIsCloseError).toBe(true)
		expect(error.message).toBe("The parking lot is closed")
	}
})

test("Should be full", async () => {
	const repository = new ParkingLotRepositoryMemory()

	const getParkingLot = new GetParkingLot(repository)
	const parkingLotBeforeEnter = await getParkingLot.execute(ParkingLotCodes.shopping)
	expect(parkingLotBeforeEnter.occupiedSpaces).toBe(0)


	const enterParkingLot = new EnterParkingLot(repository)

	// Enter vehicles to fill the parking lot capacity
	for (let i = 1; i <= parkingLotBeforeEnter.capacity; i++) {
		enterParkingLot.execute(ParkingLotCodes.shopping, `MMM-000${i}`, getEnterDate())
	}

	try {
		enterParkingLot.execute(ParkingLotCodes.shopping, "MMM-0006", getEnterDate())
	} catch (error) {
		expect(error instanceof ParkingLotIsFullError).toBe(true)
		expect(error.message).toBe("The parking lot is full")
	}
})
