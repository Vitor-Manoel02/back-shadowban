//  rota inicial:
import { Router } from 'express';
import { ShadowSearch, UserData } from '../controllers/usuario.controller';

const routes = new Router();

routes.get('/', (req, res) => {
  res.status(200).json({ ok: 'connected' });
});

//  rota para pegar todos usuários:
routes.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

//  COMEÇA AQUI. Pede o history Info, manda para o controllers>usuario.controller.js
routes.get('/shadowbanverification', ShadowSearch);

routes.get('/userData', UserData);

export default routes;
