import { json } from 'express';
import nodemailer from 'nodemailer';


const createTrans =()=>{
  console.log(process.env.PASS_GMAIL)
  const transport = nodemailer.createTransport({
    host: process.env.HOST_GMAIL,
    port: process.env.PUERTO_GMAIL,
    secure:true,
    auth: {
    user: process.env.USER_GMAIL,
    pass: process.env.PASS_GMAIL
  }
  });
  return transport

}

const sendMail =async(docu)=>{
  const transport = createTrans()
  try {   
  
  const info =await transport.sendMail({
    from: ' "SENDEDW" <info@edw.com>',
    to:`${docu.Email};${process.env.USER_GMAIL}`,
    subject:"Comprobantes Electrónicos - FACTURA",
    html:`</br>Estimado(a):${docu.razonSocialComprador} 
          </br>Reciba un cordial saludo. Nos complace informarle que hemos generado un comprobante electrónico con el siguiente detalle:
          </br>FACTURA No: ${docu.numeroDocuemnto}
          </br>Fecha Emisi&iacute;n: ${docu.fechaEmision}
          </br>Total: ${docu.importeTotal}</br>
          </br>Atentamente:
          </br>${docu.razonSocialEmisor}

    `,
  })
  console.log("Message sent:%s",info)
  return 'ok'

  } catch (error) {
    console.log(error)
    return error.response
  }

}

export default sendMail