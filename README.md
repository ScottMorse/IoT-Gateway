# IoT-Gateway
Express app using Node-Red/Mosquitto

## Getting Started
Run `npm install` after cloning.  `npm start` runs the server.  Use `npm run dev` to run Nodemon, and `npm run test` to run tests via Mocha.

## Node-Red
There is an embedded Node-Red instance which uses the `settings.json` and `flow.json` files located in the `/src/red` directory.
When the express server starts, one can navigate to `localhost:3000/red` to use the Node-Red editor, but new flows must be exported 
to `flow.json`, or Red will re-write the flows on startup.  Currently, three dummy temperature devices push to the local Mosca server, which is initialized by the gateway app.

## MQTT.js
The file `mosquittos/index.js` starts up two MQTT clients.  One is a local client which connects to the local MQTT broker,
and the other is a remote cliet that currently connects to the Mosquitto test server.  Both clients subscribe to the topics listed in `src/utils/topics`,
which should match the topics which the Node-Red instance publishes to.  When the local client receives a message from Node-Red,
it publishes the message to the remote client.  Eventually, it should also push to a local database.
