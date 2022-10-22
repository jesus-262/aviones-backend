
import pool from '../database'
const helpers = require('../libs/helpers');

export const postcrearusuario = async(req, res)=>{
   const {cedula,contrasena,nombre,apellido,rol}=req.body;
 

   const nuevousuario= {
    cedula,
    contrasena:await helpers.cifrar(contrasena),
    nombre,
    apellido,
    rol
   }
   const query='SELECT * FROM usuario WHERE cedula='+cedula;
   // console.log(query);
    const usuario = await pool.query(query);
   // console.log(usuario);

    if(usuario!=""){
     
        console.log("cedula existe");
        return res.json("La cedula ya existe");
        //return res.status(401).json({messaje:"cedula existe"})
       
    }
    await pool.query('INSERT INTO usuario set ?',[nuevousuario]);
  

    console.log("creado usuario con exito");
    return res.json(" creado usuario con exito ");
    
  
 
}

export const getcrearusuario = async(req, res)=>{
   
     res.send(" creado usuario con exito ");
     console.log("creado usuario con exito")
  
 }
 export const getmostrarusuario = async(req, res)=>{
    const items=6;
    const page = req.body.page|| 1;
    var pages=1;
   var limite = (page-1)  * items;

   // console.log(query);

    const usuario = await pool.query('SELECT * FROM usuario LIMIT '+ items +' OFFSET '+ limite);
    const conteo = await pool.query('SELECT count(*) as numero FROM usuario ');
   
    pages=Math.ceil(conteo[0].numero/items);
    
    var navegacion={
        page: parseInt(page),
        pages,
        items,
        limite,
        der:parseInt(page)+ 1,
        izq:parseInt(page)-1
       }
    console.log("mostrar usuarios")
    res.json({usuario, navegacion});
   
 
}
export const postmostrarusuario = async(req, res)=>{
    console.log("paso a postmostrar")
    const items=6;
    console.log(req.body.page);
    const page = req.body.page|| 1;
    var pages=1;
    var limite = (page-1)  * items;
 
   // console.log(query);

    const usuario = await pool.query('SELECT * FROM usuario LIMIT '+ items +' OFFSET '+ limite);
    const conteo = await pool.query('SELECT count(*) as numero FROM usuario ');
   
    pages=Math.ceil(conteo[0].numero/items);
    
    var navegacion={
        page: parseInt(page),
        pages,
        items,
        limite,
        der:parseInt(page)+ 1,
        izq:parseInt(page)-1
       }
    console.log("mostrar usuarios")
    res.json({usuario, navegacion});
   
 
}
export const postmostrarunusuario = async(req, res)=>{

    const dato = req.body.dato;
    console.log("dato")
    console.log(dato)
    let query='SELECT * FROM usuario WHERE nombre LIKE '+'"'+'%'+dato+'%'+'" or apellido LIKE '+'"'+'%'+dato+'%'+'" or cedula LIKE '+'"'+'%'+dato+'%'+'"' ;
    const usuario= await pool.query(query);
    res.json(usuario);
}
export const deleteusuario = async(req, res)=>{
    console.log("entro a borrar");
   // console.log(req.body);
    //console.log(req.params.cedula);
    const cedula = req.params.cedula;
     
    await pool.query('DELETE FROM usuario WHERE cedula='+cedula);
    console.log("usuario borrado");
    res.json("borrado");
}

 export const pruebatoken = async(req, res)=>{
   
    res.send(" pruebatoken ");
    console.log("pruebatoken");
 
}


 //para edictar
export const postedictarusuario = async(req, res)=>{
    const {id,cedulalabel,contrasenalabel,nombrelabel,apellidolabel}=req.body;

    console.log("entro a edictar")
     console.log(id)
     console.log(cedulalabel)
     console.log(nombrelabel)
     console.log(apellidolabel)
     console.log(contrasenalabel)
     //comparar al usuaro
     //verificar si la cedula existe

     const cedu = await pool.query('SELECT * FROM usuario WHERE cedula='+cedulalabel);
     const usuario = await pool.query('SELECT * FROM usuario WHERE id='+id);
    
     if(cedu==""){
        console.log("no hay cedula");
       
        if(contrasenalabel==usuario[0].contrasena){
            console.log("contraseñas iguales")
const query ='UPDATE usuario SET cedula= "'+cedulalabel+'", nombre= "'+nombrelabel+'" , apellido= "'+apellidolabel+'" WHERE id= '+id;
console.log(query);
await pool.query(query);
//const formularioid =await pool.query('INSERT INTO formulario set ?',[nuevorecorrido]);
        }else{
            console.log("contraseñas diferentes")
            var contrasenacifrada=await helpers.cifrar(contrasenalabel);
            console.log("contrasenacifrada");
            console.log(contrasenacifrada);
            const query ='UPDATE usuario SET cedula= "'+cedulalabel+'", nombre= "'+nombrelabel+'" , apellido= "'+apellidolabel+'", contrasena= "'+contrasenacifrada+'"  WHERE id= '+id;
            console.log(query);
            await pool.query(query);
        }
    }else{
        console.log("si hay cedula");
        if(cedu[0].cedula==usuario[0].cedula){
            console.log("cedula igual")
            if(contrasenalabel==usuario[0].contrasena){
                console.log("contraseñas iguales")
    const query ='UPDATE usuario SET cedula= "'+cedulalabel+'", nombre= "'+nombrelabel+'" , apellido= "'+apellidolabel+'" WHERE id= '+id;
    console.log(query);
    await pool.query(query);
    //const formularioid =await pool.query('INSERT INTO formulario set ?',[nuevorecorrido]);
            }else{
                console.log("contraseñas diferentes")
                var contrasenacifrada=await helpers.cifrar(contrasenalabel);
                console.log("contrasenacifrada");
                console.log(contrasenacifrada);
                const query ='UPDATE usuario SET cedula= "'+cedulalabel+'", nombre= "'+nombrelabel+'" , apellido= "'+apellidolabel+'", contrasena= "'+contrasenacifrada+'"  WHERE id= '+id;
                console.log(query);
                await pool.query(query);
            }
        }else{
            console.log("la cedula existe no puede hacer cambios")
            return res.send(" la cedula existe no puede hacer cambios ");
        }
       
        
    }
    

     /*
    const nuevousuario= {
     cedula,
     contrasena,
     nombre,
     apellido,
     rol
    }
    const query='SELECT * FROM usuario WHERE cedula='+cedula;
    // console.log(query);
     const usuario = await pool.query(query);
    // console.log(usuario);
 
     if(usuario!=""){
      
         console.log("cedula existe");
         return res.status(401).json({messaje:"cedula existe"})
        
     }{
        console.log("creado usuario con exito");
     }
  */
     console.log("Cambio realizado con exito")
     return res.send("Cambio realizado con exito");
     
   
  
 }

