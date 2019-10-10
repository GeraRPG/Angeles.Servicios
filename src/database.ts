import mysql from 'promise-mysql';
import keys from './keys';

async function conexion(){
    const pool = await mysql.createPool(keys.database);
    await pool.getConnection()
       .then(connection => {
           pool.releaseConnection(connection);
           console.log('DB connected');
       }).catch(error => {console.log(error);
       });
    return pool;
}

export default conexion;