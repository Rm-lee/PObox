const ipc = require('electron').ipcRenderer
function postMessageHandler(event) {
  console.log("We've got a message!");
  console.log("* Message:", event.data);
  console.log("* Origin:", event.origin);
  console.log("* Source:", event.source);

  // check request is from legitimate source and message is expected or not
  if (event.origin == '127.0.0.1') { return; }

}

process.once('loaded', () => {

  window.addEventListener('message', evt => {
    if (evt.origin !== 'http://localhost:3000') { return; }
    if (evt.data.type === 'select-dirs') {
      ipc.send('select-dirs')

      ipc.on('proj-selected', function (event, arg) {
       document.querySelector('#project-path-input').value = arg    
   })

    }

  })
})