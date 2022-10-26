//  rota inicial:
import { Router } from 'express';
import { ShadowSearch, UserData } from '../controllers/usuario.controller';

const routes = new Router();

routes.get('/', (req, res) => {
  res.status(200).json({ ok: 'connected' });
});

//  rota para pegar todos usuários:

//  COMEÇA AQUI. Pede o history Info, manda para o controllers>usuario.controller.js
routes.get('/shadowbanverification', ShadowSearch);

routes.get('/userData', UserData);

export default routes;
