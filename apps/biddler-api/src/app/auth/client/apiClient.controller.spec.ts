import { Test, TestingModule } from '@nestjs/testing';
import { ApiClientController } from './apiClient.controller';
import { IDM } from '@biddler/db';

describe('ClientController', () => {
  let controller: ApiClientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiClientController],
      providers: [IDM.services.ApiClientService]
    }).compile();

    controller = module.get<ApiClientController>(ApiClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
