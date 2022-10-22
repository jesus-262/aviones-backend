
import pool from '../database';
import jwt from 'jsonwebtoken';
import config from '../config';
import { unwatchFile } from 'fs';
const helpers = require('../libs/helpers');
 
export const getiniciarsession = async(req, res)=>{
   
    
    console.log("getiniciarsession");
 
     res.send("getiniciarsession");
    
     //jwt.sign({id:})

 
}

export const postiniciarsession = async(req, res)=>{
    const {cedula,contrasena}=req.body;
   //console.log(cedula);
  // console.log(contrasena);
   if(cedula===""){
    return res.json({messaje:"Llene los campos"});
   }
   if(contrasena===""){
    return res.json({messaje:"Llene los campos"});
   }

    const verificarusuario= {
     cedula,
     contrasena
    }
   // console.log(verificarusuario);
    const query='SELECT * FROM usuario WHERE usuario= '+ cedula ;
    //console.log(query);
    const usuario = await pool.query(query);
    if(usuario==""){
        console.log("Usuario no encontrado");
     
       return res.json({messaje:"Usuario no encontrado"});
    }
    
   
    //const comparacion= await helpers.descifrar(contrasena,usuario[0].contrasena)
    //res.json({token:})
    console.log(contrasena)
    console.log(contrasena,usuario[0].contrasena)
    if(contrasena.toString()!=usuario[0].contrasena.toString()){
        console.log("contraseña equivocada");
        //return res.status(401).json({messaje:"contraseña equivocada"})
        return res.json({messaje:"contraseña equivocada"});
     
    }
    const token = jwt.sign({id:usuario[0].id} ,config.SECRET,{
        expiresIn: 1200000000 * 60
      })
        console.log("Inicio session con exito");
        res.json({token});
//const token = jwt.sign({id:usuario[0].cedula} ,config.SECRET)
//porqueria de solucion  expiresIn: 180 * 60
 
    
     //jwt.sign({id:})

 
}

export const postgetrol = async(req, res)=>{
    const {token}=req.body;
    console.log("mirar el rol");
    var verificar;
    jwt.verify(token,config.SECRET , function(err) {
           
      if(err){
          console.log("error en mirar rol");
          verificar=false;
          
      }else{
        verificar=true;
      }
    });
if(verificar==true){
    if(token==null){
        console.log("token no existe");
        res.json("token no existe");
    }else{
        const decode = jwt.verify(token,config.SECRET);
        //console.log(decode);
        const query='SELECT * FROM usuario WHERE id='+decode.id;
         
       
        const usuario= await pool.query(query)
        if(usuario==""){
            res.json("no hay rol");
        }else{
            const rol=usuario[0].rol;
            res.json(rol);
        }
     
       
    }
}else{
    res.json("no hay rol");
}
}

export const postgetid = async(req, res)=>{
    const {token}=req.body;
    console.log("mirar el id");
    const decode = jwt.verify(token,config.SECRET);
    
    const id=decode.id;
    res.json(id);
}

export const postverificartoken = async(req, res)=>{
    const {token}=req.body;
    console.log("VERIFICAR TOKEN");
   
    if(jwt.verify(token,config.SECRET)==''){
        console.log("NO EXISTE")
    }else{
        console.log("EXISTE")
    }
    /*
    if(decode==''){
           console.log("NO EXISTE")
    }else{
        console.log("EXISTE")
    }*/
    
   
    res.json("SE VERIFICO");
}









