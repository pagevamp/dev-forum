import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UserController {
  public async index(_ctx: HttpContextContract) {
    return User.first()
  }
}
