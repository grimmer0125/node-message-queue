#!/usr/bin/env node

const amqp = require('amqplib');

function fib(n) {
  // Do it the ridiculous, but not most ridiculous, way. For better,
  // see http://nayuki.eigenstate.org/page/fast-fibonacci-algorithms
  let a = 0,
    b = 1;
  for (let i = 0; i < n; i++) {
    const c = a + b;
    a = b; b = c;
  }
  return a;
}


function connectToBrokder() {
  amqp.connect('amqp://localhost').then((conn) => {
    process.once('SIGINT', () => { conn.close(); });
    return conn.createChannel().then((ch) => {
      const q = 'rpc_queue';
      var ok = ch.assertQueue(q, { durable: false });
      var ok = ok.then(() => {
        ch.prefetch(1);
        return ch.consume(q, reply);
      });
      return ok.then(() => {
        console.log(' [x] Awaiting RPC requests');
      });

      function reply(msg) {
        const n = parseInt(msg.content.toString());
        console.log(' [.] fib(%d)', n);
        const response = fib(n);
        ch.sendToQueue(
          msg.properties.replyTo,
          new Buffer(response.toString()),
          { correlationId: msg.properties.correlationId },
        );
        ch.ack(msg);
      }
    });
  }).catch(console.warn);
}

// TODO improve this later. 10s is to to wait for rabbitmq start up
setTimeout(() => {
  connectToBrokder();
}, 10000);
