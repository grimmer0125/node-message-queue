// Hello World server
// Binds REP socket to tcp://*:5555
// Expects "Hello" from client, replies with "world"

const zmq = require('zeromq');

// socket to talk to clients
const responder = zmq.socket('rep');

responder.on('message', (request) => {
  console.log('Received request: [', request.toString(), ']');

  // do some 'work'
  setTimeout(() => {
    // send reply back to client.
    responder.send(`${request.toString()} World`);
  }, 1000);
});

responder.bind('tcp://*:5555', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Listening on 5555…');
  }
});

process.on('SIGINT', () => {
  responder.close();
});
