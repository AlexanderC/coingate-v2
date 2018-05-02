class Config {
  /**
   * @param {*} options 
   */
  constructor(options = {}) {
    this.options = options;
  }

  /**
   * Read config
   */
  get config() {
    const config = { ...Config.DEFAULTS, ...this.options };

    const { mode, version } = config;

    config.apiUrl = Config.apiUrl(mode);
    config.apiBase = Config.apiBase(version);

    return config;
  }

  /**
   * Get API base
   * @param {string} mode
   */
  static apiUrl(mode) {
    let suffix = '';

    if (mode !== this.LIVE) {
      suffix = '-sandbox';
    }

    return `https://api${ suffix }.coingate.com`;
  }

  /**
   * Get API base path
   * @param {string} version
   */
  static apiBase(version) {
    return version;
  }

  /**
   * Default config
   */
  static get DEFAULTS() {
    return {
      mode: this.LIVE,
      version: 'v2',
    };
  }

  /**
   * Sandbox mode
   */
  static get SANDBOX() {
    return 'sandbox';
  }

  /**
   * Live mode
   */
  static get LIVE() {
    return 'live';
  }
}

module.exports = Config;
