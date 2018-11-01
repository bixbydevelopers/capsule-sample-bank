function commitTransfer(transfer) {
  var postResult = http.oauthPostUrl(String(config.get("endpoint") + "/api/commit-transfer"), {}, {format: "json"});
  console.debug(postResult);
  return {
    transfer: transfer,
    transferTime: dates.ZonedDateTime.now().getDateTime()
  }
}

module.exports = {
  function: commitTransfer,
}