import express from 'express';
import { Server } from 'socket.io';
const PORT = process.env.PORT || 3000;
const app = express();

const http = app.listen(PORT, () => console.log('Server on port 8080'));
const io = new Server(http, {
  cors: {
    origin: '*',
  },
});

app.get('/', (req, res) => {
  res.status(200).send('Vercel response');
});

io.on('connection', socket => {
  console.log('Nuevo usuario!');
  socket.on('disconnect', () => {
    console.log('Usuario desconectado!');
  });

  socket.on('newMessage', data => {
    console.log(data);
    io.emit('updateMessages', data);
  });
});
