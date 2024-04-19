
# Stocks App

Web-app to view stock prices in real-time.


## NOTE

- The requirements of the project were of 20 stocks, but polygon limits requests to 5 per minute
- So, at max, 5 stocks can be monitored at once.


## Run Locally

Clone the project

```bash
  git clone https://github.com/yashdodani/stocks-app.git
```

Go to the project directory

```bash
  cd stocks-app
```

Install dependencies

```bash
  npm install
```
- Before starting server, make sure to add environment variables to .env file.
Start the server

```bash
  npm run start:client
  npm run start:server
```



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file from polygon

`API_KEY`

## Client link

Client is hosted at (if port 5713 is not used)

```http
http://localhost:5173
````


## API Reference

#### Get stocks

```http
  GET /api/stocks/:n
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `n` | `number` | **Required**. Number of stocks |


Takes two numbers and returns the sum.

