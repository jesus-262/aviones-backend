
import pool from '../database';
import jwt from 'jsonwebtoken';
import config from '../config';
const helpers = require('../libs/helpers');
 
export const postcrearruta = async(req, res)=>{
    const {tipo,tiempo,pais,numero_vuelo,porton, observacion}=req.body;
 

   const nuevaruta= {
    tipo,
    tiempo,
    pais,
    numero_vuelo,
    porton,
    observacion
   }
    console.log(tipo)
    await pool.query('INSERT INTO rutas set ?',[nuevaruta]);
  

    console.log("ruta creada con exito");
    return res.json(" ruta creada con exito ");
    
     //jwt.sign({id:})

 
}









