const mqtt = require('mqtt')
const color = require('./colorWrap')

const TOPICS = require('./topics')

function successConn(client,clientName){
  console.log(color(`[${clientName}] `,'cyan') + color('Connected!','green'))
  for (topic of TOPICS){
    client.subscribe(topic)
  }
}

function failConn(err,clientName){
  console.log(color(`[${clientName}] `,'cyan') + color('Connection error\n','red'),err)
}

const handleConn = (err,client,clientName) => {
  if(err) {
    if(err.returnCode !== 0){
      failConn(err,clientName)
    }
    else{
      successConn(client,clientName)
    }
  }
  else{
    successConn(client,clientName)
  }
}

module.exports.createClient = (uri,clientName) => {
  const client = mqtt.connect(uri)
  client.on('connect',(err) => {
    handleConn(err,client,clientName)
  })
  return client
}

module.exports.handleMessage = (topic,message,clientName) => {
  console.log(color(`\n[${clientName}] `,'cyan') + color(`Message (Topic: ${topic}):\n`,'purple'),String(message))
}