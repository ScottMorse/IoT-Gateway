const app = require('express')()
const RED = require('node-red')
const http = require('http')
const mosca = require('mosca')

const color = require('./utils/colorWrap')

//Node server
const server = http.createServer(app)
const port = process.env.PORT || 3000

//Mosca
const moscaSettings = {
  port: 1883,
  host: '127.0.0.1',
  //backend: // ascoltatore settings for DB
}

const moscaServer = new mosca.Server(moscaSettings)
moscaServer.on('ready', ()=>console.log(moscaServer));

//Node-Red
const redSettings = require('./red/settings.json')

RED.init(server,redSettings)

app.use(redSettings.httpAdminRoot,RED.httpAdmin)

app.use(redSettings.httpNodeRoot,RED.httpNode)

//starts
server.listen(port,()=>console.log('Server Listening on port ' + port))
RED.start().then(()=>require('./mosquittos/index'))