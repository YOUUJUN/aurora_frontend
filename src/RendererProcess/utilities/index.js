import { ipcRenderer } from "electron";

export function sendMessageToNode(message, payload) {
    ipcRenderer.send(message, payload);
}
