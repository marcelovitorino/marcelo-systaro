package com.sytaro.webserver.handlers;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

/**
 * Handles WebSocket connections and sends random words to clients at regular intervals.
 * Uses a scheduled executor service to send messages periodically.
 *
 * WebSocket message handling:
 * - Receives START_MESSAGE to start sending messages.
 * - Receives STOP_MESSAGE to stop sending messages.
 */
public class WordHandler extends TextWebSocketHandler {
    private static final String START_MESSAGE = "startTask2";
    private static final String STOP_MESSAGE = "stopTask2";

    private List<String> words = Arrays.asList("cat", "dog", "mouse", "horse", "fox");
    private Random random = new Random();
    private ScheduledExecutorService executorService;
    private WebSocketSession currentSession;
    private boolean sendMessages = false; // Start with messages paused

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        this.currentSession = session;
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        if (START_MESSAGE.equals(payload)) {
            startSendingMessages();
        } else if (STOP_MESSAGE.equals(payload)) {
            stopSendingMessages();
        }
    }

    private void startSendingMessages() {
        if (!sendMessages) {
            sendMessages = true;
            executorService = Executors.newScheduledThreadPool(1);
            executorService.scheduleAtFixedRate(this::sendMessageTask, 0, 5, TimeUnit.SECONDS);
        }
    }

    private void sendMessageTask() {
        try {
            if (sendMessages && currentSession != null && currentSession.isOpen()) {
                String word = words.get(random.nextInt(words.size()));
                currentSession.sendMessage(new TextMessage(word));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void stopSendingMessages() {
        sendMessages = false;
        if (executorService != null) {
            executorService.shutdown();
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        if (executorService != null) {
            executorService.shutdown();
        }
        super.afterConnectionClosed(session, status);
    }
}
