import {Router} from 'express'
import { authMiddleware } from './js/usuario.js'
import Supervisor from './js/supervisor.js'

const router = Router()

router.get('/atividade',authMiddleware, Supervisor.verAtv)
router.get('/roteiro', authMiddleware, Supervisor.verRot)

router.get("", (req, res) => {
    res.send('Painel inicial do supervisor')
    console.log('Painel inicial do supervisor')
});
router.post("", (req, res) => {

});
router.post('/roteiro', (req, res) => {

});
router.post('/atividade', (req, res) => {

});


export default router;