# Stock Tracker
Stock Tracker with Spring Boot and React.

This project allows you to track Stocks in real time using the given stocks Ticker/Symbol. The values are refreshed every 3 seconds by default via the `YahooFinance` API.

Stock symbol/ticker is removed from the list if it is invalid.

## Prerequisites
* NodeJS 
* ReactJS
* npm
* Java 8

## How to Run
The WebSocket server and the UI are separate components/modules. So, they require that they be started individually.

### Start the Spring Boot WebSocket server
From the home directory of the project, run
  `mvn spring-boot:run`
### Start the Spring Boot WebSocket server
`cd` into the `frontend` directory and run `npm start`
