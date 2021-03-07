const prepare = require('../bff/prepare');

module.exports = {
  afterServer: async () => {
    if (process.env.NODE_ENV === 'production') {
    }
  },
  beforeServer: async (app) => {
    if (process.env.NODE_ENV === 'production') {
      prepare(app);
    }
  }
};