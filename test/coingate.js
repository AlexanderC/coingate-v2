const { client, testClient, Client, Config } = require('../src/index');
const { expect } = require('chai');
const { token } = require('./config.json');

describe('Coingate', () => {
  it('#client() should return Coingate instance', async () => {
    expect(client(token)).to.be.an.instanceof(Client);
  });

  it('#testClient() should return Coingate instance', async () => {
    expect(testClient(token)).to.be.an.instanceof(Client);
  });

  it('#client() should have network=LIVE', async () => {
    expect(client(token).config.mode).to.be.equal(Config.LIVE);
  });

  it('#testClient() should have network=SANDBOX', async () => {
    expect(testClient(token).config.mode).to.be.equal(Config.SANDBOX);
  });
});
