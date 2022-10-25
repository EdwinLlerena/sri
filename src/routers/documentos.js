import { Router } from "express";
import { homeIndex,getActualizar,count, createDocument, deleteDocument, getDocument, getDocuments, updateDocument } from "../controllers/documento.controller.js";
import { enviaMail } from "../controllers/enviarmail.controller.js";

const router= Router()

router.get('/home',homeIndex)
router.get('/',getActualizar)
router.get('/docu',getDocuments)
router.get('/docu/count',count)
router.get('/docu/:id',getDocument)
router.post('/docu',createDocument)
router.put('/docu/:id',updateDocument)
router.delete('/docu/:id',deleteDocument)

router.get('/email/:id',enviaMail)

export default router