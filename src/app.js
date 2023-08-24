import express from 'express';
import nodemailer from 'nodemailer';
import twilio from 'twilio';
import config from './config/config.js';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import winston from 'winston';
import attachLogger from './middlewares/logger.js';
import {Server} from 'socket.io';

import mailerRouter from './routes/mailer.router.js';
import userErrorsRouter from './routes/userErrors.router.js';
import errorHandler from './middlewares/error.js';
import loggerTestRouter from './routes/logger.router.js';
import productMocksRouter from './routes/productsMocks.router.js';
import userMocksRouter from './routes/usersMocks.router.js';
import UserRouter from './routes/users.router.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import sessionsRouter from './routes/session.router.js';
import SessionsJwtRouter from './routes/sessionJwt.router.js';

import initializePassportStrategies from './config/passport.config.js';
import registerChatHandler from './listeners/chatHandler.js';
import __dirname from './utils.js';

const app = express();

//CONFIGURACIÓN LOGGER
app.use(attachLogger);

//prueba custom router
const userRouter =new UserRouter();
const sessionsJwtRouter = new SessionsJwtRouter();

// const PORT = process.env.PORT ||8080;
const PORT = config.PORT;
mongoose.connect(config.MONGO_URL)

const server = app.listen(PORT,() => console.log(`Listening on port ${PORT}`));
const io = new Server(server);      //Levanto mi server

app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`));

app.use(cookieParser());

initializePassportStrategies();

app.use('/', loggerTestRouter)
app.use('/', mailerRouter);
app.use('/api/userErrors', userErrorsRouter);
app.use('/api/mockingProducts',productMocksRouter);
app.use('/api/mockingUsers', userMocksRouter);
app.use('/api/products', productsRouter); //Cuando llegue la peticion la redirije a usersRouter
app.use('/api/carts', cartsRouter);
app.use('/',viewsRouter);
// app.use('/api/sessions', sessionsRouter);
app.use('/api/users', userRouter.getRouter());
app.use('/api/sessions', sessionsJwtRouter.getRouter());
app.use(errorHandler);

//creo middleware para referenciar mi io
app.use((req,res,next) => {
    req.io = io;
    next();
})

io.on('connection',socket=>{
    registerChatHandler(io,socket);
    console.log("Socket conectado");
})