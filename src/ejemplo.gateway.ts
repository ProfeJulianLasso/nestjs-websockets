import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Subject } from 'rxjs';
import { Server, Socket } from 'socket.io';

class servicio {
  private subject = new Subject();

  constructor() {
    this.subject = new Subject();
  }

  tener() {
    return this.subject;
  }
}

const gola = new servicio();
gola.tener().next({
  para: 'todos',
  mensaje: [
    {
      id: 1,
      nombre: 'Juan',
    },
    {
      id: 2,
      nombre: 'Pedro',
    },
  ],
});

@WebSocketGateway()
export class EjemploGateway implements OnGatewayConnection {
  @WebSocketServer() private readonly server: Server;

  async handleConnection(@ConnectedSocket() client: Socket, ...args: any[]) {
    console.log(client.id);
    // console.log(client);
    await client.join('sala');
  }

  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody('hola') payload: any,
  ): void {
    const gola = new servicio();

    gola.tener().subscribe((data: { para: string, mensaje: string }) => {
      const paraQuien = data.para;
      const idCliente = hay que buscarlo en Redis (paraQuien);
      const ola = {
        data: data.mensaje,
      }
      this.server.to(idCliente).emit('sala', ola);
    });

    client.broadcast.emit('sala', 'mensaje');
    // client.emit('hola-mundo', 'Hola mundo para todos');
    this.server.emit('hola-mundo', 'Hola mundo para todos');
  }

  // @SubscribeMessage('hola-mundo')
  // holaMundo(@ConnectedSocket() client: Socket): string {
  //   return 'Hola mundo';
  // }

  @SubscribeMessage('las-cariñosas')
  lasCariñosas(
    @ConnectedSocket() client: Socket,
    @MessageBody('data') data: string,
  ): void {
    this.server.emit('las-cariñosas', data);
    client.broadcast.emit('las-cariñosas', data);
  }
}
