/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

//importacao de rotas por modulos

import router from '@adonisjs/core/services/router'
import AutoSwagger from 'adonis-autoswagger';
import swagger from '#config/swagger';
import '../app/modules/reconciliar/routes.js'


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