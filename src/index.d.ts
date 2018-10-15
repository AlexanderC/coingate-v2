export function testClient(token: string): ClientType;
export function client(token: string): ClientType;
export let Client: Coingate;
export let Config: ConfigType;

interface ClientType {
  createOrder(options: CreateOrderOptions): Promise<(Order | ErrorCreateOrder)>;
  getOrder(orderId: number): Promise<(Order | ErrorGetOrder)>;
  listOrders(options: ListOrderOptions): Promise<ListOrdersReturn>;
  getExchangeRate(from: string, to: string): Promise<number>;
  listExchangeRates(): Promise<ExchangeRatesReturn>;
  ping(): Promise<PingReturn>;
}

interface CreateOrderOptions {
  order_id?: string;
  price_amount: number;
  price_currency: string;
  receive_currency: string;
  title?: string;
  description?: string;
  callback_url?: string;
  cancel_url?: string;
  success_url?: string;
  token?: string;
}

interface Order {
  id: number;
  status: string;
  price_currency: string;
  price_amount: string;
  pay_currency?: string;
  pay_amount?: string;
  receive_currency: string;
  receive_amount: string;
  created_at: string;
  expire_at?: string;
  payment_address?: string;
  order_id: string;
  payment_url: string;
}

interface ErrorCreateOrder {
  message: string;
  reason: string;
  errors: string[];
}

interface ErrorGetOrder {
  message: string;
  reason: string;
}

interface ListOrderOptions {
  per_page?: number;
  page?: number;
  sort?: string;
}

interface ListOrdersReturn {
  current_page: number;
  per_page: number;
  total_orders: number;
  total_pages: number;
  orders: Order[];
}

interface ExchangeRatesReturn {
  merchant: ExchangeEntry,
  trader: {
    buy: ExchangeEntry,
    sell: ExchangeEntry,
  },
}

type ExchangeEntry = {
  [id: string]: {
    [id: string]: string
  }
};

interface PingReturn {
  ping: string;
  time: string;
}


interface Coingate {
  new(config: any);

  /**
   * Injects API methods from config
   */
  injectApiMethods(metadata: any);

  /**
   * Make a request to API
   */
  request(method: string, entity: string, data: any, params: any): Promise<any>;

  /**
   * Build request headers
   */
  headers;

  /**
   * Authorization headers
   */
  authHeaders: {
    Authorization: string
  };

  /**
   * Create Coingate client
   */
  create(options: any);

  /**
   * Statis headers
   */
  STATIC_HEADERS;
}


interface ConfigType {
  new(options?: any);

  /**
   * Read config
   */
  config();

  /**
   * Get API base
   */
  apiUrl(mode): string;

  /**
   * Get API base path
   */
  apiBase(version: string): string;

  /**
   * Default config
   */
  DEFAULTS: {
    mode: string,
    version: string,
  }

  /**
   * Sandbox mode
   */
  SANDBOX: string;

  /**
   * Live mode
   */
  LIVE: string;
}
