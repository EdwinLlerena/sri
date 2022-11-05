import  fs  from "fs";
import xml2js from "xml2js";
import path, { join,dirname } from 'path'
import {fileURLToPath} from 'url';
import { json } from "express";
import { getConection } from "../database.js";
import dotenv from 'dotenv'
dotenv.config()

const xml = new xml2js.Parser()
//const _url= '/Users/edwinllerena/SRI/DOCUMENTOS/AUTORIZADOS/'
//const _url = '/Users/edwinllerena/nn2/'
const _url= process.env.DIR_ARCHIVO
console.log(`la ruta fisica de los archivos ${_url}`)

export function crearDocuemntos() {
  
  //if(fs.existsSync("./db.json")){

   // console.log("la base EXISTE!");

      /*  const d= "0510202201180382279800120010020000000031234567818"
       fs.readFile('./db.json', (err, data) => {
        if (err) throw err;
        let dd = JSON.parse(data);

        const res =dd.documentos.find((t)=>t.numeroAutorizacion=== d)
        if (!res) {
          console.log("dato no encontrado")
        }
        
        console.log(dd.documentos[0].numeroAutorizacion);
        });
     */
    

    fs.readdir(_url,(error,files)=>{
    
      if (error) {
      throw console.error();
    }

    console.log(files.length)

    //recorro los archivos 
     files.forEach( (file)=>{     

        const pht=_url+file
       // console.log(pht)
        const a = path.extname(pht)
       if (a==='.xml') {
        leerDescont(pht)
       }
        

    })

  })

 // }else{
  //  console.log("La base NO EXISTE!");
 // } 

       
  


}

function leerDescont(urlFile) {
  
  let razonSocialEmisor=""
  let codDoc=""
  let numeroDocuemnto=""
  let numeroAutorizacion=""
  let fechaAutorizacion=""
  let fechaEmision =""
  let razonSocialComprador=""
  let importeTotal=""
  let Email = ""
  

    fs.readFile(urlFile,(err,data)=>{
    //console.log(urlFile)
      let newDocument = new Object(); 
     xml.parseString(data,  (err,result) =>{
     
      //console.log(result)
       numeroAutorizacion=result.autorizacion.numeroAutorizacion[0]  

      fs.readFile('./db.json', async (err, data) => {
        if (err) throw err;
        let dd = JSON.parse(data);

        const res =dd.documentos.find((t)=>t.numeroAutorizacion=== numeroAutorizacion)
        if (res) {
          console.log("dato encontrado")
          return       
        }
             
       
        
       const fAuto= result.autorizacion.fechaAutorizacion
         Object.keys(fAuto ).map(key=>{
            result.autorizacion.fechaAutorizacion [key]
         })
      fechaAutorizacion= fAuto[0]._
    
      //const res=util.inspect(result.autorizacion.comprobante[0],false,null,true)
      const comprobante = result.autorizacion.comprobante[0]
      //console.log(comprobante)
      let datos = comprobante.replace(/(\r\n|\n|\r)/gm, "")
      console.log(datos)
      xml.parseString(datos, (err,res)=>{
          Object.keys(res).map(key =>{
           const value=res[key]
           
            razonSocialEmisor= value.infoTributaria[0].razonSocial[0]
            codDoc=value.infoTributaria[0].codDoc[0]
            numeroDocuemnto=
            value.infoTributaria[0].estab[0]+
            value.infoTributaria[0].ptoEmi[0]+'-'+
            value.infoTributaria[0].secuencial[0]
            
            fechaEmision=value.infoFactura[0].fechaEmision[0]
            razonSocialComprador=value.infoFactura[0].razonSocialComprador[0]
            importeTotal=value.infoFactura[0].importeTotal[0]
           
           //console.log( value.infoAdicional)
           //const infoFactura=value.infoFactura
           const infoadicional =value.infoAdicional
           
           
           Object.keys(infoadicional).map(key=>{
            const dato = infoadicional[key].campoAdicional
           
            const valor = Object.values(dato)

            //console.log(valor);
            valor.forEach(element => {              
             
            if (element._.includes("@"))
              Email= element._          
            
            });
            //console.log(Email)
             
           })
          })    
        })

          newDocument.numeroAutorizacion=numeroAutorizacion
          newDocument.fechaAutorizacion=fechaAutorizacion,
          newDocument.razonSocialEmisor=razonSocialEmisor,
          newDocument.codDoc=codDoc,
          newDocument.numeroDocuemnto=numeroDocuemnto,
          newDocument.fechaEmision=fechaEmision,
          newDocument.razonSocialComprador=razonSocialComprador,
          newDocument.importeTotal=importeTotal,
          newDocument.Email=Email
          
           try {
    
            const db =getConection()
            db.data.documentos.push(newDocument)
            await db.write();

          } catch (error) {
            return json({message:error.message})
          }

          // console.log(dd.documentos[0].numeroAutorizacion);
        });

      })

     })
}
