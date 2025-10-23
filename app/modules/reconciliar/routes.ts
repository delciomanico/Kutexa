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
//const ExtrairController = () => import('./controllers/extrair_controller.js');


router.group(()=> {
  //router.post('/extrair-texto', [ExtrairController,'extractText']);
  router.post('reconciliar', [ReconciliacaoController,'reconciliar'])
  
}).prefix('api/')