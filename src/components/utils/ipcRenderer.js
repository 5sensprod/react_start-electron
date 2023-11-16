let ipcRenderer = null
if (window.require) {
  const electron = window.require('electron')
  ipcRenderer = electron.ipcRenderer
}

export const ipcRendererHelper = {
  invoke: (channel, ...args) => {
    return ipcRenderer
      ? ipcRenderer.invoke(channel, ...args)
      : Promise.reject('ipcRenderer non disponible')
  },
  on: (channel, listener) => {
    if (ipcRenderer) {
      ipcRenderer.on(channel, listener)
    }
  },
  removeAllListeners: (channel) => {
    if (ipcRenderer) {
      ipcRenderer.removeAllListeners(channel)
    }
  },
}
