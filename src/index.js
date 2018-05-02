'use strict';

const Client = require('./client');
const Config = require('./client/config');

function testClient(token) {
  return Client.create({ token, mode: Config.SANDBOX });
}

function client(token) {
  return Client.create({ token, mode: Config.LIVE });
}

module.exports = { Client, Config, testClient, client };
