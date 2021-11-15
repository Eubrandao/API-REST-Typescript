import express from 'express'
import {connection} from './models/database'
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.listen(3001, ()=>{console.log('Server is on')})

app.get('/', (req, res)=>{
    res.json({msg: 'Bem vindo a api'})
})

//Listando um usuário específico pelo ID

app.get('/users/:id', (req,res)=>{
    const id = req.params.id

    connection.query('select * from users where id=' + id, function(error,results,fields){
        if(error){
            res.status(400).json({msg: 'Ops, algo deu errado' })
        }else{
            res.status(200).json({msg: results})
        }
    })
})

//Listando todos os usuários
app.get('/users', (req,res)=>{
    connection.query('select * from users', function(error,results,fields){
        if(error){
            res.status(400).json({msg: 'Ops, algo deu errado'})
        }else{
            res.status(200).json({msg: results})
        }
    })
})

//Criando um novo usuário
app.post('/users', (req, res)=>{
    const nome = req.body.nome
    const email = req.body.email
    const celular = req.body.celular

    connection.query(`insert into users(nome,email,celular) values('${nome}', '${email}', '${celular}')`, function(error,results,fields){
        if(error){
            res.status(400).json({msg: 'Ops, algo deu errado'})
        }else{
            res.status(200).json({msg: results})
        }
    })
})

//Deletando um usuário pelo ID dele
app.delete('/users/:id', (req, res)=>{
    const id = req.params.id

    connection.query('delete from users where id='+ id , function(error,results,fields){
        if(error){
            res.status(400).json({msg: 'Ops, algo deu errado'})
        }else{
            res.status(200).json({msg: results})
        }
    })
})

//Atualizando um usuário
app.patch('/users/:id',(req, res)=>{
    const id = req.params.id
    const nome = req.body.nome
    const email = req.body.email
    const celular = req.body.celular
    connection.query(`update users set nome='${nome}', email='${email}', celular='${celular}' where id='${id}'`, function(error,results,fields){
        if(error){
            res.status(400).json({msg: 'Ops, algo deu errado'})
        }else{
            res.status(200).json({msg: results})
        }
    })
})