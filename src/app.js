import express from "express";
import cors from "cors";
import  docuemntosRouter  from "./routers/documentos.js";
import { join,dirname } from 'path'
import {fileURLToPath} from 'url';
const _dirname = dirname(fileURLToPath(import.meta.url))

console.log(`esta es la direccion fisica del proyecto ${_dirname}`)
const app = express()
//app.use(cors)
app.set('view engine','ejs')
app.set('views',join(_dirname,'views'))
app.use('/utils', express.static(_dirname + '/public'));
app.use(express.json())
app.use(docuemntosRouter)


export default  app
