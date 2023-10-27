import {Injectable} from "@nestjs/common";
import {Cron} from "@nestjs/schedule";

@Injectable()
export class BlockExplorerService {
    // Je souhaite un cron toute les secondes
    @Cron('*/1 * * * * *')
    handleCron() {
        console.log('------CRON RUNNING-------');
    }
}