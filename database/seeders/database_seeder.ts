import { BaseSeeder } from '@adonisjs/lucid/seeders'
import UsersSeeder from './user_seeder.js'
import AtmsSeeder from './atm_seeder.js'
import LoadingSeeder from './loading_seeder.js'
import AlertaSeeder from './alerta_seeder.js'
import ManutencaoSeeder from './maintence_seeder.js'

export default class DatabaseSeeder extends BaseSeeder {
  public async run() {
    await new UsersSeeder(this.client).run()
    await new AtmsSeeder(this.client).run()
    await new LoadingSeeder(this.client).run()
    await new AlertaSeeder(this.client).run()
    await new ManutencaoSeeder(this.client).run()
  }
}