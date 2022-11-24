//  rota inicial:
import { Router } from 'express';
import { ShadowSearch, sendverifyPageAndProfile, verifyRecentPostWithHashtag } from '../controllers/usuario.controller.js';

const routes = new Router();

routes.get('/', (req, res) => {
  res.status(200).json({ ok: 'connected' });
});

routes.get('/shadowbanverification', ShadowSearch);

routes.get('/pageandprofileverification', sendverifyPageAndProfile);

routes.get('/hashtagverification', verifyRecentPostWithHashtag);

export default routes;
