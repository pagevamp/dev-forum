import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Thread from './Thread'
import { format } from 'date-fns'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public thread_id: number

  @column()
  public content: string

  @belongsTo(() => User, { foreignKey: 'user_id' })
  public user: BelongsTo<typeof User>

  @belongsTo(() => Thread, { foreignKey: 'thread_id' })
  public thread: BelongsTo<typeof Thread>

  @column.dateTime({ autoCreate: true, consume: (value: string) => format(value, 'Lo LLL yyyy') })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
