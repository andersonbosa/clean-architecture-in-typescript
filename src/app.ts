import express from 'express'

const app = express()

app.use(express.json())

/* TODO: hardening on HTTP Headers */
/* TODO: add limit to requests */

app.use('/api', async (req, res, next) => {
  console.log('oi potato')
})


app.listen(3000, () => {
  console.log("by Rodrigo  sarah linda te amo")
})