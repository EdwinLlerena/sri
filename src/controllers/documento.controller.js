import { json } from "express";
import  fs  from "fs";
import xml2js from "xml2js";
import { v4 } from "uuid";
import { getConection } from "../database.js";
import { crearDocuemntos } from "../services/obternerDocuemnetos.js";

export const homeIndex=(req,res)=>{
  crearDocuemntos()
  const puerto= process.env.PORT
  const documentos=getConection().data.documentos;
  console.log(documentos);
  res.render('index',{documentos,puerto})
}

export const getActualizar= (req,res)=>{
    crearDocuemntos()
    res.send('Actualizado')
}

export const getDocuments =  (req,res)=>{

  const documentos=getConection().data.documentos;
  //res.render('index',{documentos})
  res.json(arc)
}

export const createDocument = async (req,res)=>{
  
  
  const newDocument ={
    id:v4(),
    empresa:req.body.empresa,
    email:req.body.email
  }
  try {
    
    const db =getConection()
    db.data.documentos.push(newDocument)
    await db.write();
    res.json(newDocument)

  } catch (error) {
    return res.status(500).send({message:error.message})
  }
  

  
}
export const getDocument = (req,res)=>{
  res.send('enviando uno')
}
export const updateDocument = (req,res)=>{
  res.send('actualizando')
}
export const deleteDocument = (req,res)=>{
  res.send('eliminando ')
}
export const count = (req,res)=>{
  res.send('contando ')
}