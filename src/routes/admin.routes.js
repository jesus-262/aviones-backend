import {Router} from 'express';

const router = Router();


import * as auth from '../controllers/admin.controllers';

router.post('/crearruta', auth.postcrearruta);

module.exports = router;