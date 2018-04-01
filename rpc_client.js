#!/usr/bin/env node

const amqp = require('amqplib');
// const basename = require('path').basename;
// const Promise = require('bluebird');
const uuid = require('node-uuid');

// I've departed from the form of the original RPC tutorial, which
// needlessly introduces a class definition, and doesn't even
// parameterise the request.

// let n;
// try {
//   if (process.argv.length < 3) throw Error('Too few args');
//   n = parseInt(process.argv[2]);
// } catch (e) {
//   console.error(e);
//   console.warn('Usage: %s number', basename(process.argv[1]));
//   process.exit(1);
// }

function tryRabbitMQRPCFib(n) {
  console.log('tryRabbitMQRPCFib');
  return amqp.connect('amqp://localhost').then(conn => conn.createChannel().then(ch => new Promise(((resolve) => {
    const corrId = uuid();
    function maybeAnswer(msg) {
      if (msg.properties.correlationId === corrId) {
        resolve(msg.content.toString());
      }
    }

    let ok = ch.assertQueue('', { exclusive: true })
      .then(qok => qok.queue);

    ok = ok.then(queue => ch.consume(queue, maybeAnswer, { noAck: true })
      .then(() => queue));

    ok = ok.then((queue) => {
      console.log(' [x] Requesting fib(%d)', n);
      ch.sendToQueue('rpc_queue', new Buffer(n.toString()), {
        correlationId: corrId, replyTo: queue,
      });
    });
  })))
    .then((fibN) => {
      console.log(' [.] Got %d', fibN);
      conn.close();
      return fibN;
    })
  // .finally(() => { conn.close(); }))
    .catch((reason) => {
      console.warn(`error:${reason.toString()}`);
      conn.close();
    }));
}

module.exports.tryRabbitMQRPCFib = tryRabbitMQRPCFib;
