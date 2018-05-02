# coingate-v2

Node.js Library for Coingate V2 API

## Prerequisites

- [ ] Node.js >= v8.x

## Installation

```bash
npm install coingate-v2
```

## Usage

Creating a client:

```javascript
const { client, testClient, Client, Config } = require('coingate-v2');

const coingate = client('your-token');
const testCongate = testClient('your-token');
```

Available methods:

```javascript
// https://developer.coingate.com/docs/create-order
await coingate.createOrder({
  price_amount, price_currency, receive_currency,
});

// https://developer.coingate.com/docs/get-order
await coingate.getOrder(orderId);

// https://developer.coingate.com/docs/list-orders
await coingate.listOrders();

// https://developer.coingate.com/docs/get-rate
await coingate.getExchangeRate(from, to);

// https://developer.coingate.com/docs/list-rates
await coingate.listExchangeRates();

// https://developer.coingate.com/docs/ping
await coingate.ping();
```

Running tests:

```javascript
npm run test
```

## Coverage

```
--------------|----------|----------|----------|----------|-------------------|
File          |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
--------------|----------|----------|----------|----------|-------------------|
All files     |    97.48 |    64.29 |      100 |    97.48 |                   |
 src          |      100 |      100 |      100 |      100 |                   |
  index.js    |      100 |      100 |      100 |      100 |                   |
 src/client   |    94.44 |    64.29 |      100 |    94.44 |                   |
  api.js      |      100 |      100 |      100 |      100 |                   |
  config.js   |      100 |    66.67 |      100 |      100 |                 5 |
  index.js    |    90.63 |    42.86 |      100 |    90.63 |          28,56,61 |
 test         |      100 |      100 |      100 |      100 |                   |
  client.js   |      100 |      100 |      100 |      100 |                   |
  coingate.js |      100 |      100 |      100 |      100 |                   |
--------------|----------|----------|----------|----------|-------------------|
```

## Roadmap

- [ ] Add full support of exchange rate APIs (merchant, trader etc.)

## Support development

I really love open source, however i do need your help to
keep the library up to date. There are several ways to do it:
open issues, submit PRs, share the library w/ community or simply-

<a href="https://etherdonation.com/d?to=0x4a1eade6b3780b50582344c162a547d04e4e8e4a" target="_blank" title="Donate ETH"><img src="https://etherdonation.com/i/btn/donate-btn.png" alt="Donate ETH"/></a>
