import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Thread from 'App/Models/Thread'
import { parse } from 'date-fns'

export default class ThreadController {
  public async index({ view }: HttpContextContract) {
    const threads = await Thread.all()
    return view.render('index', { threads })
  }

  public async search({ request, view }: HttpContextContract) {
    const searchParam = request.input('search')
    const threads = await Thread.query()
      .where('title', 'like', `%${searchParam}%`)
      .orWhere('tags', 'like', `%${searchParam}%`)
      .select(['id', 'title', 'tags', 'details'])

    return view.render('index', { threads, search: searchParam })
  }

  public async show({ request, view, response }: HttpContextContract) {
    const params = request.params()
    const threads = await Thread.query().where('id', params.id).preload('comments')
    const thread = threads?.[0]
    if (!thread) {
      return response.notFound()
    }

    return view.render('detail', { thread })
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
