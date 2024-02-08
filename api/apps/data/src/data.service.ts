import { Injectable } from '@nestjs/common';
import { interval } from 'rxjs';
import { concatMap } from 'rxjs/operators';

@Injectable()
export class DataService {
    public constructor() {
        /* const asyncOperation = async (index: number): Promise<string> => {
            return 'test';
        };
        const sub = interval(2000).pipe(concatMap(asyncOperation)).subscribe({
            next(result) {
                console.log(result);
            },
            error(e) {
                console.log('erreuuur', e);
            },
            complete() {
                console.log('finiiii');
            }
        });
        // sub.unsubscribe(); */
    }
}
