import Hapi from "@hapi/hapi"
import HapiAdapter from "../../adapter/HapiAdapter"
import ParkingLotController from "../../controller/ParkingLotController"

const server = Hapi.server({
  port: 3001,
  host: "localhost",
  debug: { request: ['error'] } /* https://hapi.dev/tutorials/logging/?lang=en_US */
})

server.route({
  method: "GET",
  path: "/parkingLots/{code}",
  handler: HapiAdapter.create(ParkingLotController.getParkingLot)
})

server.route({
  method: '*',
  path: '/{any*}',
  handler: function (_, h) {
    return h.response('Not found').code(404)
  }
})

server.start()