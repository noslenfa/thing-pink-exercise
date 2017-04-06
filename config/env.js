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
        ENVIRONMENT : 'development',
        BASE_URL    : 'localhost',
        API_URL     : 'https://api.dribbble.com/v1/',
        OAUTH_IO    : KEYCHAIN.LOCAL.OAUTH_IO
      },
      'production': {
        ENVIRONMENT : 'production',
        BASE_URL    : 'localhost', //TODO: update with correct app URL
        API_URL     : 'https://api.dribbble.com/v1/',
        OAUTH_IO    : KEYCHAIN.LOCAL.OAUTH_IO
      }
    },
    selected = envs[envName];

    return {
      ENVIRONMENT : selected.ENVIRONMENT,
      BASE_URL    : selected.BASE_URL,
      OAUTH_IO    : selected.OAUTH_IO,
      API         : {
        BASE : selected.API_URL
      }
    };
};
