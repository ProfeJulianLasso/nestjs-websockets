import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EjemploGateway } from './ejemplo.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, EjemploGateway],
})
export class AppModule {}
