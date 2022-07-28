const mqtt = require('mqtt')
const host = 'mqtt3.thingspeak.com'
const port = '1883'
const clientId = `PRIKGDALABQ0PBMsKw0QBQI`
const connectUrl = `mqtt://${host}:${port}`
const topic = 'channels/1813557/subscribe/fields/field1'

const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'PRIKGDALABQ0PBMsKw0QBQI',
  password: 'thFOgmqLL+0jVEXpTuns/oom',
  reconnectPeriod: 1000,
})

client.on('connect', () => {
  console.log('Connected')
  client.subscribe([topic], () => {
    console.log(`Subscribe to topic '${topic}'`)
  })
  setInterval(updateProperties, 15000)
})


client.on('message', function(topic, msg) {
    console.log('received: ' + topic + ' topic, msg: ' + msg.toString())
})
function updateProperties() {
    let temp = (30 + Math.random()).toFixed(3);
    updateProperty(temp);
}
function updateProperty(value) {
    client.publish('channels/1813557/publish/fields/field1', value)
}
/*
process.on('SIGINT', function() {
    clearInterval(interval);
    updateProperty('livenow', false);
    client.end();
    process.exit();
})
*/