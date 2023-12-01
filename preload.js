const { contextBridge, ipcRenderer } = require('electron')
console.log('preload.js is loaded')
contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    send: (channel, data) => ipcRenderer.send(channel, data),
    on: (channel, func) =>
      ipcRenderer.on(channel, (event, ...args) => func(...args)),
    invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args),
    // ... autres méthodes exposées ...
  },
})
