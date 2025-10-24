/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import ReconciliacaoController from './controllers/reconciliacao_controller.js';
import OdooController from '#controllers/OdooController';


router.group(()=> {
  router.post('reconciliar', [ReconciliacaoController,'reconciliar'])
  // start/routes.ts
    router.get('/odoo/faturas', [OdooController, 'faturas'])
    router.get('/odoo/vendas', [OdooController, 'vendas'])

}).prefix('api/')

router.group(() => {
  router.get('/historicos', '#controllers/historicos_reconciliacoes_controller.index')
  router.get('/historicos/:id', '#controllers/historicos_reconciliacoes_controller.show')
  router.delete('/historicos/:id', '#controllers/historicos_reconciliacoes_controller.destroy')

  router.get('/fatura', '#controllers/fatura_sem_correspondencia_controller.index')
  router.get('/fatura/:id', '#controllers/fatura_sem_correspondencia_controller.show')
  router.delete('/fatura/:id', '#controllers/fatura_sem_correspondencia_controller.destroy')

  router.get('/transacao', '#controllers/transacao_sem_correspondencia_controller.index')
  router.get('/transacao/:id', '#controllers/transacao_sem_correspondencia_controller.show')
  router.delete('/transacao/:id', '#controllers/transacao_sem_correspondencia_controller.destroy')

  router.get('/reconciliacao', '#controllers/historicos_reconciliacoes_controller.index')
  router.get('/reconciliacao/:id', '#controllers/historicos_reconciliacoes_controller.show')
  router.delete('/reconciliacao/:id', '#controllers/historicos_reconciliacoes_controller.destroy')
}).prefix('/api')
