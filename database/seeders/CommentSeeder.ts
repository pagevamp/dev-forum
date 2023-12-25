import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Comment from 'App/Models/Comment'
import Thread from 'App/Models/Thread'

export default class CommentSeeder extends BaseSeeder {
  public async run() {
    const threads = await Thread.all()
    await Promise.all(
      threads.map(async (thread, index) => {
        await Comment.createMany([
          {
            thread_id: thread.id, // Assuming thread with ID 1 exists
            content: 'This is a comment on the first thread.',
          },
          {
            thread_id: thread.id, // Assuming thread with ID 2 exists
            content: 'This is a comment on the second thread.',
          },
          // Add more comments as needed
        ])

        if (index === 0) {
          thread.answer_id = 1
          await thread.save()
        }
      })
    )
  }
}
