export default class HapiAdapter {
  static create (fn) {
    return async function (req, reply) {
      const obj = await fn(req.params, req.payload)

      if (!obj) {
        return reply.response('Not found').code(404)
      }

      return obj
    }
  }
}