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
      ipcRenderer.on(channel, func)
    }
  },
  removeAllListeners: (channel) => {
    if (ipcRenderer) {
      ipcRenderer.removeAllListeners(channel)
    }
  },
}
