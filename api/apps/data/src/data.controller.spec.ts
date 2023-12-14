import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { DataController } from '@/apps/data/src/data.controller';
import { DataService } from '@/apps/data/src/data.service';

describe('DataController', () => {
    let dataController: DataController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [DataController],
            providers: [DataService]
        }).compile();

        dataController = app.get<DataController>(DataController);
    });

    describe('root', () => {
        it('should return "Hello World!"', () => {
            expect(dataController.getHello()).toBe('Hello World!');
        });
    });
});
