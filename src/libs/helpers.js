const helpers={};
const bcrypt =require('bcryptjs');
helpers.cifrar = async(contrasena) => {
  
    const cadena= await bcrypt.genSalt(10);
    const contracifrada= await bcrypt.hash(contrasena,cadena);
    return  contracifrada;
 };

 helpers.descifrar = async(contrasena,contracifrada) => {
     //true or false
     try{
    return await bcrypt.compare(contrasena,contracifrada)
}catch(e){
    console.log(e)
}
    //contracifrada= await bcrypt.hash(contrasena,cadena);
    //return  contracifrada;
 };

 module.exports = helpers;