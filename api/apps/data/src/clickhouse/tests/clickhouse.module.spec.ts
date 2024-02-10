import { ClickhouseModule } from '../clickhouse.module';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { ClickHouseTestService } from '../clickhouse-test.service';

describe('ClickhouseModule', () => {
    let clickhouseTestService: ClickHouseTestService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ClickhouseModule]
        }).compile();

        clickhouseTestService = module.get<ClickHouseTestService>(ClickHouseTestService);

        await clickhouseTestService.createTestTable();
    });

    it('should successfully connect to ClickHouse', async () => {
        const result = await clickhouseTestService.testConnection();
        expect(result).toEqual([{ 1: 1 }]);
    });

    it('should insert data into test table', async () => {
        const insertResult = await clickhouseTestService.insertMultipleTestRows();
        expect(insertResult).toEqual(JSON.parse('[]'));
    });

    it('should select data from test table', async () => {
        const selectResult = await clickhouseTestService.selectTestTable();
        const expectedResult = JSON.parse('[{"firstname": "John", "id": 1, "lastname": "Doe"}, {"firstname": "Jane", "id": 2, "lastname": "Doe"}]');
        expect(selectResult).toEqual(expectedResult);
    });


    afterAll(async () => {
        await clickhouseTestService.dropTestTable();
    });
});
