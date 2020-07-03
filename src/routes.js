const express = require('express')
const knex = require('./database/connetcion')

const routes = express.Router()

routes.get('/',(req,res)=>{
    return res.redirect('/users')
})
routes.get('/users',async(req,res)=>{
    const users = await  knex('users').select('*')


    return res.json(users)
})

routes.get('/users/:id',async(req,res)=>{
    const {id} = req.params
    
    const user = await knex('users').select('*').where('id','=',id)
    
    return res.json(user)
})

routes.put('/users/:id',async(req,res)=>{
    const {id} = req.params

    const {name,email,senha} = req.body
    const user={
        name,
        email,
        senha
    }

    const userUpdate = await  knex('users').update(user).where('id','=',id)

    return res.json(user)
})
routes.delete('/users/:id',async(req,res)=>{
    const {id} = req.params
    
    await knex('users').delete().where('id','=',id)

    return res.json("user deletado com sucesso")
})

routes.post('/users',async(req,res)=>{
    const {name,email,senha} = req.body


    const  trx = await knex.transaction()

    const user ={
        name,
        email,
        senha
    }

    await trx('users').insert(user)

    await trx.commit()

    return res.json(user)
})

module.exports = routes