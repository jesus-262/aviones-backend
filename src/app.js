






/*
import pool  from './database';
import morgan  from 'morgan';
import 'dotenv/config';



import fileUpload from 'express-fileupload';

import cors  from 'cors';*/
//const pool = require('./database');
const express = require('express');
const morgan = require('morgan');
const fileUpload =require('express-fileupload')
const cors = require('cors');

require('dotenv').config()
const app=express();
console.log("server iniciado");
app.use(cors({
    credentials: true,
    ControlAllowCredentials:true,
    origin: process.env.CORS_ORIGIN || "http://localhost:3000"
  }));
//midelware
//saber si es post o get en la peticion



app.use(morgan('dev'));
app.use(fileUpload({
  tempFileDir: '/temp'
    
  }));
//solo formatos de string
app.use(express.urlencoded({extended:false}));
//solo formatos json
app.use(express.json());


//routes
//routes

app.use('/api',require('./routes/auth.routes'));

app.use('/api',require('./routes/usuario.routes'));

app.use('/api',require('./routes/rutas.routes'));
app.use('/api',require('./routes/admin.routes'));
//app.use('/api',require('./routes/excel.routes'));
app.set('port', process.env.PORT || 2000);
app.listen(app.get('port'));


//export default app;
module.exports =app;

