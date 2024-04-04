
import express from 'express'
import sql from 'mssql'
import { sqlConfig } from './server.js';

const pool = new sql.ConnectionPool(sqlConfig)
await pool.connect();
const routes = express.Router()


routes.get('/', async (req, res)=>{
    try{
         const { recordset } =  await pool.query`select * from Agendamento`
         return res.status(200).json(recordset)
    }
    catch(error){
         return res.status(501).json('não encontramos os registros :( ')
    }
 })

//registrando chamado novo
routes.post('/agendamento/novo', async (req, res)=>{
    try{
        const { data, nome, descricao} = req.body;
        await pool.query`insert into Agendamento values(${data},${nome},${descricao} )`
        return res.status(201).json(`ok`)
    }

    catch(error){
        return res.status(501).json('erro no inserir chamado ): ')
    }
})

routes.delete('/agendamento/excluir/:id', async (req, res)=>{
    try {
        const { id } = req.params
        await pool.query`delete from Agendamento where id = ${id}`
        return res.status(200).json('apagando!')
    } catch (error) {
        console.log(error)
        return res.status(501).json('erro ao excluir...')
    }
})



export default routes