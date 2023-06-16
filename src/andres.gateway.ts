import { Controller, Get, Injectable, UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Subject } from 'rxjs';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class AndresGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer() private readonly server: Server;

  constructor(private readonly satellite: Satellite) {}

  afterInit(server: Server) {
    throw new Error('Method not implemented.');
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    client.id;
  }

  @UseGuards()
  async handleConnection(@ConnectedSocket() client: Socket) {
    console.log(client.id);
    await client.join('sala');
  }

  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody('hola') payload: any,
  ): void {
    // client.broadcast.emit('sala', 'mensaje');
    // this.server.emit('hola-mundo', 'Hola mundo para todos');
    this.satellite.getSatellite().subscribe((data) => {
      const idClienteWebsocket = data.id + 'idClienteWebsocket';
      this.server.to(idClienteWebsocket).emit('sala', data);
    });
  }
}

export type Message = { id: string; message: string };

@Injectable()
export class Satellite {
  private subject: Subject<Message>;

  constructor() {
    this.subject = new Subject<Message>();
  }

  getSatellite() {
    return this.subject;
  }
}

@Controller()
export class AndresController {
  constructor(private readonly satellite: Satellite) {}

  @Get()
  getHello(): void {
    this.satellite.getSatellite().next({ id: 'Andres', message: 'Hola mundo' });
  }
}
