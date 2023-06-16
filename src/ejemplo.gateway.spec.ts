import { Test, TestingModule } from '@nestjs/testing';
import { EjemploGateway } from './ejemplo.gateway';

describe('EjemploGateway', () => {
  let gateway: EjemploGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EjemploGateway],
    }).compile();

    gateway = module.get<EjemploGateway>(EjemploGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
