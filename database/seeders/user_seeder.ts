import User from '../../app/modules/auth/models/user.js'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
 public async run() {
    /*await User.createMany([
      {
        email: 'admin@gmail.com',
        password: 'secret',
        first_name: 'admin',
        last_name: 'admin',
        username: 'admin',
      },
      {
        email: 'user@gmail.com',
        password: '123456',
        first_name: 'user',
        last_name: 'user',
        username: 'user',
      },
    ])*/
  }
}