
import pool from '../database'
import jwt from 'jsonwebtoken';
import config from '../config';
import dayjs from 'dayjs'


//import 'dotenv/config'
const helpers = require('../libs/helpers');
var util = require('util');
var fs = require('fs-extra');
const path =require('path')
const cloudinary= require('cloudinary');
const FormData = require("form-data")


export const postformulario = async(req, res)=>{
   //console.log("inicie formulario");
   //const {direccion,bajan,suben,token,placa,tipo,observacion}=req.body;
   //console.log(req);
   //console.log(req.files.img.name)
   if(req.files==null){
    
    var foto='';
    console.log("sin foto")
   }else{
    console.log("con foto")
    const file=req.files.img;
    //console.log(req.files.img)
  
    cloudinary.config({
      cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
      api_key:process.env.CLOUDINARY_API_KEY,
      api_secret:process.env.CLOUDINARY_API_SECRET
      
      })
    //implementa un nombre para la imagen
    const nombrefoto=new Date().getTime()+file.md5+path.extname(file.name);
    //console.log(nombrefoto);
    //ruta de la imagen
    const URL=path.join(__dirname,'../public/img/'+nombrefoto);
    //console.log(URL);
    //mueve la imagen a esa ruta
    await util.promisify(file.mv)(URL);
    //lo sube a cloudinary
    var foto=await cloudinary.v2.uploader.upload(URL,{folder:'buses'});
    //elimina la foto de public
    await fs.unlink(URL);
    
   }
   
 
  // console.log(req)
   var direccion=req.query.direccion;
   var bajan=req.query.bajan;
   var suben=req.query.suben;
   var token=req.query.token;
   var placa=req.query.placa;
   var tipo=req.query.tipo;
   var observacion=req.query.observacion;
  // console.log(direccion);
const date = await pool.query('SELECT DATE(NOW()) AS fecha, CURDATE() AS fecha2 ');
//console.log(date[0].fecha)
//console.log(date[0].fecha2)
dayjs().format();
const dia=dayjs(date[0].fecha).format('DD/MM/YYYY') ;
//console.log(dia);
//hora
const hour = await pool.query('SELECT HOUR(NOW());');
//console.log(hour)
var verificar;
jwt.verify(token,config.SECRET , function(err) {
       
  if(err){
      console.log("error en formulario");
      verificar=false;
      
  }else{
    verificar=true;
  }
});
if(verificar==true){
  const decode = jwt.verify(token,config.SECRET);
    
  
  const id_usuario=decode.id;

  // mirar si el id_usuario esta creado
  const query='SELECT * FROM formulario WHERE id_usuario='+id_usuario;

  //console.log(query);
  const formulario = await pool.query(query);
  console.log("foto")
 // console.log(foto)
  if(formulario!=""){
       //console.log("existe");
       const query='SELECT Max(recorrido) AS recorrido FROM formulario WHERE id_usuario='+id_usuario;
       const recorridomax = await pool.query(query);
      
       const recorrido=recorridomax[0].recorrido+1;
       const nuevorecorrido= {
           id_usuario,
           placa,
           imagen_id:foto==''?'':foto.public_id,
           imagen_url:foto==''?'':foto.url,
           tipo,
           observacion,
           direccion,
           bajan,
           suben,
           recorrido
           
          }
      // console.log("Guardo en el formulario");
       const formularioid =await pool.query('INSERT INTO formulario set ?',[nuevorecorrido]);
      // console.log("formularioid[0]")
      // console.log(formularioid.insertId)
       const nuevorecorrido2= {
         id_usuario,
         id_formulario:formularioid.insertId,
         placa,
         imagen_id:foto==''?'':foto.public_id,
         imagen_url:foto==''?'':foto.url,
         tipo,
         observacion,
         direccion,
         bajan,
         suben,
         recorrido
         
        }
     //  console.log("Guardo en el excel");
       await pool.query('INSERT INTO excel set ?',[nuevorecorrido2]);
      // console.log("creado : "+ recorrido );
  }else{
      // console.log("no existe cree un nuevo recorrido");
       const nuevorecorrido= {
           id_usuario,
           placa,
           imagen_id:foto==''?'':foto.public_id,
           imagen_url:foto==''?'':foto.url,
           tipo,
           observacion,
           direccion,
           bajan,
           suben,
           recorrido:1
           
          }
         // console.log("creado por primera vez en el formulario");
         const formularioid=await pool.query('INSERT INTO formulario set ?',[nuevorecorrido]);
        // console.log("formularioid[0]")
        // console.log(formularioid.insertId)
         const nuevorecorrido2= {
           id_usuario,
           id_formulario:formularioid.insertId,
           placa,
           imagen_id:foto==''?'':foto.public_id,
           imagen_url:foto==''?'':foto.url,
           tipo,
           observacion,
           direccion,
           bajan,
           suben,
           recorrido:1
           
          }
      // console.log("creado por primera vez en el excel");
       await pool.query('INSERT INTO excel set ?',[nuevorecorrido2]);
      // console.log("creado recorrido inicial");

  }

 
  
//  console.log("formulario");
res.send(" termino formulario ");
}
  
    
 
}

