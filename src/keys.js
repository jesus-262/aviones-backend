const url = require('url')
const getDatabase = function() {
  if (process.env.DATABASE_URL){
    return process.env.DATABASE_URL
  }
  if(process.env.CLEARDB_DATABASE_URL) {
    const dbUrl = url.parse(process.env.CLEARDB_DATABASE_URL);
    return {
      waitForConnections : true , 
  connectionLimit : 10 , 
  queueLimit : 0, 
      host     : dbUrl.hostname,
      user     : dbUrl.auth.split(':')[0],
      password : dbUrl.auth.split(':')[1],
      database : dbUrl.pathname.substring(1)
    }
  }

  return  {
    waitForConnections : true , 
    connectionLimit : 10 , 
    queueLimit : 0 ,
    host     : process.env.HOST,
    user     : 'root',
    password : process.env.PASSWORD,
    database : 'avion'
  }
}
module.exports = {
  database: getDatabase(),
}