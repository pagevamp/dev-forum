import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Thread, { ThreadStatus } from 'App/Models/Thread'

export default class ThreadSeeder extends BaseSeeder {
  public async run() {
    await Thread.createMany([
      {
        user_id: 1,
        tags: ['tag1', 'tag2'],
        title: 'First Thread',
        details: 'Details of the first thread.',
        code_example: 'Code example for the first thread.',
        how_to_replicate: 'Steps to replicate the issue for the first thread.',
        status: ThreadStatus.OPEN,
      },
      {
        user_id: 1, // Assuming user with ID 2 exists
        tags: ['tag3', 'tag4'],
        title: 'Second Thread',
        details: 'Details of the second thread.',
        code_example: 'Code example for the second thread.',
        how_to_replicate: 'Steps to replicate the issue for the second thread.',
        status: ThreadStatus.OPEN, // Use 'closed' or 'open' based on the enum values
      },
      // Add more threads as needed
    ])
  }
}
