const KEYCHAIN = require('./keychain');
/**
 * Create env globals
 * @param {Object} envName
 * @return {Object} ENV
 */
module.exports = function(envName) {

    envName = envName || 'production';

    let envs = {
      'local': {
        ENVIRONMENT  : 'development',
        BASE_URL     : 'localhost',
        API_URL      : 'https://api.dribbble.com/v1',
        OAUTH_IO_KEY : KEYCHAIN.LOCAL.OAUTH_IO_KEY,
        DRIBBBLE_KEY : KEYCHAIN.LOCAL.DRIBBBLE_KEY
      },
      'production': {
        ENVIRONMENT  : 'production',
        BASE_URL     : 'localhost', //TODO: update with correct app URL
        API_URL      : 'https://api.dribbble.com/v1',
        OAUTH_IO_KEY : KEYCHAIN.LOCAL.OAUTH_IO_KEY,
        DRIBBBLE_KEY : KEYCHAIN.LOCAL.DRIBBBLE_KEY
      }
    },
    selected = envs[envName];

    return {
      ENVIRONMENT  : selected.ENVIRONMENT,
      BASE_URL     : selected.BASE_URL,
      OAUTH_IO_KEY : selected.OAUTH_IO_KEY,
      DRIBBBLE_KEY : selected.DRIBBBLE_KEY,
      API          : {
        BASE  : selected.API_URL,
        SHOTS : '/shots'
      }
    };
};
