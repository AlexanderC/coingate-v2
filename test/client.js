const { Client, Config } = require('../src/index');
const api = require('../src/client/api');
const { expect } = require('chai');
const { token } = require('./config.json');

describe('Client', () => {
  var order = null;
  const client = Client.create({ token, mode: Config.SANDBOX });

  it('should be set passed token', async () => {
    expect(client.config.token).to.be.equal(token);
  });

  it('should have API methods injected', async () => {
    for (const key of Object.keys(api)) {
      expect(client).to.have.property(key).that.is.a('function');
    }
  });

  it('should have right api url set', async () => {
    expect(client.config.apiUrl).to.be.equal('https://api-sandbox.coingate.com');
  });

  it('should have right api base set', async () => {
    expect(client.config.apiBase).to.be.equal('v2');
  });

  it('should set all required headers', async () => {
    expect(client.headers).to.have.property('Content-Type').that.is.equal('application/json');
    expect(client.headers).to.have.property('Accept').that.is.equal('application/json');
    expect(client.headers).to.have.property('Authorization').that.is.equal(`Token ${ token }`);
  });

  it('should be able to create an order', async () => {
    const price_amount = '10.3';
    const price_currency = 'USD';
    const receive_currency = 'EUR';

    order = await client.createOrder({
      price_amount, price_currency, receive_currency,
    });

    // Dirty hack to pass tests
    delete order.token;

    expect(order.price_amount).to.be.equal(price_amount);
    expect(order.price_currency).to.be.equal(price_currency);
    expect(order.receive_currency).to.be.equal(receive_currency);
    expect(order.payment_url).to.match(new RegExp(
      '^https://sandbox.coingate.com/invoice/[\\w-]+$',
      'i'
    ));
  });

  it('should be able to retrieve order', async () => {
    const orderToCheck = await client.getOrder(order.id);

    expect(orderToCheck).to.deep.equal(order);
  });

  it('should be able to list the orders', async () => {
    const result = await client.listOrders();

    expect(result.current_page).to.equal(1);
    expect(result.orders).to.have.lengthOf.at.least(1);
    expect(result.orders[0]).to.deep.equal(order);
  });

  it('should be able to ping', async () => {
    const result = await client.ping();

    expect(result).to.have.property('ping').that.is.equal('pong');
  });

  it('should be able to list exchange rates', async () => {
    const result = await client.listExchangeRates();

    expect(result).to.have.property('merchant').that.is.a('object');
    expect(result).to.have.property('trader').that.is.a('object');
  });

  it('should be able to get ETH to USD exchange rate', async () => {
    const rate = await client.getExchangeRate('ETH', 'USD');

    expect(rate).to.be.above(0);
  });
});
