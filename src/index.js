const app = require('express')()
const RED = require('node-red')
const http = require('http')

const redSettings = require('./red/settings.json')

const server = http.createServer(app)

RED.init(server,redSettings)

app.use(redSettings.httpAdminRoot,RED.httpAdmin)

app.use(redSettings.httpNodeRoot,RED.httpNode)

const port = process.env.PORT || 3000

server.listen(port,()=>console.log('Server Listening on port ' + port))

RED.start().then(()=>require('./mosquittos/index'))