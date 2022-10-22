import {Router} from 'express';

const router = Router();

import * as jtw from '../middlewares/authjwt.js';
import * as usuario from '../controllers/usuario.controllers';

router.post('/crearusuario',[jtw.verificartoken,jtw.ADMINISTRADOR],usuario.postcrearusuario);
router.get('/crearusuario',[jtw.verificartoken,jtw.ADMINISTRADOR],usuario.getcrearusuario);
router.post('/pruebatoken', [jtw.verificartoken,jtw.ADMINISTRADOR],usuario.pruebatoken);
router.get('/mostrarusuarios',[jtw.verificartoken,jtw.ADMINISTRADOR],usuario.getmostrarusuario);
router.post('/mostrarusuarios',[jtw.verificartoken,jtw.ADMINISTRADOR],usuario.postmostrarusuario);
router.post('/mostrarunusuario',[jtw.verificartoken,jtw.ADMINISTRADOR],usuario.postmostrarunusuario);


//edictar usuario

router.post('/edictarusuario', [jtw.verificartoken,jtw.ADMINISTRADOR],usuario.postedictarusuario);
//borra un formulario
router.delete('/deleteusuario/:cedula',[jtw.verificartoken,jtw.ADMINISTRADOR], usuario.deleteusuario);
module.exports = router;