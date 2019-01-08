const mosqUtils = require('../utils/mosqUtils')
const db = require('../db/db')

const LOCAL_NAME = 'MQTT Local'
const REMOTE_NAME = 'MQTT Remote'

const LOCAL_URI = 'mqtt://localhost:1883'
const REMOTE_URI = 'mqtt://test.mosquitto.org'

const localClient = mosqUtils.createClient(LOCAL_URI,LOCAL_NAME)
const remoteClient = mosqUtils.createClient(REMOTE_URI,REMOTE_NAME)

localClient.on('message',(topic,message) => {
  mosqUtils.handleLocalMessage(topic,message,LOCAL_NAME)
  db.insert(message)
  remoteClient.publish(topic,message)
})

remoteClient.on('message',(topic,message) => {
  mosqUtils.handleRemoteMessage(topic,message,REMOTE_NAME)
})

module.exports = {
  LOCAL_NAME,
  REMOTE_NAME,
  LOCAL_URI,
  REMOTE_URI
}