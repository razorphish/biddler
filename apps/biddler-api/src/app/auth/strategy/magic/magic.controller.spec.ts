import { Test, TestingModule } from '@nestjs/testing';
import { MagicController } from './magic.controller';

describe('MagicMagicController', () => {
  let controller: MagicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MagicController]
    }).compile();

    controller = module.get<MagicController>(MagicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
