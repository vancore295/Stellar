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
app.get('/*', function(req, res) {
  // res.sendFile(path.join(__dirname, '../src/build', 'index.html'));
  res.send('Hellow World!');
});

initRoutes(app);
app.listen(app.get('port'), () => {
  console.log('Unkpat test server running on port: ' + app.get('port'));
});

/*chatServer.listen(chatPort, function () {
  console.log('Running chat server on port %s', chatPort);
}); */

/* io.on('connect', (socket: any) => {
  console.log('Connected client on port %s.', chatPort);
  socket.on('message', (m: Message) => {
      console.log('[server](message): %s', JSON.stringify(m));
      io.emit('message', m);
  });

  socket.on('disconnect', () => {
      console.log('Client disconnected');
  });
}); */

/* mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
 (<any>mongoose).Promise = global.Promise;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');

  // initRoutes(app);


});*/

export { app };
