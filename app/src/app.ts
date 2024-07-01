import { autoinject } from "aurelia-dependency-injection";
import { WebSocketService } from './services/web-socket-service';
import { ENABLE_TASK_2 } from "config/consts";


@autoinject
export class App {
  public currentWord: string;
  private enableTask2: boolean;

  constructor(private webSocketService: WebSocketService) {}

  bind() {
    this.enableTask2 = ENABLE_TASK_2;
  }

  start = async() => {
    this.webSocketService.onMessage((message) => {
        this.currentWord = message;
    });
  }

}
