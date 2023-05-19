import http from 'http';
import console from 'console';
import config from 'config';

export default function commitTransfer({ transfer, $vivContext }) {

  var postResult = http.oauthPostUrl(
    String(config.get('endpoint') + '/api/commit-transfer'),
    {},
    { format: 'json' }
  );
  console.debug(postResult);

  // create a new Date object set to 8 AM, September 16, 2022, PDT
  const myDate = new Date()

  // returns 'Sep 17, 2022, 12:00:00 AM GMT+9'
  let formattedDate = myDate.toLocaleString($vivContext.locale, {
    dateStyle: 'medium',
    timeStyle: 'long',
    timeZone: $vivContext.timezone,
  })
  return {
    transfer: transfer,
    transferTime: formattedDate,
  };
}