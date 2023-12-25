import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Thread from 'App/Models/Thread'

export default class ThreadController {
  public async index({ view }: HttpContextContract) {
    const threads = Thread.all()
    return view.render('threads', { threads })
  }

  public async search({ request, view }: HttpContextContract) {
    const params = request.params()
    const threads = Thread.query()
      .where('title', 'ilike', `%${params.search}%`)
      .orWhere('tags', 'ilike', `%${params.search}%`)
      .select(['id', 'title', 'tags', 'details'])

    return view.render('threads', { thread: threads?.[0] })
  }

  public async show({ request, view }: HttpContextContract) {
    const params = request.params()
    const threads = await Thread.query().where('id', params.id).preload('comments')

    return view.render('detail', { thread: threads?.[0] })
  }

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

    const thread = await Thread.create({
      ...payload,
      user_id: auth.user?.id as number,
    })

    response.redirect(`/threads/${thread.id}`)
  }
}
