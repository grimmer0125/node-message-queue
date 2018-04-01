const express = require('express');
const rpc = require('./rpc_client.js');

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
  const data = await rpc.tryRabbitMQRPCFib(10);
  console.log('data:', data);

  res.send('Hello World');
});

app.listen(3000);
