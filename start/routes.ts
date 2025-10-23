/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

//importacao de rotas por modulos
import '../app/modules/reconciliar/routes.js'

import router from '@adonisjs/core/services/router'
import AutoSwagger from 'adonis-autoswagger';
import swagger from '#config/swagger';


// rotas de documentacao
router.get('/swagger', async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger);
});
router.get('/docs', async () => {
  return AutoSwagger.default.ui('/swagger', swagger);
});

router.get('/', async () => {
  return {
    hello: 'API FUNCIONANDO',
  }
})

router.group(() => {

/**
 * Relatórios
 */
router.resource('/relatorios', '#controllers/relatorios_controller').apiOnly()

/**
 * Faturas
 */
router.resource('/faturas', '#controllers/faturas_controller').apiOnly()

/**
 * Transações
 */
router.resource('/transacoes', '#controllers/transacoes_controller').apiOnly()

/**
 * Reconciliações
 */
router.resource('/reconciliacoes', '#controllers/reconciliacoes_controller').apiOnly()

/**
 * Faturas sem correspondência
 */
router.resource('/faturas-sem-correspondencia', '#controllers/faturas_sem_correspondencia_controller').apiOnly()

/**
 * Transações sem correspondência
 */
router.resource('/transacoes-sem-correspondencia', '#controllers/transacoes_sem_correspondencia_controller').apiOnly()
}).prefix('/api')