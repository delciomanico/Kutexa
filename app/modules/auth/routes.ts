/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import AuthController from './controllers/auth_controller.js';
import { middleware } from '#start/kernel';
const UsersController = () => import('./controllers/users_controller.js');

router.group(() => {
  router.post('register', [AuthController, 'register']);
  router.post('login', [AuthController, 'login']);
  router.get('user', [AuthController, 'index']);
  router.post('logout', [AuthController, 'logout']).middleware(middleware.auth())
  router.get('/me', [AuthController, 'me']).middleware(middleware.auth())
}).prefix('v1/auth');


router.group(()=> {
  router.resource('users', UsersController)
}).prefix('v1/user')