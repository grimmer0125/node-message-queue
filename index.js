const express = require('express');
const rabbit = require('./rpc_client.js');
const zero = require('./z-client.js');

const app = express();

// Test;
// function resolveAfter2Seconds(x) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(x);
//     }, 5000);
//   });
// }

app.get('/', async (req, res) => {
  // await resolveAfter2Seconds(2);
  console.log('request to root url');

  // Test RabbitMQ
  // const data = await rabbit.tryRabbitMQRPCFib(10);
  // console.log('data:', data);

  // Test zeromq
  console.log('start to test zeromq');
  const data = await zero.testZMQReqResp();
  console.log('data:', data);
  console.log('end to test zeromq');

  console.log('end to request to root url');

  res.send('Hello World');
});

app.listen(3000);
