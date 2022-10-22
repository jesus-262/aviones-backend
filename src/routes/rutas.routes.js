import {Router} from 'express';

const router = Router();


import * as auth from '../controllers/rutas.controllers';

router.get('/verrutassalidas', auth.getrutasalidas);
router.get('/verrutasllegadas', auth.getrutallegadas);

module.exports = router;