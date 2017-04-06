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
        API_URL     : 'https://api.dribbble.com/v1/'
      },
      'production': {
        ENVIRONMENT : 'production',
        BASE_URL    : 'localhost', //TODO: update with correct app URL
        API_URL     : 'https://api.dribbble.com/v1/'
      }
    },
    selected = envs[envName];

    return {
      ENVIRONMENT : selected.ENVIRONMENT,
      API         : {
      }
    };
};
