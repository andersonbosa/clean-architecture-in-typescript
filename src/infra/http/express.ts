import Express from 'express'
import helmet from 'helmet'
import ExpressAdapter from '../../adapter/ExpressAdapter'
import ParkingLotController from '../../controller/ParkingLotController'

const app = Express()

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "script-src": ["'self'", "https://andersonbosa.github.io"],
      },
    },
  })
)

app.get("/parkingLots/:code", ExpressAdapter.create(ParkingLotController.getParkingLot))

app.use((req, res, next) => {
  return res.status(404).send('Not Found')
})

app.listen(3000, () => { console.log("☘️ Express.js running on http://localhost:3000") })