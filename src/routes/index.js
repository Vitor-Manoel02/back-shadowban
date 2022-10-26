//  rota inicial:
import { Router } from 'express';
import { ShadowSearch } from '../controllers/usuario.controller';

const routes = new Router();

routes.get('/', (req, res) => {
  res.status(200).json({ ok: 'connected' });
});

//  rota para pegar todos usuários:

//  COMEÇA AQUI. Pede o history Info, manda para o controllers>usuario.controller.js
routes.get('/shadowban', ShadowSearch);

export default routes;
