import { json } from 'express';
import nodemailer from 'nodemailer';

const createTrans =()=>{
  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
    user: "f87165c1e5c225",
    pass: "9a5be495525a7a"
  }
  });
  return transport

}

const sendMail =async(docu)=>{
  const transport = createTrans()
  try {   
  
  const info =await transport.sendMail({
    from: ' "Edwin Foo" <info@edw.com>',
    to:`${docu.Email}`,
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