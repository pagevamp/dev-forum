import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Comment from 'App/Models/Comment'

export default class CommentController {
  public async create({ request, auth, response }: HttpContextContract) {
    const params = request.params()
    const newCommentSchema = schema.create({
      content: schema.string(),
    })

    if (!auth.user?.id) {
      return response.forbidden({ error: 'Unauthorized' })
    }

    const payload = await request.validate({ schema: newCommentSchema })

    return Comment.create({
      ...payload,
      thread_id: params.threadId,
      user_id: auth.user?.id as number,
    })
  }
}
