import  sendMail  from "../services/enviarEmail.js";
import { getConection } from "../database.js";
import  fs  from "fs";

export const enviaMail=  (req,res)=>{
    
    const id = req.params.id
    console.log(id)

    fs.readFile('./db.json', async (err, data) => {
        if (err) throw err;
        let dd = JSON.parse(data);

        const docu =dd.documentos.find((t)=>t.numeroAutorizacion=== id)
        //if (res) {
        // console.log("dato encontrado")
        //  return       
        //}

        console.log(docu)
        const rest= await sendMail(docu) 
        
        res.json(rest)

        
    })  


    
    //res.redirect('/home')
}
