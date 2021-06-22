package com.example.stocktracker.service;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import yahoofinance.Stock;
import yahoofinance.YahooFinance;

import java.io.IOException;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;

import com.example.stocktracker.model.StocksResponse;

@Service
public class StockQuotesStreamer implements InitializingBean {

    private final SimpMessagingTemplate simpMessagingTemplate;
    private final StocksService stocksService;

    @Autowired
    public StockQuotesStreamer(SimpMessagingTemplate simpMessagingTemplate, StocksService stocksService) {
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.stocksService = stocksService;
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        Flux.interval(Duration.ofSeconds(3L))
            .map((n) -> {
                Map<String, Stock> map = null;
                List<String> symbols = stocksService.getStockSymbols();
                List<StocksResponse> list = new ArrayList<>();

                if(symbols.size() > 0) {
                    try {                    
                        map = YahooFinance.get(symbols.toArray(new String[symbols.size()]));
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    
                    map.values().forEach(stock -> {
                        StocksResponse stocksResponse = new StocksResponse();
                        stocksResponse.setId(ThreadLocalRandom.current().nextInt(1, Integer.MAX_VALUE));
                        stocksResponse.setSymbol(stock.getSymbol());
                        stocksResponse.setName(stock.getName());
                        stocksResponse.setPrice(stock.getQuote().getPrice());
                        list.add(stocksResponse);
                    });
                }
                return list;
            })
            .subscribe(message -> simpMessagingTemplate.convertAndSend("/topic/stockquotes", message));
    }
}
