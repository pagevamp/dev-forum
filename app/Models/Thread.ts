import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Comment from './Comment'

export enum ThreadStatus {
  OPEN = 'open',
  CLOSE = 'closed',
}

export default class Thread extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public user_id: number

  @column({ serializeAs: null, prepare: (value) => JSON.stringify(value) })
  public tags: string[]

  @column()
  public title: string

  @column()
  public details: string

  @column()
  public code_example: string | null

  @column()
  public how_to_replicate: string | null

  @column({
    consume: (value: string) => value as ThreadStatus,
    serialize: (value: ThreadStatus) => value,
  })
  public status: ThreadStatus

  @belongsTo(() => User, { foreignKey: 'user_id' })
  public user: BelongsTo<typeof User>

  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>
}
