import {Router} from 'express'
import { authMiddleware} from './js/usuario.js'
import Promotor from './js/promotor.js';

const router = Router()

router.get('/atividade', authMiddleware, Promotor.verAtv)

router.get('/roteiro', authMiddleware, Promotor.verRot)

router.get("", (req, res) => {
    res.send('Painel inicial do Promotor')
});

router.post('/roteiro', authMiddleware, Promotor.verRot)


export default router;