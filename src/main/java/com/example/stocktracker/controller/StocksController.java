package com.example.stocktracker.controller;

import com.example.stocktracker.model.StocksRequest;
import com.example.stocktracker.service.StocksService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;


@Controller
public class StocksController {

    @Autowired
    StocksService stocksService;
    
    @MessageMapping("/stocks")
    public void updateStockQuotes(StocksRequest stocksRequest){
        stocksService.updateStockQuotes(stocksRequest);
    }
}
