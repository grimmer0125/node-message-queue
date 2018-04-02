// Hello World client
// Connects REQ socket to tcp://localhost:5555
// Sends "Hello" to server.

const zmq = require('zeromq');

// 1. Figure 2 - Request-Reply http://zguide.zeromq.org/page:all
// zmq.socket('req');
// example http://zguide.zeromq.org/js:hwclient
// http://zguide.zeromq.org/js:hwserver

// 2. push/pull for worker
// zmq.socket('push');
// example: https://github.com/zeromq/zeromq.js

// 3. publish/subscribe
// zmq.socket('pub');
// Pipeline, which connects nodes in a fan-out/fan-in pattern that can have multiple steps and loops. This is a parallel task distribution and collection pattern.
// example: https://github.com/zeromq/zeromq.js

// 4. router-dealer ? http://zguide.zeromq.org/page:all
// examle: http://zguide.zeromq.org/js:rrbroker
// Figure 16 - Extended Request-Reply
// Figure 17 - Request-Reply Broker

// 5. Exclusive pair, which connects two sockets exclusively. This is a pattern for connecting two threads in a process, not to be confused with "normal" pairs of sockets.
// PAIR and PAIR. zmq_socket (context, ZMQ_PAIR);
// Signaling Between Threads (PAIR Sockets)
// http://zguide.zeromq.org/page:all#Signaling-Between-Threads-PAIR-Sockets
// Python example:
// https://github.com/booksbyus/zguide/blob/master/examples/Python/mtrelay.py
// https://github.com/booksbyus/zguide/blob/master/examples/Python/mtserver.py
// here shows many types, including 'pair'
// https://github.com/zeromq/zeromq.js/blob/32d19c4b4c405643d63976659ad7846def747541/test/exports.js
// node.js example:
// https://github.com/zeromq/zeromq.js/blob/32d19c4b4c405643d63976659ad7846def747541/test/socket.pair.js

function testZMQReqResp() {
  return new Promise((resolve, reject) => {
    // 當非同步作業成功時，呼叫 resolve(...),而失敗時則呼叫 reject(...)。
    // 在這個例子中，使用 setTimeout(...) 來模擬非同步程式碼。
    // 在實務中，您將可能使用像是 XHR 或者一個 HTML5 API.
    // setTimeout(function(){
    //   resolve("Success!"); // Yay！非常順利！
    // }, 250);

    // socket to talk to server
    console.log('Connecting to hello world server…');
    const requester = zmq.socket('req');

    let x = 0;
    requester.on('message', (reply) => {
      console.log('Received reply', x, ': [', reply.toString(), ']');
      x += 1;
      if (x === 10) {
        requester.close();
        resolve('ok');
        // process.exit(0);
      }
    });

    requester.connect('tcp://localhost:5555');

    for (let i = 0; i < 10; i++) {
      console.log('Sending request', i, '…');
      requester.send('Hello');
    }

    process.on('SIGINT', () => {
      requester.close();
    });
  });
}

module.exports.testZMQReqResp = testZMQReqResp;
