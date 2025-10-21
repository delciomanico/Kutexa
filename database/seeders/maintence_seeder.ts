import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Manutencao from '#modules/maintences/models/maintences'

export default class extends BaseSeeder {
  async run() {
   await Manutencao.createMany([
      {
        tipo: 'preventiva',
        description: 'Verificação de rotina e limpeza interna',
        atmId: 1,
        userId: 1,
      },
     /*{
        tipo: 'corretiva',
        description: 'Substituição do módulo de leitura de cartões',
        atmId: 2,
        userId: 2,
      },
      {
        tipo: 'preventiva',
        description: 'Atualização de software e testes de segurança',
        atmId: 3,
        userId: 1,
      },
      {
        tipo: 'corretiva',
        description: 'Reparo no sistema de dispensação de notas',
        atmId: 2,
        userId: 2,
      },*/
    ])
  }
}