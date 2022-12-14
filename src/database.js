
import mysql from 'mysql2';
import { database }  from './keys';
import {promisify} from 'util';



const pool = mysql.createPool(database);


pool.getConnection((err,connection)=>{
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
          console.error('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
          console.error('Database has to many connections');
        }
        if (err.code === 'ECONNREFUSED') {
          console.error('Database connection was refused');
        }
      }
    
      if (connection) connection.release();
      console.log('DB is Connected');
    
      return;
});

//para poder utilizar promesas
pool.query = promisify(pool.query);


export default pool;