
import pool from '../database';
import jwt from 'jsonwebtoken';
import config from '../config';
const helpers = require('../libs/helpers');
 
export const getrutasalidas = async(req, res)=>{
   
    const salidas = await pool.query('SELECT * FROM rutas where tipo="SALIDAS"');
    console.log("post datos");
    console.log("salidas");
 
     return res.json(salidas);
     

 
}
export const getrutallegadas = async(req, res)=>{
   
    
    const llegadas = await pool.query('SELECT * FROM rutas where tipo="LLEGADAS"');
    console.log("llegadas");
 
    return res.json(llegadas);
    
     //jwt.sign({id:})

 
}









