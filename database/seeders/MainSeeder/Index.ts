import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import UserSeeder from '../UserSeeder'
import ThreadSeeder from '../ThreadSeeder'
import CommentSeeder from '../CommentSeeder'

export default class extends BaseSeeder {
  private async runSeeder(Seeder: typeof BaseSeeder) {
    await new Seeder(this.client).run()
  }

  public async run() {
    await this.runSeeder(UserSeeder)
    await this.runSeeder(ThreadSeeder)
    await this.runSeeder(CommentSeeder)
  }
}
