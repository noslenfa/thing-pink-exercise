
/**
 * oAuth verification
 *
 * @method oauthVerification
 * @return {boolean}
 */
export const oauthVerification = () => {
  if(localStorage.getItem('oauthio_cache')) {
    return false;
  }

  const oauthio_cache = JSON.parse(localStorage.getItem('oauthio_cache'));
  const oauthio_provider = Object.keys(oauthio_cache)[0];
  const oauthio_provider_info = JSON.parse(decodeURIComponent(localStorage.getItem(oauthio_provider)));

  return !(oauthio_provider_info && 'access_token' in oauthio_provider_info && oauthio_provider_info.access_token)

}
