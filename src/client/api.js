module.exports = {
  async checkoutOrder(order_id, pay_currency) {
    return { method: 'POST', entity: `orders/${ order_id }/checkout`, data: { pay_currency } };
  },
  async createOrder({
    order_id, price_amount, price_currency,
    receive_currency, title, description,
    callback_url, cancel_url, success_url, token
  }) {
    return { method: 'POST', entity: 'orders', data: {
      order_id, price_amount, price_currency,
      receive_currency, title, description,
      callback_url, cancel_url, success_url, token
    }};
  },
  async getOrder(order_id) {
    return { method: 'GET', entity: `orders/${ order_id }` };
  },
  async listOrders({ per_page = 100, page = 1, sort = 'created_at_desc' } = {}) {
    return { method: 'GET', entity: 'orders', params: { per_page, page, sort } };
  },
  async getExchangeRate(from, to) {
    return {
      method: 'GET',
      entity: `rates/merchant/${ from.toUpperCase() }/${ to.toUpperCase() }`,
    };
  },
  async listExchangeRates() {
    return { method: 'GET', entity: 'rates' };
  },
  async ping() {
    return { method: 'GET', entity: 'ping' };
  },
};
