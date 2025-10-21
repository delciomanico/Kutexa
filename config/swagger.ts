import path from 'node:path';
import url from 'node:url';

export default {
  path: path.dirname(url.fileURLToPath(import.meta.url)) + '/../',

  info: {
    title: 'Kutexa Documentacao API',
    version: '1.0.0',
    description: 'Documentação gerada com adonis-autoswagger',
  },

  tagIndex: 2, // índice usado para agrupar rotas por tags

  snakeCase: true,
  debug: false,

  ignore: ['/swagger', '/docs'],

  defaultSecurityScheme: 'BearerAuth',
  authMiddlewares: ['auth', 'auth:api'],

  common: {
    parameters: {}, // parâmetros globais (ex: token, pagination)
    headers: {},    // headers globais (ex: Authorization)
  },

  persistAuthorization: true,
  showFullPath: false,
};