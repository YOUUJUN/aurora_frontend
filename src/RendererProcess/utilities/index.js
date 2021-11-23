const { ipcRenderer } = window.require('electron');

export function sendMessageToNode(message, payload) {
    ipcRenderer.send(message, payload);
    console.log('msg', message);
}
