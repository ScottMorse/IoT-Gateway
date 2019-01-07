const mosqUtils = require('../utils/mosqUtils')
const db = ('../db/db')

const LOCAL_NAME = 'Mosquitto Local Client'
const REMOTE_NAME = 'Mosquitto Test Server'

const LOCAL_URI = 'mqtt://localhost:1883'
const REMOTE_URI = 'mqtt://test.mosquitto.org'

const localClient = mosqUtils.createClient(LOCAL_URI,LOCAL_NAME)
const remoteClient = mosqUtils.createClient(REMOTE_URI,REMOTE_NAME)

localClient.on('message',(topic,message) => {
  mosqUtils.handleMessage(topic,message,LOCAL_NAME)
  remoteClient.publish(topic,message)
})

remoteClient.on('message',(topic,message) => {
  mosqUtils.handleMessage(topic,message,REMOTE_NAME)
})

module.exports = {
  LOCAL_NAME,
  REMOTE_NAME,
  LOCAL_URI,
  REMOTE_URI
}