export const postborrarformulario = async(req, res)=>{
//dependiendo del tiempo que borre el formulario
const horareinicio=0;

}


export const posttodoslosformularios = async(req, res)=>{
     const {token}=req.body;
     var verificar;
     jwt.verify(token,config.SECRET , function(err) {
            
       if(err){
           console.log("error en formulario");
           verificar=false;
           
       }else{
         verificar=true;
       }
     });
     if(verificar==true){
     const decode = jwt.verify(token,config.SECRET);
     
   //  console.log(decode.id);
     const query='SELECT * FROM formulario WHERE id_usuario='+decode.id +' AND DATE(fecha) = CURDATE() ';

     //console.log(query);
     const recorridos = await pool.query(query);
     //console.log(recorridos[0])
     res.json(recorridos);
    }else{
      res.json(0);
    }
}
export const deleteformulario= async(req, res)=>{ 
     
     const {id} = req.body;
     console.log("id");
     console.log(id);
     console.log(req.params.id);
     
     const query='SELECT * FROM formulario WHERE id='+req.params.id;
     const cloufoto = await pool.query(query);
   
     //borrar foto
    
     cloudinary.config({
      cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
      api_key:process.env.CLOUDINARY_API_KEY,
      api_secret:process.env.CLOUDINARY_API_SECRET
      
      })
      //console.log(cloufoto);
      //tengo sueño no me jusgen llevo 20 horas
     
        
        if(cloufoto==''){
         
        }else{
          if(cloufoto[0].imagen_id){
          console.log("borrar foto de la nube")
          const result=await cloudinary.v2.uploader.destroy(cloufoto[0].imagen_id)
          console.log(result);
        }
        
      }
      console.log("borrar toda la tabla")
 
     //borrar tablas
     await pool.query('DELETE FROM formulario WHERE id='+req.params.id);
     await pool.query('DELETE FROM excel WHERE id_formulario='+req.params.id);
    // console.log("borrado")
     //console.log(req.params.id);
     //const query='SELECT * FROM formulario WHERE id='+req.params.id;
     //const borrar = await pool.query(query);
    // console.log(borrar[0].recorrido);
     res.json("borrado")

}
export const postultimoformulario= async(req, res)=>{ 
     
     const {token}=req.body;
     var verificar;
jwt.verify(token,config.SECRET , function(err) {
       
  if(err){
     // console.log("error en formulario");
      verificar=false;
      
  }else{
    verificar=true;
  }
});
if(verificar==true){
     const decode = jwt.verify(token,config.SECRET);
    
     
     const id_usuario=decode.id;
     const query=' select count(*) as cuenta from formulario WHERE id_usuario='+id_usuario;
     const formulario = await pool.query(query);
    // console.log(formulario[0].cuenta);
     res.json(formulario[0].cuenta)
     //const formulario = await pool.query(query);
    }else{
      res.json(0)
    }
}
//es para revisar la fecha del formulario y saber si hay que borrar
export const postrevisarformulario= async(req, res)=>{ 
    
     const {token}=req.body;
     var verificar;
     jwt.verify(token,config.SECRET , function(err) {
       
      if(err){
          console.log("error cuando refrescas");
          verificar=false;
          
      }else{
        verificar=true;
      }
    });
    if(verificar==true){
     const decode = jwt.verify(token,config.SECRET);

     //verificar si el formulario esta lleno
     
     const query='SELECT * FROM formulario WHERE id_usuario='+decode.id;

     const formulario = await pool.query(query);
   //  console.log("mostrar fecha del formulario");
     if(formulario==''){
    
     }else{
   
     const date = await pool.query('SELECT DATE(NOW()) AS fecha ');
     console.log("que fechas son")
     console.log("formulario")
     console.log(formulario[0].fecha.toString())
     console.log("fecha actual")
     console.log(date[0].fecha.toString())
     dayjs().format();
     var diaformulario;
       var diaatual=dayjs(date[0].fecha).format('DD/MM/YYYY') ;
       var diaformulario=dayjs(formulario[0].fecha).format('DD/MM/YYYY') ;
       var fechainsertar=dayjs(formulario[0].fecha).format('DD-MM-YYYY ') ;
       console.log("diaatual");
       console.log(diaatual);
       console.log("diaformulario");
       console.log(diaformulario);
       console.log("paso por day")
      
       if(diaformulario.toString()==diaatual.toString()){
        console.log("son iguales no haga nada")
      
  }else{
    console.log("son diferentes borre todo")
    //2011-12-18 13:17:17
   
    await pool.query('DELETE FROM formulario WHERE id_usuario='+decode.id);
     
  }

      
       
       /*
       for(var i=0;i<formulario.length;i++){
         
        diaformulario=dayjs(formulario[i].fecha).format('DD/MM/YYYY') ;
          if(diaformulario.toString()==diaatual.toString()){
                console.log("son iguales no haga nada")
                borrar=false;
          }else{
            console.log("son diferentes borre todo")
            borrar=true;
              
             
          }
       }*/
       
      
       
    
}
res.json("TERMINO");
}else{
  res.json("TERMINO");
}
    

}


