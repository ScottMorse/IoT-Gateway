const chai = require('chai')
const should = chai.should()

const http = require('http')
const expressApp = require('express')()
const RED = require('node-red')

const redSettings = require('../src/red/settings.json')
const flowFile = require('../src/red/flow.json')

const server = http.createServer(expressApp)

const color = require('../src/utils/colorWrap')

describe(color('Node-Red Initialization','yellow'),()=>{
  it('initializes without error',()=>{
    RED.init(server,redSettings)
  })
  it('starts without error',(done)=>{
    RED.start().then(done)
  })
  it('uses the correct flow from src/red/flow.json',(done)=>{
    new Promise((resolve,reject) => {
      let count = 0
      const checker = setInterval(()=>{
        const flowNode = RED.nodes.getFlows()
        if(flowNode.hasOwnProperty('flows')){
          if(flowNode.flows.length >= 1){
            clearInterval(checker)
            resolve(flowNode)
          }
        }
        if(count == 20){
          reject("Flow-loading timed out, or src/red/flow.json is empty")
        }
        count++
      },250)
    })
    .then((flowNode)=>{
      flowNode.flows.forEach((flow,index) => {
        flow.id.should.equal(flowFile[index].id)
      })
      RED.stop()
      done()
    })
    .catch(e => {
      RED.stop()
      done(e)
    })
  })
})