const backEndServer = io('http://localhost:3000');

let sendMessageForm = document.getElementById('send-message-form');
let messageInput = document.getElementById('message-input');


sendMessageForm.addEventListener('submit', event => {
  event.preventDefault();
  let message = messageInput.value;
  backEndServer.emit('SEND_MESSAGE',{ message });
});


backEndServer.on('RECEIVE_MESSAGE', (data) => {
  console.log('__RECEIVE_MESSAGE__', data);
  //
});
