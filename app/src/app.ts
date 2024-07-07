import { autoinject } from 'aurelia-framework';
import { WebSocketService } from './services/web-socket-service';
import { ENABLE_TASK_2 } from 'config/consts';

@autoinject
export class App {
    public currentWord: string;
    private enableTask2: boolean;
    private task2Started: boolean = false;

    constructor(private webSocketService: WebSocketService) {}

    bind() {
        this.enableTask2 = ENABLE_TASK_2;
        this.webSocketService.setWordCallback((message) => {
            this.currentWord = message;
        });
    }

    startOrStopTask2() {
        if (this.task2Started) {
            this.webSocketService.stopTask2();
            this.currentWord = '';
        } else {
            this.webSocketService.startTask2();
        }
        this.task2Started = !this.task2Started;
    }

    detached() {
        this.webSocketService.close();
    }
}
