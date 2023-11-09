import { Test, TestingModule } from '@nestjs/testing';
import { DataController } from './data.controller';
import { DataService } from './data.service';

describe('DataController', () => {
  let dataController: DataController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DataController],
      providers: [DataService],
    }).compile();

    dataController = app.get<DataController>(DataController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(dataController.getHello()).toBe('Hello World!');
    });
  });
});
