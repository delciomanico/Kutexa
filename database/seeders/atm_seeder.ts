import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Atm from '#modules/atm/models/atms'

export default class extends BaseSeeder {
  async run() {
    /*await Atm.createMany([
      {
        codigoAtm: 'ATM001',
        location: 'Luanda - Centro',
        estado: 'ativo',
        capacidadeNotas: '2000',
        agenciaId: 1, // corresponde à Agência Central
      },
      {
        codigoAtm: 'ATM002',
        location: 'Luanda - Talatona',
        estado: 'ativo',
        capacidadeNotas: '1500',
        agenciaId: 2, // corresponde à Agência Talatona
      },
      {
        codigoAtm: 'ATM003',
        location: 'Luanda - Benfica',
        estado: 'falha',
        capacidadeNotas: '1000',
        agenciaId: 3, // corresponde à Agência Benfica
      },
      {
        codigoAtm: 'ATM004',
        location: 'Luanda - Viana',
        estado: 'inativo',
        capacidadeNotas: '1800',
        agenciaId: 4, // corresponde à Agência Viana
      },
    ])*/
  }
}