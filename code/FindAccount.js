var http = require('http')
var console = require('console')
var config = require('config')
function findAccount(accountType) { 
  var get_result = http.oauthGetUrl(String(config.get("endpoint") + "/api/userinfo"), {format: "json"});
  // Use console.debug to show the resulting object in the Debug Console.
  console.debug(get_result);
  
  var result = get_result.filter(function(account){
    return (!accountType || account.accountType.toUpperCase() == accountType.toUpperCase());
  })
  return result;
}

module.exports = {
  function: findAccount
}