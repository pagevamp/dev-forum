import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Thread from 'App/Models/Thread'

export default class ThreadController {
  public async create({ request, auth, response }: HttpContextContract) {
    const newThreadSchema = schema.create({
      title: schema.string(),
      details: schema.string(),
      tags: schema.array().members(schema.string()),
    })

    if (!auth.user?.id) {
      return response.forbidden({ error: 'Unauthorized' })
    }

    const payload = await request.validate({ schema: newThreadSchema })

    return Thread.create({
      ...payload,
      user_id: auth.user?.id as number,
    })
  }
}
