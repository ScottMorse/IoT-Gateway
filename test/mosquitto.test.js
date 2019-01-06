const chai = require('chai')
const should = chai.should()

const mosquittos = require('../src/mosquittos/index')
const mosqUtils = require('../src/utils/mosqUtils')

function testMessaging(client){
  return new Promise((resolve,reject)=>{
    client.on('message',(topic,message)=>{
      topicReceived = topic
      messageReceived = message
      client.end()
      resolve({topic,message})
    })
    client.publish('testTopic',JSON.stringify({test:'testMessage'}))
    setTimeout(reject,1500)
  })
}

describe('Local Mosquitto Connection',()=>{
  it('connects without error',()=>{
    const client = mosqUtils.createClient(mosquittos.LOCAL_URI,mosquittos.LOCAL_NAME)
    should.exist(client)
    client.should.have.property('on')
    client.end()
  })
  it('publishes and receives messsages without error',(done)=>{
    const client = mosqUtils.createClient(mosquittos.LOCAL_URI,mosquittos.LOCAL_NAME)
    client.subscribe('testTopic')

    testMessaging(client).then(result => {
      const topic = result.topic
      const message = result.message ? JSON.parse(result.message) : undefined
      should.exist(topic)
      should.exist(message)
      topic.should.equal('testTopic')
      message.should.have.property('test')
      message.test.should.equal('testMessage')
      done()
    }).catch(e => done(e))
  })
})

describe('Remote Mosquitto Connection',()=>{
  it('connects without error',()=>{
    const client = mosqUtils.createClient(mosquittos.REMOTE_URI,mosquittos.REMOTE_NAME)
    should.exist(client)
    client.should.have.property('on')
  })
  it('publishes and receives messsages without error',(done)=>{
    const client = mosqUtils.createClient(mosquittos.REMOTE_URI,mosquittos.REMOTE_NAME)
    client.subscribe('testTopic')
    testMessaging(client).then(result => {
      const topic = result.topic
      const message = result.message ? JSON.parse(result.message) : undefined
      should.exist(topic)
      should.exist(message)
      topic.should.equal('testTopic')
      message.should.have.property('test')
      message.test.should.equal('testMessage')
      done()
    }).catch(e => done(e))
  })
})