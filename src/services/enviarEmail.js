import { json } from 'express';
import nodemailer from 'nodemailer';


const createTrans =()=>{

    const transport = nodemailer.createTransport({
    host: process.env.HOST_EMAIL,
    port: process.env.PUERTO_EMAIL,
    secure:process.env.SECURE_EMAIL,
    auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.PASS_EMAIL
  }
  });
  return transport

}

const sendMail =async(docu)=>{
  const transport = createTrans()
  try {   
  
  const info =await transport.sendMail({
    from: ' "SENDEDW" <info@edw.com>',
    to:`${docu.Email};${process.env.USER_EMAIL}`,
    subject:"Comprobantes Electrónicos - FACTURA",
    html:`</br>Estimado(a):${docu.razonSocialComprador} 
          </br>Reciba un cordial saludo. Nos complace informarle que hemos generado un comprobante electrónico con el siguiente detalle:
          </br>FACTURA No: ${docu.numeroDocuemnto}
          </br>Fecha Emisi&iacute;n: ${docu.fechaEmision}
          </br>Total: ${docu.importeTotal}</br>
          </br>Atentamente:
          </br>${docu.razonSocialEmisor}

    `,
     attachments: [
        {
            filename: 'mailtrap.xml',
            path: process.env.DIR_ARCHIVO+`${docu.numeroAutorizacion}.xml`,
            cid: 'uniq-mailtrap.xml'
        }
    ]
  })
  console.log("Message sent:%s",info)
  return 'ok'

  } catch (error) {
    console.log(error)
    return error.response
  }

}

export default sendMail