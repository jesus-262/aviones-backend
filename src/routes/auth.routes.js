import {Router} from 'express';

const router = Router();


import * as auth from '../controllers/auth.controllers';

router.post('/iniciarsession', auth.postiniciarsession);
router.get('/iniciarsession', auth.getiniciarsession);

router.post('/getrol', auth.postgetrol);
router.post('/getid', auth.postgetid);

router.post('/verificartoken', auth.postverificartoken);
module.exports = router;