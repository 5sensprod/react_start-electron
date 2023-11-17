let ipcRenderer = null
if (window.require) {
  const electron = window.require('electron')
  ipcRenderer = electron.ipcRenderer
}

export const ipcRendererHelper = {
  send: (channel, ...args) => {
    if (ipcRenderer) {
      ipcRenderer.send(channel, ...args)
    }
  },
  on: (channel, func) => {
    if (ipcRenderer) {
      ipcRenderer.on(channel, (event, ...args) => func(event, ...args))
    }
  },
  once: (channel, func) => {
    if (ipcRenderer) {
      ipcRenderer.once(channel, (event, ...args) => func(event, ...args))
    }
  },
  removeAllListeners: (channel) => {
    if (ipcRenderer) {
      ipcRenderer.removeAllListeners(channel)
    }
  },
  // Ajoutez ici d'autres méthodes au besoin...
}
