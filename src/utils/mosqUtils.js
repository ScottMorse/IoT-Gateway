const mqtt = require('mqtt')

const TOPICS = [
  'tg-temp-1',
  'tg-temp-2',
  'tg-temp-3'
]

const RED = '\033[0;31m'
const NC = '\033[0m'
const CYAN = '\033[0;36m'
const GREEN = '\033[1;32m'
const PURPLE = '\033[1;35m'

const handleConn = (err,client,clientName) => {
  if(err) {
    if(err.returnCode !== 0){
      console.log(`${CYAN}[${clientName}] ${RED}Connection error${NC}\n`,err)
    }
  }
  else{
    console.log(`${CYAN}[${clientName}] ${GREEN}Connected!${NC}`)
    for (topic of TOPICS){
      client.subscribe(topic)
    }
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
  console.log(`\n${CYAN}[${clientName}] ${PURPLE}Message (Topic: ${topic}):${NC}\n`,String(message))
}