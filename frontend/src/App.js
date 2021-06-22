// import './App.css';
// import Stock from './components/Stock'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import { useState, useEffect } from 'react';
import AddStock from './components/AddStock';
import Stocks from './components/Stocks';

let socket

function App() {

  const [stocks, setStocks] =  useState([])
  // const [stocksmap, setStocksmap] =  useState()

  // const getStocks = (stocks, stocksmap) => {
  //   console.log("getStocks", stocksmap)
  //   // stocks.forEach((stock) => {
  //   //   console.log("checking ", stock.symbol)
  //   //   if(stocksmap.has(stock.symbol)){
  //   //     console.log("EXISTS ", stocksmap[stock.symbol])
  //   //     stock.name = stocksmap[stock.symbol].name
  //   //     stock.price = stocksmap[stock.symbol].price
  //   //   } else {
  //   //     console.log("DOES NOT EXIST")
  //   //     stock.name = "Invalid"
  //   //   }
  //   // });
  //   setStocks(stocks)
  // }

  const getStocks = (stocks) => {
    setStocks(stocks)
  }

  useEffect(() => {
    socket = Stomp.over(new SockJS("http://localhost:8000/websocket"))
    socket.connect({}, function (frame) {
      console.log('Connected: ' + frame);
      socket.subscribe('/topic/stockquotes', function (response) {
        const data = JSON.parse(response.body);
          console.log(data);
          // getStocks(stocks, data);
          getStocks(data);
      });
  });
  // }, [stocks])
  }, [])

  const addStock = (stock) => {
    console.log("AddStock", stock)
    const id = Math.floor(Math.random() * 10000) + 1
    const newStock = {id, ...stock}
    setStocks([...stocks, newStock])
    // socket.send("/ws/stocks", {}, stock.symbol);
    socket.send("/ws/stocks", {}, JSON.stringify({"symbol": stock.symbol, "type": "ADD"}));
  }

  const onDelete = (stock) => {
    console.log("delete", stock)
    setStocks(stocks.filter((currStock) => currStock.id !== stock.id))
    socket.send("/ws/stocks", {}, JSON.stringify({"symbol": stock.symbol, "type": "DELETE"}));
  }

  return (
    <div className="container">
        <h1>
          Stock Tracker
        </h1>
        <AddStock onAdd={addStock} />
        <Stocks stocks={stocks} onDelete={onDelete} />
    </div>
  );
}

export default App;
