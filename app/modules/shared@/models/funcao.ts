import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Modulo from './modulo.js'
import User from './user.js'

export default class Funcao extends BaseModel {
   @column({ isPrimary: true })
    declare id: number
  
    @column()
    declare name: string
  
    @column()
    declare description: string
  
    @manyToMany(()=> Modulo, {
      pivotTable: 'modulo_funcao',
      pivotColumns: ['criar', 'ler', 'atualizar', 'definir'],
      pivotTimestamps: true
    })
    declare modulos: ManyToMany<typeof Modulo>

    @hasMany(()=> User)
    declare users: HasMany<typeof User>
  
    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime
  
    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime
}