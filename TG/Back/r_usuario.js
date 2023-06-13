import { Router } from 'express';
import Usuario from './js/usuario.js';

const router = Router()

router.post('/login', Usuario.login);

//router.get('/logout', Usuario.logout);
  
//router.get('trocaSenha', Usuario.trocaSenha);


export default router;