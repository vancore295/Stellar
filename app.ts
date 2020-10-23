import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
// import * as mongoose from 'mongoose';
import path from 'path';
import socketIo from 'socket.io';
import { createServer, Server } from 'http';

import initRoutes from './routes';
// import { Message } from './models/message';

const app = express();
const chatServer: Server = createServer(app);
const io: SocketIO.Server = socketIo(chatServer);


dotenv.config({ path: '.env' });
app.set('port', (process.env.PORT || 8000));
const chatPort = (process.env.CHAT_PORT || 8001);

app.use('/', express.static(path.join(__dirname, './src/build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));
initRoutes(app);
app.get('/*', function(req, res) {
  // res.sendFile(path.join(__dirname, '../src/build', 'index.html'));
  // res.send('Hellow World!');
});

app.listen(app.get('port'), () => {
  console.log('Stellar test server running on port: ' + app.get('port'));
});

export { app };
