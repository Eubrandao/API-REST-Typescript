/*Aqui usaremos o MySql que está dentro de um container Docker*/

import mysql from 'mysql'
import * as dotenv from 'dotenv'

//Todos os items de acesso ao banco está armazenado dentro de uma variável de ambiente
dotenv.config()
export const connection = mysql.createConnection({
    host:process.env.HOST,
    port:process.env.PORT,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
})