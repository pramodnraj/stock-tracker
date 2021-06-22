package com.example.stocktracker.service;

import java.util.ArrayList;
import java.util.List;

import com.example.stocktracker.model.StocksRequest;
import org.springframework.stereotype.Component;


@Component
public class StocksService {
    private List<String> symbols = new ArrayList<>();

    public void updateStockQuotes(StocksRequest stocksRequest){
        if("ADD".equals(stocksRequest.getType())){
            symbols.add(stocksRequest.getSymbol().toUpperCase());
        } else {
            symbols.remove(stocksRequest.getSymbol().toUpperCase());
        }    
    }

    public List<String> getStockSymbols(){
        return symbols;
    }
    
}
