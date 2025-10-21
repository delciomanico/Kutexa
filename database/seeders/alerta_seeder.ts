import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Alerta from '#modules/alerts/models/alerts'

export default class extends BaseSeeder {
  async run() {
   /* await Alerta.createMany([
      {
        tipo: 'falha',
        estado: 'aberto',
        atmId: 1, // ATM001
      },
      {
        tipo: 'numerario',
        estado: 'aberto',
        atmId: 2, // ATM002
      },
      {
        tipo: 'falha',
        estado: 'fechado',
        atmId: 3, // ATM003
      },
      {
        tipo: 'numerario',
        estado: 'fechado',
        atmId: 4, // ATM004
      },
    ])*/
  }
}