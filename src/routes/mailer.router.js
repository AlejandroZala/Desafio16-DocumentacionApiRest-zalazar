import { Router } from "express";
import config from "../config/config.js";
import nodemailer from 'nodemailer';

const router= Router();

//CONFIGURACION MAILING
const APP_PASSWORD = config.APP_PASSWORD;
const APP_EMAIL = config.APP_EMAIL;
//Genero el vinculo entre el servico seleccionado y mi herramienta
const transport = nodemailer.createTransport({
    service: 'gmail',
    port:587,
    auth:{
        user:APP_EMAIL,
        pass:APP_PASSWORD
    }
});

router.get('/mail',async (req, res) => {
    const result = await transport.sendMail({
        from: 'Alejandro <alejandrodzalazar@gmail.com>',
        to:'galeza2012@hotmail.com',
        subject:'Correo de prueba mailing',
        html:`
        <div>
        <h1>ESTÉTICA PROFESIONAL</h1>
        <img src="cid:logo"/>
        <h1>Esta es un prueba de mailing en Backend</h1>
        </div>`,
        attachments:[
            {
                filename:'ListaPrecios.pdf',
                path:'./src/docs/listaPrecios.pdf'
            },
            {
                filename:'logoda.jpg',
                path:'./src/public/imagenes/logoda.jpg',
                cid:'logo'
            }
        ]
    })
    res.send({status:"success",payload:result})
})

export default router;

