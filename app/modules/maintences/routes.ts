/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const MaintencesController = () => import('./controllers/maintences_controller.js');


router.group(()=> {
  router.resource('maintences', MaintencesController)
}).prefix('v1/maintences')