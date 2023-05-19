oauth2orize: oauth2 provider example, borrowed from gerges-beshay/oauth2orize-examples
it is lightly modified by @aren to support returning bank info.

Install and Usage
===

Run the following commands from inside the `viv-bank-folder` folder.

```
npm install
npm start
```

The server will start on port 8080.

Visit http://localhost:8080/login to see the server running locally.


Make the Endpoint Available to Bixby
===
The Oauth endpoint needs to be available for Bixby as a reachable endpoint.

To do this, you can use localtunnel to easily serve a local server online: https://localtunnel.github.io/www/.

Install localtunnel globally:
```
npm install -g localtunnel
```

Use the command line interface to request a tunnel to your local server:
```
lt --port 8080
```

This command will return a URL for you, e.g.:
```
your url is: https://famous-hounds-cry.loca.lt
```

Next, modify the `bank/resources/base/capsule.properties` file by changing the `config.default.endpoint` to your localtunnel URL.

```
# Replace the following with your endpoint URL.
config.default.endpoint=https://famous-hounds-cry.loca.lt
```

Add the client secret in tjhe [developer console](https://bixbydevelopers.com/dev/console) under the "Configuration & Secrets" section of your capsule's Settings pane. The secret key can be anything but the value must be "ssh-password" without the quotation marks. The `client-secret-key` in the `authorization.bxb` file requires the key you defined in the developer console.

Update the URLs in the capsule's `authorization.bxb` file to use the localtunnel endpoint domain

```
authorization {
  user {
    oauth2-authorization-code ("Mock Bank") {
      authorize-endpoint ("https://famous-hounds-cry.loca.lt/dialog/authorize") // <------ Update the domain to be your localtunnel endpoint domain
      client-id ("xyz123")
      client-secret-key (ssh-password) // <------ Update this value to be the secret key name
      scope ("transfer_money")
      token-endpoint ("https://famous-hounds-cry.loca.lt/oauth/token") // <------ Update the domain to be your localtunnel endpoint domain
    }
  }
}
```
Additionally, 


Troubleshooting
===

=localtunnel is down!=

Try another tunneling service, such as https://pagekite.net/ or https://serveo.net/.

=`no active client for 'aeuwnbixuv'` (or other similar error)=

Make sure your node server is started.

Changes
===
5/16/2023
@ameya.b - Updated to reflect change in client-secret value behavior

2/15/2018
Addressed issue with Token Not Found when server restarts.
