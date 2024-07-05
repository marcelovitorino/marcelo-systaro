package com.sytaro.webserver.handlers;

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
 * Handles WebSocket connections and sends random words to clients at regular
 * intervals.
 * 
 * @author marcelo
 */
public class WordHandler extends TextWebSocketHandler {
	private List<String> words = Arrays.asList("cat", "dog", "mouse", "horse", "fox");
	private Random random = new Random();
	private ScheduledExecutorService executorService = Executors.newScheduledThreadPool(1);

	/**
	 * Called when a new WebSocket connection is established. Schedules a task to
	 * send random words to the connected session every 5 seconds.
	 *
	 * @param session The WebSocket session that has been established.
	 * @throws Exception Throws if an error occurs while sending messages.
	 */
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		executorService.scheduleAtFixedRate(() -> {
			try {
				String word = words.get(random.nextInt(words.size()));
				session.sendMessage(new TextMessage(word));
			} catch (Exception e) {
				e.printStackTrace();
			}
		}, 0, 5, TimeUnit.SECONDS);
	}
}
