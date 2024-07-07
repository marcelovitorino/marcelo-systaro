import { autoinject } from 'aurelia-framework';

@autoinject
export class WebSocketService {
    private socket: WebSocket;
    private wordCallback: (message: string) => void;
    private isConnected: boolean = false;

    constructor() {
        this.socket = new WebSocket('ws://localhost:8085/word');
        this.socket.onmessage = this.handleMessage.bind(this);
        this.socket.onclose = this.handleClose.bind(this);
        this.socket.onerror = this.handleError.bind(this);
        this.socket.onopen = this.handleOpen.bind(this);
    }

    public setWordCallback(callback: (message: string) => void) {
        this.wordCallback = callback;
    }

    private handleMessage(event: MessageEvent) {
        const message = event.data;
        if (this.wordCallback) {
            this.wordCallback(message);
        }
    }

    private handleClose(event: CloseEvent) {
        console.log('WebSocket closed:', event);
        this.isConnected = false;
        // Implement reconnect logic if needed
    }

    private handleError(event: Event) {
        console.error('WebSocket error:', event);
        // Handle WebSocket errors gracefully
    }

    private handleOpen(event: Event) {
        console.log('WebSocket connected:', event);
        this.isConnected = true;
        // Perform any initialization upon WebSocket connection
    }

    public startTask2() {
        if (this.isConnected) {
            // Send a message to start task 2 on the server
            this.socket.send('startTask2');
        } else {
            console.warn('WebSocket is not connected. Cannot start task.');
        }
    }

    public stopTask2() {
        if (this.isConnected) {
            // Send a message to stop task 2 on the server
            this.socket.send('stopTask2');
        } else {
            console.warn('WebSocket is not connected. Cannot stop task.');
        }
    }

    public close() {
        this.socket.close();
    }
}
