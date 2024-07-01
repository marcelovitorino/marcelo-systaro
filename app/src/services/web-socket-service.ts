import { autoinject } from 'aurelia-framework';

@autoinject
export class WebSocketService {
    private socket: WebSocket;

    constructor() {
        this.socket = new WebSocket('ws://localhost:8085/word');
    }

    public onMessage(callback: (message: string) => void) {
        this.socket.onmessage = (event) => {
            console.log('Received message:', event.data);
            callback(event.data);
        };
    }
}
