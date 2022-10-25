import {createConnection} from './database.js'
import { crearDocuemntos } from "./services/obternerDocuemnetos.js";
import app from "./app.js";
import dotenv from 'dotenv'
dotenv.config()

const port= process.env.PORT

createConnection()
//crearDocuemntos()
app.listen(port,()=>{
  console.log(`servidor on ${port}`)
})
