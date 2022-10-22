
import jwt from 'jsonwebtoken';
import config from '../config';
import pool from '../database';
export const verificartoken = async (req,res,next)=>{

    var token = req.headers["x-access-token"];
  
    token=token.replace(/['"]+/g, "");
    console.log(token);
    if(!token){
        console.log("no hay token");
        return res.status(403).json({messaje:"no hay token"})
    };
    jwt.verify(token,config.SECRET , function(err) {
       
        if(err){
            console.log("error");
        }
    });
    
    try {
       
        const decode = jwt.verify(token,config.SECRET);
        req.usuarioid =decode.id;
        const query='SELECT * FROM usuario WHERE cedula='+decode.id;
         
       
        const usuario= await pool.query(query)
        if(usuario==""){
            console.log("no hay usuario");
            return res.status(403).json({messaje:"no hay usuario"})
        };
    
        console.log("next esta logeado")
        next();
        
    } catch(err) {
     
        return res.status(403).json({messaje:"error token"})
    }
    
}

export const ADMINISTRADOR = async (req,res,next)=>{
    const query='SELECT * FROM usuario WHERE cedula='+req.usuarioid;

    const usuario= await pool.query(query)
   // console.log(usuario[0].rol);
    if(usuario==""){
        return res.status(403).json({messaje:"no eres administrador por lo tanto no puedes entrar"})
    }else{
    if(usuario[0].rol==="ADMINISTRADOR"){
        console.log("es administrador");
        next();
    }else{
        return res.status(403).json({messaje:"no eres administrador por lo tanto no puedes entrar"})
    }
}
}
export const PERSONANATURAL = async (req,res,next)=>{
    const query='SELECT * FROM usuario WHERE cedula='+req.usuarioid;

    const usuario= await pool.query(query)
    if(usuario==""){
        return res.status(403).json({messaje:"no eres una persona natural no puedes entrar"})
    }else{
    if(usuario[0].rol==="PERSONA NATURAL"){
        console.log("es una persona natural");
        next();
        
    }else{
        return res.status(403).json({messaje:"no eres una persona natural no puedes entrar"})
    }
}
}