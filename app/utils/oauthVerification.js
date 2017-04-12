/**
 * oAuth verification
 *
 * @method oauthVerification
 * @return {boolean}
 */

//util used to verify if user is logged in or not
export const oauthVerification = () => {

 const oauthio_cache = JSON.parse(localStorage.getItem('oauthio_cache'));

 if(!oauthio_cache){
   return false;
 }

 const keys = Object.keys(oauthio_cache);
 const oauthio_provider_info = JSON.parse(decodeURIComponent(localStorage.getItem(keys[0])));

 return !(oauthio_provider_info && !!oauthio_provider_info.access_token);

}
