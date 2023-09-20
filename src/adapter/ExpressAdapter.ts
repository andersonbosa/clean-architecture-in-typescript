export default class ExpressAdapter {
  static create (fn) {
    return async function (req, res) {
      try {
        const obj = await fn(req.params, req.body)

        if (!obj) {
          return res.send(404)
        }

        return res.json(obj)

      } catch (error) {
        throw error
      }
    }
  }
}