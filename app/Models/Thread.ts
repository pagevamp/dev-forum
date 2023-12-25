import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  HasMany,
  HasOne,
  belongsTo,
  column,
  hasMany,
  hasOne,
} from '@ioc:Adonis/Lucid/Orm'
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

  @column()
  public answer_id: number

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

  @hasMany(() => Comment, { foreignKey: 'thread_id' })
  public comments: HasMany<typeof Comment>

  @hasOne(() => Comment, { foreignKey: 'answer_id' })
  public answer: HasOne<typeof Comment>
}
