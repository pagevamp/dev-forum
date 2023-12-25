import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Comment from 'App/Models/Comment'

export default class CommentSeeder extends BaseSeeder {
  public async run() {
    await Comment.createMany([
      {
        thread_id: 1, // Assuming thread with ID 1 exists
        content: 'This is a comment on the first thread.',
      },
      {
        thread_id: 2, // Assuming thread with ID 2 exists
        content: 'This is a comment on the second thread.',
      },
      // Add more comments as needed
    ])
  }
}
